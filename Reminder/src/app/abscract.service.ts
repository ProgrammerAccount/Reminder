import { APIService } from './api.service';

export abstract class AbstractService {
    constructor(protected connectionAPI: APIService, url: string) {
        this.URL = url;
        //this.objects = [];

    
    }
    //objects: any[];
    URL: string;
    Get(addtionalAdressParametrs?: string) {
        let url = this.URL;
        if (addtionalAdressParametrs !== undefined) {
            url = url + addtionalAdressParametrs;
        }
        return this.connectionAPI.getObjects(url) 
    }
    abstract Sort(): void;
    Edit(object: any) {
        debugger
        return this.connectionAPI.updateObjects(this.URL, object)
    }
    Remove(object: any) {
       return this.connectionAPI.removeObject(this.URL + '/' + object.id)

    }
}
