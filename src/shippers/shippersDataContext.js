import {inject} from "aurelia-framework";
import {ContextBaseFetch} from "../modules/contextBaseFetch";
import {AppConstants} from "../modules/appConstants";

@inject(ContextBaseFetch)
export class ShippersDataContext {
    apiUrl = AppConstants.urlBase +"ShippersApi";
    constructor(context) {
        this.context = context;
        this.context.apiName = this.apiUrl;
    }
    getAll() {
        this.context.apiName = this.apiUrl;
        return this.context.getAll();
    }
    getById(id) {
        this.context.apiName = this.apiUrl;
        return this.context.getById(id);
    }
    deleteShippers(id) {
        this.context.apiName = this.apiUrl;
        return this.context.deleteByID(id);
    }
    update(shippers) {
        this.context.apiName = this.apiUrl;
        return this.context.update(shippers);
    }
    save(shippers) {
        this.context.apiName = this.apiUrl;
        return this.context.save(shippers);
    }
}
