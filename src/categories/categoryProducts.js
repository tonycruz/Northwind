import {inject} from "aurelia-framework";
import {SourceManager} from "../modules/SourceManager";
import {CategoriesDataContext} from "./categoriesDataContext";
import {CategoryCode} from "./categoryInfo";

import 'bootstrap';
import _ from 'lodash';

@inject(SourceManager, CategoriesDataContext)
export class CategoryProducts {
    constructor(datasource, datacontext) {
        this.title = "Category Products";
        this.datasource = new SourceManager(10);
        this.dataSourceProducts = new SourceManager(10);
        this.datacontext = datacontext;
    }
    activate() {
       return this.datacontext.getAll()
            .then(result => {
                this.dataSourceProducts.pageInit(result.products);
                this.datasource.pageInit(result.categories);
                this.datasource.selectedRecord(this.datasource.currentRecord);
                this.itemChange(this.datasource.currentRecord);
            });
    }
    
    pageChange(item) {
        var listcategoryProducts = _.filter(this.dataSourceProducts.sourceCache,
            function (pro) { return pro.categoryID === parseInt(item.item.categoryID); });
        var displayResult = {};
        this.dataSourceProducts.pageSearch(listcategoryProducts);
    }
    
    itemChange(item) {
        var listcategoryProducts = _.filter(this.dataSourceProducts.sourceCache,
            function (pro) {
                return pro.categoryID === parseInt(item.categoryID);
            });

        this.datasource.selectedRecord(item);
             this.dataSourceProducts.pageSearch(listcategoryProducts);
    }
    attached() {        
        $('#categoriesAndProductTab a:first').tab('show');
    }
   
    onKeyUp(ev) {
        if (ev.keyCode === 13) {
            this.searchAll();
        }
    }
    searchAll() {
        if (this.datasource.searchCriteria !== '') {
            var filter = this.datasource.searchCriteria.trim().toLowerCase();
            var categoriesResults = _.filter(this.datasource.sourceCache,
                function (cat) {
                    return _.includes(cat.categoryName.trim().toLowerCase(),
                        filter.trim().toLowerCase()) ||
                        _.includes(cat.description.trim().toLowerCase(),
                            filter.trim().toLowerCase());

                });
            this.datasource.pageSearch(categoriesResults);
        } else {
            this.datasource.pageSearch(this.datasource.sourceCache);
        }
    }

    saveCategory() {
        this.datacontext.update(this.datasource.currentRecord);
    }

}
