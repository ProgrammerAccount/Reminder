import hashlib
import jwt
from .dbORMS.user import User, UserSchema
from flask import jsonify, request
from .main import app,JWT_SECRET,JWT_ALGORITHM
from .dbORMS.dbConn import Session
salt = 'njk546jnkioll45njk231e4'



@app.route("/login", methods=['POST'])
def login():
    user_post = UserSchema(
        only=('email', 'password')).load(request.get_json())
    user = User(**user_post)
    sess = Session()
    res = sess.query(User).filter(User.email==user.email).first()

    if res != None:
        if res.password == hashlib.sha256((user.password+salt).encode('utf-8')).hexdigest():
            return jwt.encode({'id': res.id}, JWT_SECRET, algorithm=JWT_ALGORITHM)
        else:
            print ("password")
            return "False"
    else:
        print ("email")
        return "False"

#@app.route("/register",methods=['POST'])
#def register():
    
