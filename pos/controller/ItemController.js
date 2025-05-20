import {customers_db, items_db,orders_db} from '../db/DB.js';

import ItemModel from "../model/ItemModel.js";


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
});

$("#item-tbody").on('click', 'tr', function(){
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

});