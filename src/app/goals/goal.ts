import { Task } from '../to-do/task';

 export class Goal {
    title: string;
    description: string;
    biggestQueue: number;
    priority: number;
        constructor(title: string, description: string) {
            this.title = title;
            this.biggestQueue = 0;
            this.description = description;
        }
    }
