class User {
    constructor(form) {
        this.username = form.username;
        this.password = form.password;
        this.firstName = form.firstName;
        this.lastName = form.lastName;
        this.typeOfUser = form.typeOfUser;
        this.isExaminer = form.isExaminer;
    }

    getUserObjectData() {
        var returnData = {}
        Object.keys(this).map((key)=> {
            returnData[key] = this[key];
        })
        return returnData;
    }
}

module.exports = User;