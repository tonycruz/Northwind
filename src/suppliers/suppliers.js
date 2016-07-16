import {inject} from "aurelia-framework";
import {Validation} from 'aurelia-validation';

import {SourceManager} from "../modules/SourceManager";
import {SuppliersDataContext} from "./suppliersDataContext";
import {SupplierInfo} from "./supplierInfo";


import 'bootstrap';
import _ from 'lodash';

@inject(SuppliersDataContext, SourceManager, Validation)
export class Suppliers {
    title;
    dataSourceProducts
    currentSupplier;
    newSupplier;
    validation;
    constructor(datacontext, datasource, validation) {
        this.title = "Supplier Products";

        this.datasource = new SourceManager(14);
        this.dataSourceProducts = new SourceManager(10);
        this.datacontext = datacontext;
        this.validation = validation;
    }

    activate() {
        return this.datacontext.getAll()
            .then(result => {
                this.dataSourceProducts.pageInit(result.products);
                this.datasource.pageInit(result.suppliers);
                this.datasource.selectedRecord(this.datasource.currentRecord);
                this.itemChange(this.datasource.currentRecord);
            });
    }
  
    itemChange(item) {
        this.currentSupplier = item;
        

        var listcategoryProducts = _.filter(this.dataSourceProducts.sourceCache,
            function (pro) {
                return pro.supplierID === parseInt(item.supplierID);
            });
        this.datasource.selectedRecord(item);
        this.dataSourceProducts.pageSearch(listcategoryProducts);
        SupplierInfo.Validate(this.currentSupplier, this.validation);
        //this.dataValidate();

    }
    attached() {
        $('#supplierAndProductTab a:first').tab('show');
    }

    onKeyUp(ev) {
        if (ev.keyCode === 13) {
            this.searchAll();
        }
    }
    searchAll() {
        if (this.datasource.searchCriteria !== '') {
            var filter = this.datasource.searchCriteria.trim().toLowerCase();
            var suppliersResults = _.filter(this.datasource.sourceCache,
                function (supp) {
                    return _.includes(supp.companyName.trim().toLowerCase(),
                        filter.trim().toLowerCase()) ||
                        _.includes(supp.country.trim().toLowerCase(),
                            filter.trim().toLowerCase()) ||
                        _.includes(supp.contactName.trim().toLowerCase(),
                            filter.trim().toLowerCase());

                });
            this.datasource.pageSearch(suppliersResults);
        } else {
            this.datasource.pageSearch(this.datasource.sourceCache);
        }
    }

    saveSupplier() {
        this.currentSupplier.validation.validate().then(() => {
            var update = SupplierInfo.toJson(this.currentSupplier);

            this.datacontext.update(update)
                .then(supp=> {
                    supp = supp;
                    toastr.success(this.currentSupplier.companyName + " Saved", "supplier");
                });

        });
     }
    showAddNewModal() {
        this.newSupplier = new SupplierInfo();
         this.newSupplier.companyName ="";
         this.newSupplier.contactName ="";
         this.newSupplier.contactTitle ="";
        this.newSupplier.address = "123";
        this.newSupplier.country = "UK";
         $("#newSupplierModal").modal('show');
         SupplierInfo.Validate(this.newSupplier, this.validation);
      
    }
    closeAddnewModal() {
        $("#newSupplierModal").modal('show');
    }
    saveNewSupplier() {
        this.newSupplier.validation.validate().then(() => {
            var insertSuppliers = SupplierInfo.toJson(this.newSupplier);

            this.datacontext.save(insertSuppliers)
                .then(supplier => {
                    supplier = supplier; this.refresh(supplier);
                    toastr.success(this.newSupplier.companyName + " Saved", "supplier");
                })
        });
    }
    refresh(Shipper) {

        this.datasource.dataSource.push(Shipper);
        this.datasource.firstPage();
        $("#newSupplierModal").modal('hide');
    }

    showDeleteModal() {
        $("#confirmModal").modal('show');
    }
    deleteSuppliers() {
        return this.datacontext.deleteSuppliers(this.currentSupplier.supplierID)
            .then(deleteShipper => {
                deleteShipper = deleteShipper;
                toastr.warning(this.currentSupplier.companyName + " Deleted", "Shippers");
                this.refreshDelete(this.currentSupplier.validation);
            });
    }
    refreshDelete(id) {
        var deleteIndex = _.findIndex(this.datasource.sourceCache,
            function (supp) {
                return supp.supplierID == id;
            });
        this.datasource.deleteItem(deleteIndex) 
        this.itemChange(this.datasource.currentRecord);
        $("#confirmModal").modal('hide');
    }
}
// export class CurrencyFormatValueConverter {
//     toView(value, format) {
//         if (value === null || value === undefined || isNaN(value)) {
//             return null;
//         }
//         return accounting.formatMoney(value, format);
//     }
// }