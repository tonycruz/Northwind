import {inject} from "aurelia-framework";
import {ContextBaseFetch} from "../modules/contextBaseFetch";
import {AppConstants} from "../modules/appConstants";

@inject(ContextBaseFetch)
export class SuppliersDataContext {
    apiUrl = AppConstants.urlBase +"SuppliersApi";
    constructor(context ) {
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
    deleteSuppliers(id) {
        this.context.apiName = this.apiUrl;
        return this.context.deleteByID(id);
    }
    update(suppliers) {
        this.context.apiName = this.apiUrl;
        return this.context.update(suppliers);
    }
    save(suppliers) {
        this.context.apiName = this.apiUrl;
        return this.context.save(suppliers);
    }
}
