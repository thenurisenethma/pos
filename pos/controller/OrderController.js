import {customers_db, items_db,orders_db} from '../db/DB.js';

import ItemModel from "../model/ItemModel.js";
import {OrderModel} from "../model/OrderModel";



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
