import {inject} from "aurelia-framework";
import {SourceManager} from "../modules/SourceManager";
import {OrdersDataContext} from "./OrdersDataContext";
import {AppConstants} from "../modules/appConstants";

import _ from 'lodash';

@inject(OrdersDataContext, SourceManager)
export class Orders {
   
    constructor(datacontext, oderDetailsDataSource) {
        this.datacontext = datacontext 
        this.datasource = new SourceManager(12);
        this.oderDetailsDataSource = new SourceManager(10);
        this.subtotal = 0;
        this.total = 0;
        this.VAT = 0;
    }

    activate() {
        return this.datacontext.getAllOrders()
            .then(result => {
                this.datasource.pageInit(result.orders);
                this.oderDetailsDataSource.pageInit(result.orderDetails);
                this.itemChange(this.datasource.currentRecord);
            });
    }

    itemChange(item) {
        var listOrderDetails = _.filter(this.oderDetailsDataSource.sourceCache,
            function (co) {
                return co.orderID === item.orderID;
            });
        var _subtotal = 0;
        this.datasource.selectedRecord(item);
        this.oderDetailsDataSource.pageSearch(listOrderDetails);
        _.each(listOrderDetails, function (od) {
            _subtotal += od.extendedPrice;
        });
        this.subtotal = _subtotal; 
        this.VAT = (_subtotal * AppConstants.VAT)
        this.total = (this.subtotal + this.VAT)
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
                function (ord) {

                    return _.includes(ord.orderID.toString().trim(),
                        filter.trim()) ||
                        _.includes(ord.customerID.trim().toUpperCase(),
                            filter.trim().toUpperCase()) ||
                       _.includes(ord.companyName.trim().toUpperCase(),
                            filter.trim().toUpperCase()) ||
                       _.includes(ord.country.trim().toUpperCase(),
                            filter.trim().toUpperCase());
                });
            this.datasource.pageSearch(customerResults);
            this.itemChange(this.datasource.currentRecord);
        } else {
            this.datasource.pageSearch(this.datasource.sourceCache);
            this.itemChange(this.datasource.currentRecord);
        }

    }

}

