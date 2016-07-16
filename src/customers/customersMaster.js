import {inject} from "aurelia-framework";
import {SourceManager} from "../modules/SourceManager";
import {CustomerDataContext} from "./CustomerDataContext";
import {Validation} from 'aurelia-validation';
import {CustomerInfo} from './customerInfo';

import 'bootstrap';
import _ from 'lodash';

@inject(SourceManager, CustomerDataContext, Validation)
export class CustomersMaster {
    title;
    newCustomer;
    currentCustomer
    constructor(datasource, datacontext, validation) {

        this.title = "List Customers";
        this.datasource = new SourceManager(12);
        this.datacontext = datacontext;
        this.validation = validation;

    }

    activate() {
        return this.datacontext.getAll()
            .then(result => {
                this.datasource.pageInit(result.customers);
                this.itemChange(this.datasource.currentRecord);
            });
    }

    onKeyUp(ev) {
        if (ev.keyCode === 13) {
            this.searchAll();
        }
    }
    searchAll() {
        if (this.datasource.searchCriteria !== "") {
            this.title.trim().toLowerCase()
            var filter = this.datasource.searchCriteria.trim().toLowerCase();
            var customerResults = _.filter(this.datasource.sourceCache,
                function (cust) {
                    return _.includes(cust.customerID.trim().toLowerCase(),
                        filter.trim().toLowerCase()) ||
                       _.includes(cust.companyName.trim().toLowerCase(),
                            filter.trim().toLowerCase()) ||
                        _.includes(cust.contactName.trim().toLowerCase(),
                            filter.trim().toLowerCase()) ||
                        _.includes(cust.country.trim().toLowerCase(),
                            filter.trim().toLowerCase());
                });
            this.datasource.pageSearch(customerResults);
            this.datasource.pageCount();
        } else {
            this.datasource.pageInit(this.datasource.sourceCache);
        }
    }
    itemChange(item) {
        this.datasource.selectedRecord(item);
        this.currentCustomer = item;
        CustomerInfo.Validate(this.currentCustomer, this.validation);
    }


    saveCustomer() {
        this.currentCustomer.validation.validate().then(() => {
            var updateCustomer = CustomerInfo.toJson(this.currentCustomer);
           this.datacontext.update(updateCustomer);
            toastr.success(this.currentCustomer.companyName + " Saved", "Customer");
        })     
 }
 /*
    Modal-dialog
    */
    showConfirmDelete() {
        $("#confirmModalDeleteCustomer").modal('show');
    }
    showAddNewCustomerAccount() {
        $("#modalSearchNewCustomer").modal('show');
    }
    closeAddNewCustomerAccount() {
        $("#modalSearchNewCustomer").modal('hide');
        this.datasource.searchCriteria = "";
        this.searchAll();
    }

    showAddNewCustomer() {
        $("#modalSearchNewCustomer").modal('hide');
        this.newCustomer = new CustomerInfo();
        this.newCustomer.customerID = this.datasource.searchCriteria
        this.newCustomer.address = "123"
        this.newCustomer.country="UK"
        this.newCustomer.companyName ="";
        this.newCustomer.contactName="";
        this.newCustomer.contactTitle ="";
        this.newCustomer.city ="";
        this.newCustomer.region = "";
        this.newCustomer.postalCode ="";
        this.newCustomer.phone = "";
        this.newCustomer.fax="";
        CustomerInfo.Validate(this.newCustomer, this.validation);

        this.datasource.searchCriteria = "";
        this.searchAll();
        $("#NewCustomerModal").modal('show');
    }
    saveNewCustomer() {
        this.newCustomer.validation.validate().then(() => {
            var saveNewCustomer = CustomerInfo.toJson(this.newCustomer)
            return this.datacontext.save(saveNewCustomer)
                .then(cust => { cust = cust; this.refresh(cust) });
        });
    }
    delteCustomer() {
        var deleteCustomer;
        var customer = this.datasource.currentRecord;
        return this.datacontext.deleteRecord(customer.customerID)
            .then(deleteCustomer => {
                deleteCustomer = deleteCustomer;
                toastr.warning(customer.companyName + " Deleted", "Customer");
                this.refreshDelete(customer.customerID);
            });
    }
    refresh(customer) {
        this.datasource.dataSource.push(customer);
        this.datasource.firstPage();
        $("#NewCustomerModal").modal('hide');
        toastr.success(customer.companyName + " New Customer Saved", "Customer");
    }
    refreshDelete(id) {
        var deleteIndex = _.findIndex(this.datasource.sourceCache,
            function (cust) {
                return cust.customerID == id;
            });
        this.datasource.deleteItem(deleteIndex);
         this.itemChange(this.datasource.currentRecord);
        $("#confirmModalDeleteCustomer").modal('hide');
    }
  } 