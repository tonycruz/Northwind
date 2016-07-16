import {inject} from "aurelia-framework";
import {CustomerDataContext} from "./customerDataContext";
import {Router} from "aurelia-router";
import {CustomerInfo} from "./customerInfo";

@inject(CustomerDataContext)
export class CustomerDetails {
    constructor(datacontext) {
        this.title = "Customer Details";
        this.datacontext = datacontext;
    }
    activate(params) {
        return this.datacontext.getById(params.id)
            .then(customer => {
                this.currentCustomer = customer;
            });
    }

}