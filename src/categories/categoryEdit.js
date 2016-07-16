﻿import {inject} from "aurelia-framework";
import {CategoriesDataContext} from "./categoriesDataContext";
import {Router} from "aurelia-router";
import {Validation} from "aurelia-validation";
import {CategoryInfo} from './categoryInfo';
     
@inject(Router, CategoriesDataContext, Validation)
export class CategoryEdit {

    constructor(router, datacontext, validation) {
        this.datacontext = datacontext;
        this.router = router;
        this.validation = validation;
        this.category = new CategoryInfo();
       
    }
    activate(params) {
    return    this.datacontext.getById(params.id)
            .then(category => { this.category = category;
            CategoryInfo.Validate(this.category, this.validation);
            });
      
    }
    save() {
        this.category.validation.validate().then(() => {
           this.datacontext.update(CategoryInfo.toJson(this.category))
            .then(category => {
                let url = this.router.generate("categorydetails", { id: category.categoryID });
                 toastr.success(category.categoryName + " Saved", "Category Saved"); 
                this.router.navigate(url);
            });

        });
    }
}