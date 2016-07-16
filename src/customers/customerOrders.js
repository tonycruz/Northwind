import {inject} from "aurelia-framework";
import {Validation} from "aurelia-validation";
import {SourceManager} from "../modules/SourceManager";
import {CustomerDataContext} from "./CustomerDataContext";
import 'bootstrap';
import _ from 'lodash';

@inject(CustomerDataContext, SourceManager,Validation)
export class CustomerOrders {
    constructor(dataContext , dataSourceOrder,validation) {
        this.title = "Customer Orders";
        this.dataContext = dataContext;
        this.datasource = new SourceManager(12);
        this.dataSourceOrder = new SourceManager(10);
        this.validation = Validation;
    }

    activate() {
         return this.dataContext.getAll()
            .then(result => {
                   this.datasource.pageInit(result.customers);
                    this.dataSourceOrder.pageInit(result.orders);
                    this.itemChange(this.datasource.currentRecord);
        });
    }
    
    itemChange(item) {
        var listCustomerOrders = _.filter(this.dataSourceOrder.sourceCache,
            function (co) {
                return co.customerID.toLowerCase() === item.customerID.toLowerCase();
            });
            this.datasource.selectedRecord(item);
           this.dataSourceOrder.pageSearch(listCustomerOrders);

    }
    attached() {
        $('#CustomersAndOrdersTab a:first').tab('show');
    }
    
    onKeyUp(ev) {
        if (ev.keyCode === 13) {
            this.searchAll();
        }
    }
    searchAll() {

        if (this.datasource.searchCriteria !== '') {
            var filter = this.datasource.searchCriteria.trim().toLowerCase();
            var customerResults = _.filter(this.datasource.sourceCache,
                function (cust) {

                    return _.includes(cust.companyName.trim().toUpperCase(),
                        filter.trim().toUpperCase()) ||
                        _.includes(cust.contactName.trim().toUpperCase(),
                            filter.trim().toUpperCase()) ||
                        _.includes(cust.country.trim().toUpperCase(),
                            filter.trim().toUpperCase());
                });
            this.datasource.pageSearch(customerResults);
            this.itemChange(this.datasource.currentRecord);
        } else {
            this.datasource.pageSearch(this.datasource.sourceCache);
            this.itemChange(this.datasource.currentRecord);
        }

    }
    saveCustomer() {
        this.dataContext.update(this.datasource.currentRecord);
    }
}
