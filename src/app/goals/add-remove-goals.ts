import { Goal } from './goal';
import { DBAPI } from '../DBAPI.service';
import { Subscription } from 'rxjs/internal/Subscription';
export class AddRemoveGoals {

    goals: Goal[];
    goalSubscrion: Subscription;
    TodayDate: string;
    constructor(private connectionAPI: DBAPI) {
        this.goalSubscrion = this.connectionAPI.getObjects('projects').subscribe(res => {
            this.goals = res;
            console.log(res);
        },
            console.error);
    }
    AddGoal(title: string) {
        this.connectionAPI.addObjects('projects/add', new Goal(title, 1)).subscribe(res => {
            this.goals.push(res);
        }, console.error);
    }
    RemoveGoal(goal: Goal) {
        this.connectionAPI.removeObject('projects/remove/' + goal.id).subscribe(res => {

        }, console.error);
        this.goals.splice(this.goals.indexOf(goal), 1);
    }





}


