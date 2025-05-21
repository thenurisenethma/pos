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
    updateItem(id, updatedData, items) {
        const index = items.findIndex(c => c.itemCode === id);
        if (index !== -1) {
            items[index].itemName = updatedData.itemName;
            items[index].price = updatedData.price;
            items[index].qty = updatedData.qty;
            return true;
        }
        return false;
    }
}