export class Comment {
    id: number;
    value: string;
    id_object: number;
    id_user: number;
    constructor(id: number, value: string, id_user: number, id_object: number = 0) {
        this.id = id;
        this.value = value;
        this.id_object = id_object;
        this.id_user = id_user;
    }
  }
