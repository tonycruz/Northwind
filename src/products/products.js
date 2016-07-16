import {inject} from "aurelia-framework";
import {Validation} from 'aurelia-validation';
import {SourceManager} from "../modules/SourceManager";
import {ProductsDataContext} from "./productsDataContext";
import {ProductInfo} from "./productInfo";
import _ from 'lodash';

@inject(ProductsDataContext, SourceManager, Validation)
export class Products {
    title;
    categories;
    suppliers;
    showing;
    newProduct; 
    currentProducts;
    constructor(dataContext,
                datasource,
                validation) {
        this.title = "List Prodcuts";
        this.datasource = new SourceManager(12);
        this.dataContext = dataContext;
        this.validation = validation;
    }
    activate() {
        return this.dataContext.getAll()
            .then(result => {
                this.datasource.pageInit(result.products);
                this.categories = result.categories;
                this.suppliers = result.suppliers;
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
            var productsResults = _.filter(this.datasource.sourceCache,
                function (prod) {
                    return _.includes(prod.productName.trim().toLowerCase(),
                        filter.trim().toLowerCase());
                });
            this.datasource.pageSearch(productsResults);
        } else {
            this.datasource.pageInit(this.datasource.sourceCache);
        }
    }
    saveProduct() {
        this.currentProducts.validation.validate().then(() => {
              var updateProducts = ProductInfo.toJson(this.currentProducts);
              this.dataContext.update(updateProducts)
              .then(pro=> {
                     pro = pro;
                     toastr.success(updateProducts.productName + " Saved", "Products");
                  });
        });
   }
    itemChange(item) {
        this.datasource.selectedRecord(item);
        this.currentProducts = item;
        //this.currentProducts.validation = this.validation;
        ProductInfo.Validate(this.currentProducts, this.validation);
    }
    /* modals */
    showDeleteModal() {     
       $("#confirmDeleteProductModal").modal('show');
    }
    deleteProduct() {
        var product = this.datasource.currentRecord;
        return this.dataContext.deleteProduct(product.productID)
            .then(deleteProduct => {
                deleteProduct = deleteProduct;
                toastr.warning(product.productName + " Deleted", "Customer");
                this.refreshDelete(product.productID);
            });
    }
    closeModal() {
        this.showing = false;
    }
   
    showAddNewModal() {
        this.newProduct = new ProductInfo();
        this.newProduct.productName = "";
        this.newProduct.quantityPerUnit = "10 boxes x 20 bags",
        this.newProduct.reorderLevel = 5;
        ProductInfo.Validate(this.newProduct, this.validation);

        $("#confirmAddNewProductModal").modal('show');
    }
    closeAddnewModal() {
        this.showing = false;
    }
    saveNewProduct() {
        this.newProduct.validation.validate().then(() => {
            var saveNew = ProductInfo.toJson(this.newProduct);
            this.dataContext.save(saveNew)
               .then(product => {
               product = product; this.refresh(product);
               toastr.success(product.productName + " Save new", "Products");
               })
        });
     
    }
    refresh(product) {
        this.datasource.dataSource.push(product);
        this.datasource.firstPage();
        $("#confirmAddNewProductModal").modal('hide');
    }
    refreshDelete(id) {
        var deleteIndex = _.findIndex(this.datasource.sourceCache,
            function (prod) {
                return prod.productID == id;
            });
        this.datasource.sourceCache.splice(deleteIndex, 1);
        this.datasource.pageInit(this.datasource.sourceCache);
        this.datasource.firstPage();
        this.itemChange(this.datasource.currentRecord);
        $("#confirmDeleteProductModal").modal('hide');
    }
} 
