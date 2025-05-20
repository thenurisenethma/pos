export class OrderController {
    constructor(custName,address,contact,creditLimit,date,orderId,itemCode, itemName, price, qty, total,orderQty,creditLimit) {
        this.custName = custName;
        this.address = address;
        this.contact = contact;
        this.creditLimit = creditLimit;
        this.date = date;
        this.orderId = orderId;
        this.itemCode = itemCode;
        this.itemName = itemName;
        this.price = price;
        this.qty = qty;
        this.total = total;
        this.orderQty = orderQty;
        this.creditLimit = creditLimit;
    }
}
