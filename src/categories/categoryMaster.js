import {inject} from "aurelia-framework";
import {Validation} from 'aurelia-validation';
import _ from 'lodash';
import 'bootstrap';
import 'toastr';

import {SourceManager} from "../modules/SourceManager";
import {CategoriesDataContext} from "./categoriesDataContext";
import {CategoryInfo} from "./categoryInfo";

@inject(SourceManager, CategoriesDataContext, Validation)
export class CategoryMaster {
 
    constructor( datasource ,datacontext , validation) {
        this.validation = validation;
        this.title = "List categories";
        this.datasource = new SourceManager(10);
        this.datacontext = datacontext;
        }

    activate() {
       return this.datacontext.getAll()
            .then(result => {
                this.datasource.pageInit(result.categories);
                this.itemChange(this.datasource.currentRecord);
            });
    }
 
    refresh(category) {
        this.datasource.dataSource.push(category);
        this.datasource.firstPage(); 
        $("#NewCategoryModal").modal('hide');
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
    itemChange(item) {
        this.datasource.selectedRecord(item);
        this.category = item;
        CategoryInfo.Validate(this.category, this.validation);
    }
  
    savecategory() {
        this.category.validation.validate().then(() => {
            var updateCategory = CategoryInfo.toJson(this.category)
           this.datacontext.update(updateCategory)
             .then(categoryToSave=> {
               categoryToSave = categoryToSave;
               toastr.success(this.datasource.currentRecord.categoryName + " Saved", "Category Saved");
            });

        });
    }
    
    saveNewcategory() {
        this.newCategory.validation.validate().then(() => {
             this.datacontext.save(CategoryInfo.toJson(this.newCategory))
                 .then(newcat => {
                     newcat = newcat;
                     this.refresh(newcat);
                     toastr.success(this.newCategory.categoryName + " Saved", "Category Saved");
                 });  
        });
    }
    showConfirmDelete() {
        $("#confirmModal").modal('show');
    }
    showAddNew() {
        $("#NewCategoryModal").modal('show');
        this.newCategory = new CategoryInfo() 
        CategoryInfo.Validate(this.newCategory, this.validation);
    }
   
    delteCategory() {
        var categoryTodelete = this.datasource.currentRecord;
        var deleteResult;
        this.refreshDom(categoryTodelete.categoryID)
        return this.datacontext.deleteRecord(categoryTodelete.categoryID)
            .then(deleteResult=> { deleteResult = deleteResult;
                toastr.warning(deleteResult.categoryName + " Delete", "Category Deleted");
                 this.refreshDom(categoryTodelete.categoryID)});
          
    }
     refreshDom(id) {
        var deleteIndex = _.findIndex(this.datasource.dataSource,
            function (cat) {
                return cat.categoryID == parseInt(id);
            });
       
        this.datasource.deleteItem(deleteIndex); 
        this.itemChange(this.datasource.currentRecord);
        $("#confirmModal").modal('hide');
       
    }

}