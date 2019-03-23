class Partner {
    constructor(form) {
        this.companyName = form.companyName;
        this.partnerName = form.partnerName;
        this.partnerPhone = form.partnerPhone;
        this.partnerType = form.partnerType;
        this.partnerAddr = form.partnerAddr;
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