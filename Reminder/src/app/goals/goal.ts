import { TaskService } from '../todo/task.service';

export class Goal {
    id: number;
    title: string;
    id_user: number;
    stepService: TaskService;
    constructor(title: string, id_user: number, id = 0) {
        this.id = id;
        this.title = title;
        this.id_user = id_user;
    }
}
