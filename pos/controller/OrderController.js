import {customers_db, items_db,orders_db} from '../db/DB.js';

import {OrderModel} from "../model/OrderModel.js";

function loadOrders() {
    $('#item-tbody').empty();
    orders_db.map((item, index) => {
        let date = item.date;
        let orderId = item.orderId;
        let itemCode = item.itemCode;
        let price = item.price;
        let qty = item.qty;

        let data = `<tr>
                            <td>${index + 1}</td>
                            <td>${date}</td>
                            <td>${orderId}</td>
                            <td>${itemCode}</td>
                            <td>${price}</td>
                            <td>${qty}</td>
                        </tr>`
        $('#order-tbody').append(data);
    })
}

$('#plcOrdr').on('click', function () {
    let date = $('#date').val();
    let orderId = $('#orderId').val();
    let itemCode = $('#orderItemCode').val();
    let price = $('#orderPrice').val();
    let qty = $('#orderQty').val();

    if (date === '' || orderId === '' || itemCode === '' || price === '' || qty === '') {

        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    } else {
        let order_data = new OrderModel(date,orderId,itemCode, price, qty);

        orders_db.push(order_data);

        console.log(orders_db);

        loadOrders();

        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });
    }
});

$("#order-tbody").on('click', 'tr', function(){
    let idx = $(this).index();
    console.log(idx);
    let obj = orders_db[idx];
    console.log(obj);
    let date = obj.date;
    let orderId = obj.orderId;
    let itemCode = obj.itemCode;
    let price = obj.price;
    let qty = obj.qty;
    $("#date").val(date);
    $("#orderId").val(orderId);
    $("#orderItemCode").val(itemCode);
    $("#orderPrice").val(price);
    $("#orderQty").val(qty);

});
function clearFields() {
    $('#date').val('');
    $('#orderId').val('');
    $('#orderItemCode').val('');
    $('#orderPrice').val('');
    $('#orderQty').val('');
}