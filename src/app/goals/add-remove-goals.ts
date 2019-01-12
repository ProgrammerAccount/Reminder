import { Goal } from './goal';
import { DBAPI } from '../DBAPI.service';
import TASK_MANAGER from '../to-do/add-remove-task';
import { Subscription } from 'rxjs/internal/Subscription';
export class AddRemoveGoals {

    goals: Goal[];
    TM = TASK_MANAGER;
    goalSubscrion: Subscription;
    TodayDate: string;
    constructor(connectionAPI: DBAPI)
    {
        this.goalSubscrion = connectionAPI.getObjects('projects').subscribe(res => {
            this.goals = res;
        },
        console.error);
    }
    AddGoal(title: string, description: string) {

        this.goals.push(new Goal(title, description));
      }
    RemoveGoal(goal: Goal) {
        this.goals.splice(this.goals.indexOf(goal), 1);
    }





}


