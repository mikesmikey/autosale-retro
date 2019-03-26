class Customer {
    constructor(form) {
        this.cust_id = form.id;
        this.cust_name = form.name;
        this.cust_phone = form.phone;
        this.cust_tax_no = form.tax_no;
        this.cust_addr = form.addr;
    }

    getCustomerObjectData() {
        var returnData = {}
        Object.keys(this).map((key) => {
            returnData[key] = this[key];
        })
        return returnData;
    }
}

module.exports = Customer;