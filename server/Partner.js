class Partner {
    constructor(form) {
        this.partner_id = form.partner_id;
        this.company_name = form.company_name;
        this.partner_name = form.partner_name;
        this.partner_phone = form.partner_phone;
        this.partner_type = form.partner_type;
        this.partner_addr = form.partner_addr;
    }

    getPartnerObjectData() {
        var returnData = {}
        Object.keys(this).map((key)=> {
            returnData[key] = this[key];
        })
        return returnData;
    }
}

module.exports = Partner;