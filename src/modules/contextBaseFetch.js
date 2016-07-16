import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class ContextBaseFetch {
    apiName;
    constructor(http) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(this.apiName);
        });

        this.http = http;
    }
    
    getAll() {
        return this.http.fetch(this.apiName)
            .then(response => response.json())
            .then(result => {return result});
    }
    getById(id) {
        return this.http.fetch(this.apiName + "/" + id)
            .then(response => response.json())
            .then(result => { return result });
    }
    deleteByID(id) {
        return this.http.fetch(this.apiName + "/" + id,
            {
                headers: { "content-type": "application/json; charset=utf-8"},
                method: "DELETE"
            })
            .then(response => response.json())
            .then(result => { return result });      
    }
     deleteData(id, prodid) {
        return this.http.fetch(this.apiName + "/"+ id +"?prodid=" + prodid,
            {
                headers: { "content-type": "application/json; charset=utf-8"},
                method: "DELETE"
            })
            .then(response => response.json())
            .then(result => { return result });      
    }
    update(data,id) {
       return this.http.fetch(this.apiName + "/" + id, {
            headers: {"content-type": "application/json; charset=utf-8"},
            method: "PUT",
            body: json(data)
            }).then(response => response.json())
            .then(result => { return result });
    }
    save(data) {
       return this.http.fetch(this.apiName + "/" , {
            headers: { "content-type": "application/json; charset=utf-8" },
            method: "POST",
            body: json(data)
        }).then(response => response.json())
         .then(result => { return result });
   }

}