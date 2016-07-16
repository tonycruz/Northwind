export class ProductInfo {
    constructor(){
    this.productID = 0;
    this.productName="";
    this.supplierID = 1;
    this.categoryID = 1;
    this.quantityPerUnit = "";
    this.unitPrice = 0;
    this.unitsInStock = 0;
    this.unitsOnOrder = 0;
    this.reorderLevel = 5;
    this.discontinued = false;
    this.validation;
    }
    static toJson(prod) {
        return {
            "productID": prod.productID,
            "productName": prod.productName,
            "supplierID": prod.supplierID,
            "categoryID": prod.categoryID,
            "quantityPerUnit": prod.quantityPerUnit,
            "unitPrice": prod.unitPrice,
            "unitsInStock": prod.unitsInStock,
            "unitsOnOrder": prod.unitsOnOrder,
            "reorderLevel": prod.reorderLevel,
            "discontinued": prod.discontinued
        }
    }
    static Validate(prod, validation) {
        prod.validation = validation.on(prod)
            .ensure("productName")
                .isNotEmpty()
                .hasMaxLength(60)
            .ensure("quantityPerUnit")
                .hasMaxLength(20)
            .ensure("unitPrice")
                .isNotEmpty()
                .isNumber()
                .isGreaterThan(0)
            .ensure("unitsInStock")
                .isNotEmpty()
                .isNumber()
                .isGreaterThanOrEqualTo(0)
            .ensure("unitsOnOrder")
                .isNotEmpty()
                .isNumber()
                .isGreaterThanOrEqualTo(0)
            .ensure("reorderLevel")
                .isNotEmpty()
                .isNumber()
                .isGreaterThanOrEqualTo(0)
    }

}
