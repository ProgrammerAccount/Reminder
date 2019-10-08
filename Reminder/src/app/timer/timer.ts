export class Timer {
    constructor(
        public id: number,
        public start: Date,
        public stop: Date,
        public id_task: number,
        public taskTitle?: string
    ) { }
}
