import { APIService } from './api.service';

export abstract class AbstractService {
    constructor(protected connectionAPI: APIService, url: string) {
        this.URL = url;
        this.objects = [];

    
    }
    objects: any[];
    URL: string;
    Get(addtionalAdressParametrs?: string) {
        let url = this.URL;
        if (addtionalAdressParametrs !== undefined) {
            url = url + addtionalAdressParametrs;
        }
        this.connectionAPI.getObjects(url).subscribe(res => {
            this.objects = res;
            this.Sort();
        },
            console.error
        );
    }
    abstract Sort(): void;
    Edit(object: any) {
        this.connectionAPI.updateObjects(this.URL, object).subscribe(res => {
        },
            console.error
        );
        this.Sort();
    }
    Remove(object: any) {
        this.connectionAPI.removeObject(this.URL + '/' + object.id).subscribe((res) => { },
            console.error
        );

        const objectsindex = this.objects.indexOf(object);
        if (objectsindex !== -1) {
            this.objects.splice(objectsindex, 1);
        }
        this.Sort();
    }
}
