
import {inject} from "aurelia-framework";
import {Validation} from 'aurelia-validation';
@inject( Validation)
export class SupplierInfo{
    supplierID;
    companyName;
    contactName;
    contactTitle;
    address;
    city;
    region;
    postalCode;
    country;
    phone;
    fax;
    homePage;
    validation;
     constructor( validation) {
         this.validation = validation;
    }
   static toJson(supp: SupplierInfo) {
        return {
            "supplierID": supp.supplierID,
            "companyName": supp.companyName,
            "contactName": supp.contactName,
            "contactTitle": supp.contactTitle,
            "address": supp.address,
            "city": supp.city,
            "region": supp.region,
            "postalCode": supp.postalCode,
            "country": supp.country,
            "phone": supp.phone,
            "fax": supp.fax,
            "homePage": supp.homePage
        }
   }
   static Validate(supp, validation) {
       supp.validation = validation.on(supp)
           .ensure("companyName")
              .isNotEmpty()
              .hasMaxLength(40)
           .ensure("contactName")
              .isNotEmpty()
              .hasMaxLength(30)
           .ensure("contactTitle")
              .isNotEmpty()
              .hasMaxLength(30)
           .ensure("address")
              .isNotEmpty()
              .hasMaxLength(60)
           .ensure("city")
              .isNotEmpty()
              .hasMaxLength(15)
           .ensure("postalCode")
              .isNotEmpty()
              .hasLengthBetween(4, 10)
           .ensure("country")
              .isNotEmpty()
              .hasMaxLength(15)
           .ensure("phone")
              .isNotEmpty()
              .hasMaxLength(24);
   }
}
