export default class ItemModel {
    constructor(itemCode, itemName, price, qty) {
        this.itemCode = itemCode;
        this.itemName = itemName;
        this.price = price;
        this.qty = qty;
    }
    deleteItem(id, items) {
        const index = items.findIndex(c => c.itemCode === id);
        if (index !== -1) {
            items.splice(index, 1);
            return true;
        }
        return false;
    }
}