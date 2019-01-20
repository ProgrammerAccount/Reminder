import { TaskManager } from '../to-do/add-remove-task';

export class Goal {
    id: number;
    title: string;
    stepsManager: TaskManager;
    constructor(title: string, id = 0) {
        this.id = id;
        this.title = title;
    }
}
