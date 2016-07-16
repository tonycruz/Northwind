import {inject} from "aurelia-framework";
import {CategoriesDataContext} from "./categoriesDataContext";
import {Router} from "aurelia-router";
import {Validation} from 'aurelia-validation';
import {CategoryInfo} from './categoryInfo';

@inject(Router, CategoriesDataContext, Validation)
export class CategoryCreate {

    constructor(router, datacontect, validation) {
        this.validation = validation;
        this.router = router;
        this.datacontect = datacontect;
    }
    activate() {
       this.category = new CategoryInfo();
        CategoryInfo.Validate(this.category, this.validation);
    }
    save() {
        this.category.validation.validate().then(() => {
             this.datacontect.save(CategoryInfo.toJson(this.category))
               .then(category => {
                   let url = this.router.generate("categorydetails", { id: category.categoryID });
                  this.router.navigate(url);
              });

        });
      
    }
}