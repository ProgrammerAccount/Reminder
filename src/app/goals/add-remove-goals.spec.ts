import { AddRemoveGoals } from './add-remove-goals';
import { Goal } from './goal';
import { Task } from '../to-do/task';

describe('AddRemoveGoals', () => {
    let service: AddRemoveGoals;
beforeEach(() => {
    service = new AddRemoveGoals([new Goal( '', '', [new Task(0, '', '', false, new Date(), 1, 6, '')], 1)]);

});

it('Set Biggest Queue', () => {
service.setBiggestQueues();
expect(service.goals[0].biggestQueue).toBe(7);
});
it('should add Goal', () => {
    const date = new Date();
    const steps = [new Task(0, '', '', false, date, 1, 6, '')];
    service.AddGoal('Title', 2, steps, 'Description');
    const lastindex = service.goals.length - 1;
    expect(service.goals[lastindex].title === 'Title').toBeTruthy();
    expect(service.goals[lastindex].priority === 2).toBeTruthy();
    expect(service.goals[lastindex].steps === steps).toBeTruthy();
    expect(service.goals[lastindex].description === 'Description').toBeTruthy();


});
it('should RemoveTask', () => {
    const date = new Date();
    const steps = [new Task(0, '', '', false, date, 1, 6, '')];
    service.AddGoal('ToRemove', 2, steps, 'DescriptToRemoveion');
    const lastindex = service.goals.length - 1;
    const goal = service.goals[lastindex];
    service.RemoveGoal(goal);
    expect(service.goals.indexOf(goal)).toBe(-1);

});
it('should RemoveStep', () => {
    const date = new Date();
    const step = new Task(0, '', '', false, date, 1, 8, '');
    const steps = [new Task(0, '', '', false, date, 1, 6, ''), step];
    service.AddGoal('ToRemove', 2, steps, 'DescriptToRemoveion');
    const lastindex = service.goals.length - 1;
    const goal = service.goals[lastindex];
    service.RemoveStep(goal, step);
    const GoalIndex = service.goals.indexOf(goal);
    expect(service.goals[GoalIndex].steps.indexOf(step)).toBe(-1);
});

it('should SteQueuePosition', () => {

    const stepBiggerQueue = new Task(0, '', '', false, new Date('26-12-2018'), 1, 8, '');
    const step = new Task(0, '', '', false,  new Date('26-12-2018'), 1, 8, '');
    const steps = [stepBiggerQueue, step];
    service.QuePosiotnChange(step, steps);
    expect(steps.indexOf(stepBiggerQueue)).toBe(1);
});
});
