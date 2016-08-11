export class OrderDetails {
    
     
    constructor(productName, unitPrice, productID,  orderID) {
        this.productName = productName; 
        this.unitPrice = unitPrice;
        this.productID = productID;
        this.orderID =orderID
        this.orderDetailID =0;
        this.qty = 0;
        this.discount = 0;
        this.discountValue = 0;
        this.total= 0;

    }
    getTotal() {
        this.discountValue = this.discount /100
        this.total = this.qty * this.unitPrice * (1 - this.discountValue);
        return this.total;
    }

}