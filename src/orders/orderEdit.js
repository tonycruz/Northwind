﻿import {inject} from "aurelia-framework";
import {Validation} from 'aurelia-validation';
import {SourceManager} from "../modules/SourceManager";
import {OrderNewDataContext, OrderDetailsDataContext} from "./OrdersDataContext";
import {OrderDetails} from "./orderDetails";
import {OrderInfo} from "./orderInfo";
import {OrderDetailInfo} from "./orderDetailInfo"
//import { datepicker } from 'jquery-ui';
import _ from 'lodash';
import moment from "moment";

@inject(OrderNewDataContext, OrderDetailsDataContext,  SourceManager, Validation)
export class OrderEdit {

    constructor(datacontext,  odList, productDatasource,  validation) {
        this.datacontext = datacontext; 
        this.odList = odList; 
        this.productDatasource = new SourceManager(12);
        this.customersDatasource = new SourceManager(12);
        this.validation = validation;
        this.currentOrderDetails;
        this.shippers;
    }

    activate(params) {
        return this.datacontext.getById(params.id)
            .then(result => {
                this.currentCustomerOrder = result.order;
                this.customersDatasource.pageInit(result.customers);
                this.currentOrderDetails = result.orderDetails;
                this.shippers = result.shippers;
                this.productDatasource.pageInit(result.products);
                this.itemChange()
            });
    }
   
      /*
    refresh subtotal VAT total
    */
    itemChange() {
        var _subtotal = 0;
        _.each(this.currentOrderDetails, function (od) {
            _subtotal += od.extendedPrice;
        });
        this.subtotal = _subtotal;
        this.VAT = (_subtotal * 0.2)
        this.total = (this.subtotal + this.VAT)
    }
     /*
    search searchProductsAll Key Up if user press enter
    */
    onKeyUp(ev) {
        if (ev.keyCode === 13) {
            this.searchProductsAll();
        }
    }
   /*
    search customeron Key Up if user press enter
    */
    customeronKeyUp(ev) {
        if (ev.keyCode === 13) {
            this.searchCustomersAll();
        }
    }
    /*
    search searchProductsAll
    */

    searchProductsAll() {
        if (this.productDatasource.searchCriteria !== "") {
            var filter = this.productDatasource.searchCriteria.trim().toLowerCase();
            var productsResults = _.filter(this.productDatasource.sourceCache,
                function (prod) {
                    return _.includes(prod.productName.trim().toLowerCase(),
                        filter.trim().toLowerCase());
                });
            this.productDatasource.pageSearch(productsResults);
        } else {
            this.productDatasource.pageInit(this.productDatasource.sourceCache);
        }
    }
     /*
    search searchCustomersAll
    */
    searchCustomersAll() {
        if (this.customersDatasource.searchCriteria !== "") {

            var filter = this.customersDatasource.searchCriteria.trim().toLowerCase();
            var customerResults = _.filter(this.customersDatasource.sourceCache,
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
            this.customersDatasource.pageSearch(customerResults);
            this.customersDatasource.pageCount();
        } else {
            this.customersDatasource.pageInit(this.customersDatasource.sourceCache);
        }
    }
   /*
    show Customer Modal
    */
    showSelectCustomer() {
        //this.currentCustomerOrder = new OrderInfo()
        OrderInfo.Validate(this.currentCustomerOrder, this.validation)
        $("#selectCustomerModal").modal('show');
        
       
    }
      /*
         get Customer Selected
    */
    getCustomerSelected(selectedCustomerOrder) {
        this.currentCustomerOrder = selectedCustomerOrder
        this.currentCustomerOrder.shipName = this.currentCustomerOrder.companyName;
        this.currentCustomerOrder.shipAddress = this.currentCustomerOrder.address;
        this.currentCustomerOrder.shipCity = this.currentCustomerOrder.city;
        this.currentCustomerOrder.shipRegion = this.currentCustomerOrder.region;
        this.currentCustomerOrder.shipPostalCode = this.currentCustomerOrder.postalCode;
        this.currentCustomerOrder.shipCountry = this.currentCustomerOrder.country;
        this.currentCustomerOrder.freight = 0;
        OrderInfo.Validate(this.currentCustomerOrder, this.validation)
   }
    /*
     add Customer address to ship Addressr
    */
    addCustomerAddress() {
        if (this.currentCustomerOrder) {
            this.currentCustomerOrder.shipName = this.currentCustomerOrder.companyName;
            this.currentCustomerOrder.shipAddress = this.currentCustomerOrder.address;
            this.currentCustomerOrder.shipCity = this.currentCustomerOrder.city;
            this.currentCustomerOrder.shipRegion = this.currentCustomerOrder.region;
            this.currentCustomerOrder.shipPostalCode = this.currentCustomerOrder.postalCode;
            this.currentCustomerOrder.shipCountry = this.currentCustomerOrder.country;
            this.currentCustomerOrder.freight = 0;
        }
    }
     /*
     remove Customer ship Addressr
    */
    removeCustomerAddress() {
        this.currentCustomerOrder.shipName = "";
        this.currentCustomerOrder.shipAddress = "";
        this.currentCustomerOrder.shipCity = "";
        this.currentCustomerOrder.shipRegion = "";
        this.currentCustomerOrder.shipPostalCode = ""
        this.currentCustomerOrder.shipCountry = ""
    }
     /*
     save Customer Order if user provided requiredDate and shippedDate
    */
    saveCustomerOrder() {
        this.currentCustomerOrder.validation.validate().then(() => {
            var _NewOrder;
            //this.currentCustomerOrder.shipVia = 1;
            this.currentCustomerOrder.employeeID = 5;
            var newOrder = OrderInfo.toJson(this.currentCustomerOrder)
            this.datacontext.save(newOrder)
                .then(_NewOrder => {
                    _NewOrder = _NewOrder;
                    this.newOrderRefresh(_NewOrder);
                    toastr.success(this.currentCustomerOrder.companyName + " Order Created", "Order");
                });
        })      
    }
     /*
     close Customer Modal after insert(customer) from server 
    */
    newOrderRefresh(order) {
        this.currentCustomerOrder.orderID = order.orderID;
        $("#selectCustomerModal").modal('hide');
    }
     /*
     show product To Order details Modal  
    */
    addProductToOrder(product) {
        this.productToOrderItem = new OrderDetails(
            product.productName,
            product.unitPrice,
            product.productID,
            this.currentCustomerOrder.orderID);
        $("#productToOrderModal").modal('show');
        $("#QuantityId").focus();
    }
   /*
     getTotal on key press if key = enter Into Order Details  
    */
    QtyChangeKeyUp(ev) {
        if (ev.keyCode === 13) {
            this.insertProductIntoOrderDetails();
        }
        this.productToOrderItem.getTotal();
    }
    /*
     insert Product Into Order Details 
    */
    insertProductIntoOrderDetails() {
        var orderDetails = OrderDetailInfo.toJson(this.productToOrderItem,
                                                  this.currentCustomerOrder.orderID)
        var odResults;
        this.odList.save(orderDetails)
            .then(odResults=> {
                odResults = odResults;
                orderDetails.orderDetailID = odResults.orderDetailID;
                this.productToOrderItem.orderDetailID = odResults.orderDetailID;
                this.currentOrderDetails.push(orderDetails);
                $("#productToOrderModal").modal('hide');
                this.itemChange();
                toastr.success(this.productToOrderItem.productName + " Added to Order Details", "Order");
            });
    }
     /*
     close Customer Modal 
    */
    cancelOrder() {
        $("#selectCustomerModal").modal('hide');
    }
     /*
     show Delete Order detail Modal
    */
    showDeleteOrderDetails(_od) {
        this.deleteOrderItem = _od;
       // this.deleteOrderItem.orderDetailID =  _od.orderDetailID
        $("#confirmDeleteOrderDetailsModal").modal('show');
    }
     /*
     delete Order details from server
    */
    deleteOrderDetails() {
       
        this.odList.deleteData(this.deleteOrderItem.orderDetailID)
            .then(odResults=> {
                odResults = odResults;
                this.deleteOrderDetailsRefresh(this.deleteOrderItem.orderDetailID);
            });
    }

    /*
     refresh Order details after delete order details
    */
    deleteOrderDetailsRefresh(id) {
        var deleteIndex = _.findIndex(this.currentOrderDetails,
            function (item) {
                return item.orderDetailID == id;
            });
        this.currentOrderDetails.splice(deleteIndex, 1);
        $("#confirmDeleteOrderDetailsModal").modal('hide');
        this.itemChange();

    }
    detePickerShow(){
         $('#requiredDate').datepicker('show');
        //   $('#requiredDate').focus(function () {
              
        //   })
    }
}