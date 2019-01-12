export class LocalStorageNames
{
    get TASK(): string {return this.task; }
    get TASK_DAY(): string {return this.task_day; }
    get GOAL(): string {return this.goal; }
    get BODY(): string {return this.body; }
    get RUTINE(): string {return this.rutine; }
    get TIMER(): string {return this.timer; }


    private task_day = 'TFD';
    private task = 'TASK';
    private goal = 'GOAL';
    private body = 'BODY';
    private rutine = 'RUTINE';
    private timer = 'TIMER';
}

const LOCAL_STORAGE_NAMES = new LocalStorageNames();
export default LOCAL_STORAGE_NAMES;

