export default class CustomerModel {
    constructor(custId, name, address, salary) {
        this.custId = custId;
        this.name = name;
        this.address = address;
        this.salary = salary;
    }

    deleteCustomer(id, customers) {
        const index = customers.findIndex(c => c.custId === id);
        if (index !== -1) {
            customers.splice(index, 1);
            return true;
        }
        return false;
    }
}
