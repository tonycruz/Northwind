import {inject} from "aurelia-framework";
import {SourceManager} from "../modules/SourceManager";
import {ShippersDataContext} from "./shippersDataContext";
import {ShipperInfo} from "./shippersInfo";
import {Validation} from 'aurelia-validation';

import 'bootstrap';
import _ from 'lodash';

@inject(ShippersDataContext, SourceManager, Validation)
export class shippers {
    title;
    showing;
    currentShippers;
    newShipper;

    constructor(dataContext, datasource, validation ) {
        this.datasource = new SourceManager(12);
        this.dataContext = dataContext;
        this.validation = validation;
    }
    activate() {
        return this.dataContext.getAll()
            .then(result => {
                this.datasource.pageInit(result.shippers);
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
            var filter = this.datasource.searchCriteria.trim().toLowerCase();
            var ShippersResults = _.filter(this.datasource.sourceCache,
                function (shi) {
                    return _.includes(shi.companyName.trim().toLowerCase(),
                        filter.trim().toLowerCase());
                });
            this.datasource.pageSearch(ShippersResults);
        } else {
            this.datasource.pageInit(this.datasource.sourceCache);
        }
    }
    itemChange(item) {
        this.datasource.selectedRecord(item);
        this.currentShippers = item;
        ShipperInfo.Validate(this.currentShippers, this.validation);
        
    }
    saveShipper() {
        var updateShuppers = ShipperInfo.getJson(this.currentShippers);
        this.currentShippers.validation.validate().then(() => {
             this.dataContext.update(updateShuppers)
                 .then(Shipper => {
                     Shipper = Shipper;
                     toastr.success(Shipper.companyName + " Saved", "shippers");
                   })
        });

      
    }

    /* modals */

    showDeleteModal() {
        $("#confirmDeleteShipperModal").modal('show');
    }
    deleteProduct() {

        var product = this.datasource.currentRecord;
        return this.dataContext.deleteShippers(this.currentShippers.shipperID)
            .then(deleteShipper => {
                deleteShipper = deleteShipper;
                toastr.warning(this.currentShippers.companyName + " Deleted", "Shippers");
                this.refreshDelete(this.currentShippers.shipperID);
            });
    }
    refreshDelete(id) {
        var deleteIndex = _.findIndex(this.datasource.sourceCache,
            function (ship) {
                return ship.shipperID == id;
            });
        this.datasource.sourceCache.splice(deleteIndex, 1);
        this.datasource.pageInit(this.datasource.sourceCache);
        this.datasource.firstPage();
        this.itemChange(this.datasource.currentRecord);
        $("#confirmDeleteShipperModal").modal('hide');
    }
    closeModal() {
        this.showing = false;
    }

    showAddNewModal() {
       this.newShipper = new ShipperInfo() 
       this.newShipper.companyName ="",
       this.newShipper.phone= ""
       $("#newShipplingModal").modal('show');
       ShipperInfo.Validate(this.newShipper, this.validation);

     }
   
    closeAddnewModal() {
        this.showing = false;
    }
    saveNewShipper() {
        var Shipper: any;
        this.newShipper.validation.validate().then(() => {
            var _newShippers = ShipperInfo.getJson(this.newShipper);

            this.dataContext.save(_newShippers)
                .then(Shipper => {
                Shipper = Shipper; this.refresh(Shipper);
                toastr.success(this.newShipper.companyName + " Saved", "shippers");})
        });
    }
    refresh(Shipper) {
        this.datasource.dataSource.push(Shipper);
        this.datasource.firstPage();
        $("#newShipplingModal").modal('hide');
    }
}