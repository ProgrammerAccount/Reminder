
 export class Task {
    constructor(
        public id: number,
        public title: string,
        public id_project: number,
        public date: Date,
        public queue: number,
        public status: number,
        public priority: number,
        public id_user: number,
    ){}
    }
    
    