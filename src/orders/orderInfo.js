import {inject} from "aurelia-framework";
import {Validation} from 'aurelia-validation';
@inject(Validation)
export class OrderInfo {
      
      constructor(validation) {
         this.companyName = '';
         this.contactName= '';
         this.address= '';
         this.city= '';
         this.country= '';
         this.region= '';
         this.postalCode= '';
         this.orderID= 0;
         this.customerID= '';
         this.employeeID=0
         this.orderDate = new Date();
         this.requiredDate = new Date();
         this.shippedDate = new Date();
         this.shipVia;
         this.freight = 1
         this.shipName ="";
         this.shipAddress ="";
         this.shipCity ="";
         this.shipRegion ="";
         this.shipPostalCode ="";
         this.shipCountry ="";
         this.validation = validation;
   
      }

    static toJson(ord) {
        return {
            "companyName": ord.companyName,
            "contactName": ord.contactName,
            "address": ord.address,
            "city": ord.city,
            "country": ord.country,
            "region": ord.region,
            "postalCode": ord.postalCode,
            "orderID": ord.orderID,
            "customerID": ord.customerID,
            "employeeID": ord.employeeID,
            "orderDate": ord.orderDate,
            "requiredDate": ord.requiredDate,
            "shippedDate": ord.shippedDate,
            "shipVia": ord.shipVia,
            "freight": ord.freight,
            "shipName": ord.shipName,
            "shipAddress": ord.shipAddress,
            "shipCity": ord.shipCity,
            "shipRegion": ord.shipRegion,
            "shipPostalCode": ord.shipPostalCode,
            "shipCountry": ord.shipCountry
        }
    }
    static Validate(ord, validation) {
        ord.validation = validation.on(ord)
            .ensure("companyName")
                .isNotEmpty()
                .hasLengthBetween(3, 40)
            .ensure("address")
                .isNotEmpty()
                .hasMaxLength(60)
            .ensure("city")
                .isNotEmpty()
                .hasMaxLength(15)
            .ensure("postalCode")
                .isNotEmpty()
                .hasMaxLength(15)
            .ensure("country")
                .isNotEmpty()
                .hasMaxLength(15)
            .ensure("orderDate")
                .isNotEmpty()
            .ensure("requiredDate")
                .isNotEmpty()
            .ensure("shippedDate")
                .isNotEmpty()
            .ensure("shipName")
                 .isNotEmpty()
                .hasMaxLength(40)
            .ensure("shipAddress")
                .isNotEmpty()
                .hasMaxLength(60)
            .ensure("shipCity")
                .isNotEmpty()
                .hasMaxLength(15)
            .ensure("shipPostalCode")
                .isNotEmpty()
                .hasMaxLength(15)
            .ensure("shipCountry")
                .isNotEmpty()
                .hasMaxLength(15)
    }
}
