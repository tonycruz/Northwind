import {inject} from "aurelia-framework";
import {ContextBaseFetch} from "../modules/contextBaseFetch";
import {AppConstants} from "../modules/appConstants";
@inject(ContextBaseFetch)
export class CategoriesDataContext {
      url = AppConstants.urlBase +"CategoriesApi"; 

    constructor(context) {
        this.context = context;
        this.context.apiName = this.url;
    }
    getAll() {
        this.context.apiName = this.url;
         return this.context.getAll()
            .then(result => { return result });
    }
    getById(id) {
        this.context.apiName = this.url;
        return this.context.getById(id)
          
    }
    deleteRecord(id) {
        this.context.apiName = this.url;
        return this.context.deleteByID(id);
            
    }
    update(category) {
        this.context.apiName = this.url;
         return this.context.update(category, category.categoryID);
    }
    save(category) {
       this.context.apiName = this.url;
       return this.context.save(category);
    }
}
