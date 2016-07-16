export class OrderDetails {
     orderDetailsID = 0;
     qty = 0;
     discount = 0;
     discountValue = 0;
     total= 0;
    constructor(productName, unitPrice, productID,  orderID) {
        this.productName = productName; 
        this.unitPrice = unitPrice;
        this.productID = productID;
        this.orderID =orderID
    }
    getTotal() {
        this.discountValue = this.discount /100
        this.total = this.qty * this.unitPrice * (1 - this.discountValue);
        return this.total;
    }

}