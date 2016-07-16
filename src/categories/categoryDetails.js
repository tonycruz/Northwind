import {inject} from 'aurelia-framework';
import {CategoriesDataContext} from "./categoriesDataContext";


@inject(CategoriesDataContext)
export class CategoryDetails {
    category;
     constructor(datacontext) {
        this.datacontext = datacontext;
    }
    activate(params) {
    return this.datacontext.getById(params.id)
            .then(category => { this.category = category });
    }   
} 