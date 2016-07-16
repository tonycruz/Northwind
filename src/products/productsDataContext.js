import {inject} from "aurelia-framework";
import {ContextBaseFetch} from "../modules/contextBaseFetch";
import {AppConstants} from "../modules/appConstants";

@inject(ContextBaseFetch)
export class ProductsDataContext {
   apiUrl = AppConstants.urlBase +"ProductsApi"; 
    constructor(context) {
        this.context = context;
         this.context.apiName = this.apiUrl;
    }
    getAll() {
        this.context.apiName = this.apiUrl;
        return this.context.getAll();
    }
    getById(id) {
        this.context.apiName = this.apiUrl;
        return this.context.getById(id);
    }
    deleteProduct(id) {
        this.context.apiName = this.apiUrl;
        return this.context.deleteByID(id);
    }
    update(product) {
        this.context.apiName = this.apiUrl;
        return this.context.update(product);
    }
    save(product) {
        this.context.apiName = this.apiUrl;
        return this.context.save(product);
    }
}
