
import {inject} from "aurelia-framework";
import {ContextBaseFetch} from "../modules/contextBaseFetch";
import {AppConstants} from "../modules/appConstants";
@inject(ContextBaseFetch)
export class CustomerDataContext {
    apiUrl = AppConstants.urlBase +"CustomersApi"; 

    constructor(context) {
        this.context = context;
        this.context.apiName = this.apiUrl;
    }
    getAll() {
        this.context.apiName = this.apiUrl;
         return this.context.getAll()
            .then(result => { return result });
    }
    getById(id) {
        this.context.apiName = this.apiUrl;
        return this.context.getById(id)
          
    }
    deleteRecord(id) {
        this.context.apiName = this.apiUrl;
        return this.context.deleteByID(id);
            
    }
    update(customer) {
        this.context.apiName = this.apiUrl;
         return this.context.update(customer, customer.customerID);
    }
    save(customer) {
       this.context.apiName = this.apiUrl;
       return this.context.save(customer);
    }
}