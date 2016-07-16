import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';
import {AppConstants} from "../modules/appConstants";


@inject(HttpClient)
export class ContextCodeBase{
    apiName;
    constructor(http) {
        this.apiName = AppConstants.urlBase;
        // this.apiName = "http://localhost:49588/api/CodeApi?code=category"
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(this.apiName);
        });

        this.http = http;
    }
    
 
    getById(codeName) {
        return this.http.fetch(this.apiName + "/CodeApi?code=" + codeName)
            .then(response => response.json())
            .then(result => { return result });
    }
}