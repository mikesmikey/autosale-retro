class ProductRegister {
    constructor(value) {
        this.prod_id = value.prod_id;
        this.cust_id = value.cust_id;
        this.car_brand = value.car_brand;
        this.car_model = value.car_model;
        this.car_license = value.car_license;
    }

    getProductRegister() {
        var returnData = {}
        Object.keys(this).map((key) => {
            returnData[key] = this[key];
        })
        return returnData;
    }
}

module.exports = ProductRegister;