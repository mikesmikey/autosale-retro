let product = [];
let customer = [];
let invoice = [];
let custName = "";
let custId = null;
let custPhone = "";
let custTax = "";
let custAddr = "";



function getAllCars() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/products').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                product.push(result.data[i])
            }
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
    getAllCars().then((data) => {
        createSelect(data);
    });
}

function showDetailCars(value) {
    let resultObject = getCarsDetailByName(value, product);
    document.getElementById("car_lice").innerHTML = "ชื่อ : " + resultObject.trn_car.car_license;
    
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


