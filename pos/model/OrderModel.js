export class OrderModel {
    constructor(date,orderId,itemCode, price, qty) {
        this.date = date;
        this.orderId = orderId;
        this.itemCode = itemCode;
        this.price = price;
        this.qty = qty;
    }
}
