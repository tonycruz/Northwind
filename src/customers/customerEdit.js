import {inject} from "aurelia-framework";
import {CustomerDataContext} from "./customerDataContext";
import {Router} from "aurelia-router";
import {Validation} from "aurelia-validation";
import {CustomerInfo} from "./customerInfo";

@inject(Router, CustomerDataContext, Validation)
export class CustomerEdit { 
    constructor(router, datacontext, validation) {
        this.datacontext = datacontext;
        this.router = router;
        this.validation = validation;
        this.currentCustomer = new CustomerInfo();
        this.title = "edit Customer";
    }
    activate(params) {
        return this.datacontext.getById(params.id)
            .then(customer => {
            this.currentCustomer = customer;
            CustomerInfo.Validate(this.currentCustomer, this.validation);

            });
    }
   
    saveCustomer() {
        this.currentCustomer.validation.validate().then(() => {
            var updateCustomer = CustomerInfo.toJson(this.currentCustomer);
            this.datacontext.update(updateCustomer)
            .then(cust => {
                let url = this.router.generate("customerDetails", { id: this.currentCustomer.customerID });
                this.router.navigate(url);
            });

        });
       
    }
}