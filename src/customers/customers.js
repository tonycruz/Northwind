import {inject} from "aurelia-framework";
import {SourceManager} from "../modules/SourceManager";
import {CustomerDataContext} from "./CustomerDataContext";
import _ from 'lodash';


@inject(SourceManager, CustomerDataContext)
export class Customers {
     constructor(datasource, dataContext) {
                this.title = "List Customers";
                this.datasource = new SourceManager(10);
                this.dataContext = dataContext;
   }
    activate() {
        return this.dataContext.getAll()
            .then(result => {
                   this.datasource.pageInit(result.customers);
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
            var customerResults = _.filter(this.datasource.sourceCache,
                function (cust) {
                  
                    return _.includes(cust.companyName.trim().toLowerCase(),
                        filter.trim().toLowerCase()) ||
                        _.includes(cust.contactName.trim().toLowerCase(),
                        filter.trim().toLowerCase()) ||
                        _.includes(cust.country.trim().toLowerCase(),
                        filter.trim().toLowerCase());
                });
            this.datasource.pageSearch(customerResults);
        } else {
            this.datasource.pageSearch(this.datasource.sourceCache);
        } 
     }
} 