
import {Validation} from 'aurelia-validation';

export class CustomerInfo {
    constructor(){
    this.customerID="";
    this.companyName="";
    this.contactName ="";
    this.contactTitle="";
    this.address="";
    this.city="";
    this.region="";
    this.postalCode="";
    this.country="";
    this.phone="";
    this.fax="";
    this.validation;
    }
    static toJson(cust) {
        return {
            "customerID": cust.customerID,
            "companyName": cust.companyName,
            "contactName": cust.contactName,
            "contactTitle": cust.contactTitle,
            "address": cust.address,
            "city": cust.city,
            "region": cust.region,
            "postalCode": cust.postalCode,
            "country": cust.country,
            "phone": cust.phone,
            "fax": cust.fax
        };
    }
    static Validate(cust, validation) {
        cust.validation = validation.on(cust)
            .ensure("customerID")
               .isNotEmpty()
               .hasLengthBetween(5, 5)
            .ensure("companyName")
               .isNotEmpty()
               .hasLengthBetween(3, 40)
            .ensure("contactName")
               .isNotEmpty()
               .hasLengthBetween(3, 30)
            .ensure("contactTitle")
               .isNotEmpty()
               .hasLengthBetween(3, 30)
            .ensure("address")
               .isNotEmpty()
               .hasMaxLength(60)
            .ensure("city")
               .isNotEmpty()
               .hasMaxLength(15)
            .ensure("postalCode")
               .isNotEmpty()
               .hasMaxLength(10)
            .ensure("country")
               .isNotEmpty()
               .hasMaxLength(15)
            .ensure("phone")
              .isNotEmpty()
              .hasMaxLength(24);
    }

}
