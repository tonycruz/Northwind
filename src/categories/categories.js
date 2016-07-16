import {inject} from "aurelia-framework";
import {SourceManager} from "../modules/SourceManager";
import {CategoriesDataContext} from "./categoriesDataContext";
import _ from 'lodash';

@inject(SourceManager, CategoriesDataContext)
export class categories {

   constructor(datasource, datacontext) {
      this.title = "List Categories";
       this.datasource = new SourceManager(5);
       this.datacontext = datacontext;

   }
    activate() {
       return this.datacontext.getAll()
           .then(result => {
               this.datasource.pageInit(result.categories)
           });
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
}