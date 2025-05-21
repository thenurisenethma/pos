import {customers_db, items_db,orders_db} from '../db/DB.js';

import ItemModel from "../model/ItemModel.js";
import CustomerModel from "../model/CustomerModel";
let selectedItemCode = null;

function loadItems() {
    $('#item-tbody').empty();
    items_db.map((item, index) => {
        let itemCode = item.itemCode;
        let itemName = item.itemName;
        let price = item.price;
        let qty = item.qty;

        let data = `<tr>
                            <td>${index + 1}</td>
                            <td>${itemCode}</td>
                            <td>${itemName}</td>
                            <td>${price}</td>
                            <td>${qty}</td>
                        </tr>`
        $('#item-tbody').append(data);
    })
}

$('#item_save').on('click', function () {
    let itemCode = $('#itemCode').val();
    let itemName = $('#itemName').val();
    let price = $('#price').val();
    let qty = $('#qty').val();

    if (itemCode === '' || itemName === '' || price === '' || qty === '') {

        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    } else {
        let item_data = new ItemModel(itemCode, itemName, price, qty);

        items_db.push(item_data);

        console.log(items_db);

        loadItems();

        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });
    }
    clear();
});

$("#item-tbody").on('click', 'tr', function() {
    let idx = $(this).index();
    console.log(idx);
    let obj = items_db[idx];
    console.log(obj);

    let itemCode = obj.itemCode;
    let itemName = obj.itemName;
    let price = obj.price;
    let qty = obj.qty;

    $("#itemCode").val(itemCode);
    $("#itemName").val(itemName);
    $("#price").val(price);
    $("#qty").val(qty);

    selectedItemCode = itemCode;
});

$('#item_delete').on('click', function () {
        if (!selectedItemCode) {
            Swal.fire("Please select a item from the table.");
            return;
        }

        const model = new ItemModel();
        const deleted = model.deleteItem(selectedItemCode, items_db);

        if (deleted) {
            Swal.fire("Deleted Successfully!", "", "success");
            selectedItemCode = null;
            loadItems();
        } else {
            Swal.fire("Delete failed.", "", "error");
        }
    clear();
});

$('#item_clear').on('click', function () {
    clear();
});

