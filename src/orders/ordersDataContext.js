import {inject} from "aurelia-framework";
import {ContextBaseFetch} from "../modules/contextBaseFetch";
import {AppConstants} from "../modules/appConstants";

@inject(ContextBaseFetch)
export class OrdersDataContext {
    apiUrl = AppConstants.urlBase +"OrdersApi";
    constructor(context) {
        this.context = context;
        this.context.apiName = this.apiUrl;
    }

    getAllOrders() {
       this.context.apiName = this.apiUrl;
        return this.context.getAll();
    }

    getById(id) {
        this.context.apiName = this.apiUrl;
        return this.context.getById(id);
    }
    deleteRecord(id) {
        this.context.apiName = this.apiUrl;
        return this.context.deleteByID(id);

    }
    save(customer) {
        this.context.apiName = this.apiUrl;
        return this.context.update(customer);
    }
    saveNew(customer) {
        this.context.apiName = this.apiUrl;
        return this.context.save(customer);
    }
}

@inject(ContextBaseFetch)
export class OrderNewDataContext {
    apiUrl = AppConstants.urlBase +"OrdersAddApi";
    constructor(context) {
        this.context = context;
        this.context.apiName = this.apiUrl;
    }

    getCustomerProduct() {
        this.context.apiName = this.apiUrl;
        return this.context.getAll();
    }

    getById(id) {
        this.context.apiName = this.apiUrl;
        return this.context.getById(id);
    }
    deleteRecord(id) {
        this.context.apiName = this.apiUrl;
        return this.context.deleteByID(id);

    }
    save(customer) {
        this.context.apiName = this.apiUrl;
        return this.context.save(customer);
    }
    saveNew(customer) {
        this.context.apiName = this.apiUrl;
        return this.context.save(customer);
    }
}
@inject(ContextBaseFetch)
export class OrderDetailsDataContext {
    apiUrl = AppConstants.urlBase +"OrderDetailsApi";
    constructor(context) {
        this.context = context;
         this.context.apiName = this.apiUrl;
    }

    getAllOrders() {
         this.context.apiName = this.apiUrl;
        return this.context.getAll();
    }

    getById(id) {
         this.context.apiName = this.apiUrl;
        return this.context.getById(id);
    }
    deleteData(id,prodid) {
         this.context.apiName = this.apiUrl;
        return this.context.deleteData(id,prodid);

    }
    save(customer) {
        this.context.apiName = this.apiUrl;
       return this.context.save(customer);
    }
    saveNew(customer) {
        this.context.apiName = this.apiUrl;
        return this.context.save(customer);
    }
}



