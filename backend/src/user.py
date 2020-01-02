import hashlib
import jwt
from .dbORMS.user import User, UserSchema
from flask import jsonify, request
from .main import app, JWT_SECRET, JWT_ALGORITHM
from .dbORMS.dbConn import Session
from .dbORMS.projects import Projects
salt = 'njk546jnkioll45njk231e4'


@app.route("/login", methods=['POST'])
def login():
    user_post = UserSchema(
        only=('email', 'password')).load(request.get_json())
    user = User(**user_post)
    sess = Session()
    res = sess.query(User).filter(User.email == user.email).first()

    if res != None:
        if res.password == hashlib.sha256((user.password+salt).encode('utf-8')).hexdigest():
            return jwt.encode({'id': res.id}, JWT_SECRET, algorithm=JWT_ALGORITHM)
        else:
            print("password")
            return "False"
    else:
        print("email")
        return "False"


@app.route("/register", methods=['POST'])
def register():
    get_params = request.get_json()
    email = get_params['email']
    password = get_params['pass']
    passwordv2 = get_params['passv2']
    sess = Session()

    if sess.query(User).filter(User.email == email).count() > 0:
        return "Ten Email jest juz używany!", 200
    else:
        if password != passwordv2:
            return 'Hasła nie są te same!',200
        else:
            user = User(email, hashlib.sha256(
                (password+salt).encode('utf-8')).hexdigest())
            user.projects.append(Projects(title="Inbox",id_user=user.id))
            sess.add(user)
            sess.commit()

            sess.close()
            return "Sukcess", 201
