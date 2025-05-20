import {customers_db, items_db,orders_db} from '../db/DB.js';

import CustomerModel from "../model/CustomerModel.js";


    $('#customer_save').on('click', function () {
        let custId = $('#custId').val();
        let name = $('#custName').val();
        let address = $('#address').val();
        let salary = $('#salary').val();

        if (custId === '' || name === '' || address === '' || salary === '') {

            Swal.fire({
                title: 'Error!',
                text: 'Invalid Inputs',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        } else {
            let customer_data = new CustomerModel(custId, name, address, salary);

            customers_db.push(customer_data);

            console.log(customers_db);

            loadCustomers();

            Swal.fire({
                title: "Added Successfully!",
                icon: "success",
                draggable: true
            });
        }
    });
