let product = [];
let customer = [];
let invoice = [];
let custName = "";
let custId = null;
let custPhone = "";
let custTax = "";
let custAddr = "";



function getAllCars(type) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/products/'+type).then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                product.push(result.data[i])
            }
        })
    })
}

function getCustomer(custId) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/customer/'+custId).then((result) => {
            resolve(result.data);
        })
    })
}

function getCarsDetailByName(name, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].trn_car.car_license === name) {
            return myArray[i];
        }
    }
    return null;
}

function startForm() {
    getAllCars("Buy").then((data) => {
        createSelect(data);
    });
}

function showDetailCars(value) {
    let resultObject = getCarsDetailByName(value, product);
    document.getElementById("car_lice").innerHTML = "เลขออเดอร์ : " + resultObject.trn_car.car_license;
    document.getElementById("car_lice").innerHTML = "เลขทะเบียน : " + resultObject.trn_car.car_license;
    document.getElementById("car_bra").innerHTML = "ยี่ห้อ : " + resultObject.trn_car.car_brand;
    document.getElementById("car_mod").innerHTML = "รุ่น : " + resultObject.trn_car.car_model;
    document.getElementById("car_own").innerHTML = "เจ้าของ : " + resultObject.cust_id;
    document.getElementById("car_pri").innerHTML = "ราคา : " + resultObject.trn_car.car_license;
    
    
}

function createSelect(data) {
    for (let i = 0; i < data.length; i++) {
        var select = document.getElementById("selectLicense");
        var option = document.createElement("option");
        option.text = data[i].trn_car.car_license;
        option.value = data[i].trn_car.car_license;
        option.onclick = function () { showDetailCars(this.value); };
        select.add(option);
    }
}




startForm();
/*getAllCustomer().then((data) => { console.log(data) })*/


