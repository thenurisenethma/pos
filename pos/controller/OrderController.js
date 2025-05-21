import {customers_db, items_db,orders_db} from '../db/DB.js';

import {OrderModel} from "../model/OrderModel.js";

function loadOrders() {
    $('#order-tbody').empty();
    orders_db.map((item, index) => {
        let date = item.date;
        let orderId = index + 1;
        let itemCode = item.itemCode;
        let price = parseFloat(item.price);
        let qty = parseInt(item.qty);

        let total = (price * qty).toFixed(2);

        let data = `<tr>
                        <td>${orderId}</td>
                        <td>${date}</td>
                        <td>${itemCode}</td>
                        <td>${price}</td>
                        <td>${qty}</td>
                        <td>${total}</td>
                    </tr>`;
        $('#order-tbody').append(data);
    });
}


$('#plcOrdr').on('click', function () {
    let date = $('#date').val();
    let orderId = $('#orderId').val();
    let itemCode = $('#orderItemCode').val();
    let price = $('#orderPrice').val();
    let qty = $('#orderQty').val();
    let qtyOnHand = $('#qtyOnHand').val();
    let qtyLeft= qtyOnHand-qty;
    let qtyInt = parseInt(qty);
    let stockInt = parseInt(qtyOnHand);

    if (date === "") {
        $("#date").css("border", "2px double red");
        $("#date").css("background","  #fff2f2");
    }
    if ( itemCode === "" ) {
        $("#orderItemCode").css("border", "2px double red");
        $("#orderItemCode").css("background","  #fff2f2");
    }
    if (price === "") {
        $("#orderPrice").css("border", "2px double red");
        $("#orderPrice").css("background","  #fff2f2");
    }
    if (qty === "") {
        $("#orderQty").css("border", "2px double red");
        $("#orderQty").css("background","  #fff2f2");
    }
    if (qtyOnHand === "") {
        $("#qtyOnHand").css("border", "2px double red");
        $("#qtyOnHand").css("background","  #fff2f2");

    }
    if (orderId === "") {
        $("#orderId").css("border", "2px double red");
        $("#orderId").css("background","  #fff2f2");

    }
    if (!date || !itemCode || !price || !qty || isNaN(qtyInt) || isNaN(stockInt)) {
        Swal.fire({
            title: 'Error!',
            text: 'Invalid or empty input fields.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }

    if (qtyInt > stockInt) {
        Swal.fire({
            title: 'Error!',
            text: 'Not enough stock! Only '+stockInt+' left.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }
    let order_data = new OrderModel(date, orderId, itemCode, price, qtyInt);
    orders_db.push(order_data);

    loadOrders();

    Swal.fire({
        title: "Added Successfully!",
        icon: "success",
        draggable: true
    });

    clearFields();
});
$("#order-tbody").on('click', 'tr', function(){
    let idx = $(this).index();
    let obj = orders_db[idx];
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
