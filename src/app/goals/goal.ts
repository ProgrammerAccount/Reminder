import { TaskManager } from '../to-do/add-remove-task';

export class Goal {
    id: number;
    title: string;
    id_user: number;
    stepsManager: TaskManager;
    constructor(title: string, id_user: number, id = 0) {
        this.id = id;
        this.title = title;
        this.id_user = id_user;
    }
}
