
 export class Task {
    constructor(
        public id: number,
        public title: string,
        public id_project: number,
        public date: Date,
        public queue: number,
        public status: boolean,
        public priority: number,
        public id_user: number,
        public reminder: boolean,
        public reminding_dateTime: Date
    ){}
    }
    
    