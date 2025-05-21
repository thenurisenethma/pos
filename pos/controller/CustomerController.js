import {customers_db, items_db, orders_db} from '../db/DB.js';
import CustomerModel from "../model/CustomerModel.js";

let selectedCustomerId = null;

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
                    </tr>`;
        $('#customer-tbody').append(data);
    });
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
        });
    } else {
        let customer_data = new CustomerModel(custId, name, address, salary);
        customers_db.push(customer_data);

        loadCustomers();

        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });
    }
    clear();
});

$("#customer-tbody").on('click', 'tr', function () {
    let custId = $(this).find('td:eq(1)').text();
    selectedCustomerId = custId;

    let obj = customers_db.find(c => c.custId === custId);

    if (obj) {
        $("#custId").val(obj.custId);
        $("#custName").val(obj.name);
        $("#address").val(obj.address);
        $("#salary").val(obj.salary);
    }
});

$('#customer_delete').on('click', function () {
    if (!selectedCustomerId) {
        Swal.fire("Please select a customer from the table.");
        return;
    }

    const model = new CustomerModel();
    const deleted = model.deleteCustomer(selectedCustomerId, customers_db);

    if (deleted) {
        Swal.fire("Deleted Successfully!", "", "success");
        selectedCustomerId = null;
        loadCustomers();
    } else {
        Swal.fire("Delete failed.", "", "error");
    }
    clear();
});

$('#customer_clear').on('click', function () {
    clear();
});

function clear() {
    $('#custId').val('');
    $('#custName').val('');
    $('#address').val('');
    $('#salary').val('');
}

