export class OrderDetailInfo {


    constructor() {
        this.orderDetailID = 0;
        this.productName = "";
        this.unitPrice = 0;
        this.productID = 0;
        this.orderID = 0;
        this.quantity = 0;
        this.discount = 0;
        this.discountValue = 0;
        this.extendedPrice = 0;

    }
    static toJson(currentItem, orderid) {
        return {
            "orderDetailID": 0,
            "orderID": orderid,
            "productID": currentItem.productID,
            "productName": currentItem.productName,
            "unitPrice": currentItem.unitPrice,
            "quantity": currentItem.qty,
            "discount": currentItem.discountValue,
            "extendedPrice": currentItem.total,
        }

    }
}