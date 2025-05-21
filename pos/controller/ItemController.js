import {customers_db, items_db,orders_db} from '../db/DB.js';

import ItemModel from "../model/ItemModel.js";
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
                            <td>${itemName}</td>
                            <td>${price}</td>
                            <td>${qty}</td>
                        </tr>`
        $('#item-tbody').append(data);
    })
}

$('#item_save').on('click', function () {
    let itemCode = $('#itemCode').val().trim();
    let itemName = $('#itemName').val().trim();
    let price = $('#price').val().trim();
    let qty = $('#qty').val().trim();

    let isValid = true;
    const pricePattern = /^\d+(\.\d{1,2})?$/;

    $("input").css("border", "");

    if (itemName === "") {
        $("#itemName").css("border", "2px double red");
        isValid = false;
    }

    if (qty === "" ) {
        $("#qty").css("border", "2px double red");
        isValid = false;
    }

    if (!pricePattern.test(price)) {
        $("#price").css("border", "2px double red");
        isValid = false;
    }

    if (!isValid) {
        Swal.fire({
            title: 'Error!',
            text: 'Please correct the highlighted fields.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }

    let item_data = new ItemModel(itemCode, itemName, price, qty);
    items_db.push(item_data);

    console.log(items_db);
    loadItems();

    Swal.fire({
        title: "Added Successfully!",
        icon: "success",
        confirmButtonText: "Ok"
    });

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

function clear() {
    $('#itemCode').val('');
    $('#itemName').val('');
    $('#price').val('');
    $('#qty').val('');
}
$('#item_update').on('click', function () {
    if (!selectedItemCode) {
        Swal.fire("Please select a item to update.");
        return;
    }

    const itemName = $('#itemName').val();
    const price = $('#price').val();
    const qty = $('#qty').val();

    if (itemName === '' || price === '' || qty === '') {
        Swal.fire("Fill all fields to update.", "", "warning");
        return;
    }

    const updatedItem = {
        itemName: itemName,
        price: price,
        qty: qty
    };

    const model = new ItemModel();
    const updated = model.updateItem(selectedItemCode, updatedItem, items_db);

    if (updated) {
        Swal.fire("updated successfully!", "", "success");
        loadItems();
        clear();
        selectedItemCode = null;
    } else {
        Swal.fire("Update failed.", "", "error");
    }
});


