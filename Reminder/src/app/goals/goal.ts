import { Task } from '../todo/task';

export class Goal {
    id: number;
    title: string;
    id_user: number;
    steps: Array<Task>;
    constructor(title: string, id_user: number, id = 0) {
        this.id = id;
        this.title = title;
        this.id_user = id_user;
        this.steps = new Array<Task>();
    }
}
