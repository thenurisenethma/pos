import {customers_db, items_db,orders_db} from '../db/DB.js';

import CustomerModel from "../model/CustomerModel.js";

function loadCustomers() {
    $('#customer-tbody').empty();
    customers_db.map((item, index) => {
        let custId = item.custId;
        let name = item.name;
        let address = item.address;
        let salary = item.salary;

        let data = `<tr>
                            <td>${index + 1}</td>
                            <td>${custId}</td>
                            <td>${name}</td>
                            <td>${address}</td>
                            <td>${salary}</td>
                        </tr>`
        $('#customer-tbody').append(data);
    })
}

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
