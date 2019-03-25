let product = [];
let customer = [];
function getAllCustomer() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/customers').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                customer.push(result.data[i])
            }
        })
    })
}
function getAllProductByRegisterLicense() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/products/AllProductRegisterLicense').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                product.push(result.data[i])
            }
        })

    })
}
function countObject(obj) {
    var count = 0;

    for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            count++;
        }
    }

    return count;
}

function searchProduct(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].type_desc.car_license === nameKey) {
            return myArray[i];
        }
    }
    return null;
}
function searchCustomerName(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].cust_id === nameKey) {
            return myArray[i].cust_name;
        }
    }
}
function ShowDetail(value) {
    console.log(value)
    console.log(product)
    let resultObject = searchProduct(value, product);
    console.log(resultObject)
    document.getElementById("dca_prod_id").innerHTML = "เลขออเดอร์ : " + resultObject.prod_id;
    //เลขทะเบียนรถ
    document.getElementById("dca_car_license").innerHTML = "เลขทะเบียน : " + resultObject.trn_car.car_license;
    //ยี่ห้อ
    document.getElementById("dca_car_brand").innerHTML = "ยี่ห้อ : " + resultObject.trn_car.car_brand;
    //รุ่น
    document.getElementById("dca_car_model").innerHTML = "รุ่น : " + resultObject.trn_car.car_model;
    //เจ้าของ
    document.getElementById("dca_customer_name").innerHTML = "เจ้าของ : " + searchCustomerName(resultObject.cust_id, customer);
}
function createselect(data) {
    for (let i = 0; i < data.length; i++) {
        var select = document.getElementById("selectNumber");
        var option = document.createElement("option");
        option.text = data[i].trn_car.car_license;
        option.value = data[i].trn_car.car_license;
        console.log(data[i].trn_car.car_license)
        option.onclick = function () { ShowDetail(this.value); };
        select.add(option);
    }
}
function startForm() {
    getAllProductByRegisterLicense().then((data) => {
        createselect(data);
    });
    getAllCustomer();
}

function runScript(e) {
    if (e.keyCode == 13) {
        var txt = document.getElementById("input_car_license").value
        if (txt === "") {
            removeAlloption();
            createselect(product);
        } else {
            let resultObject = searchProduct(txt, product);
            if(resultObject !== null){
                removeAlloption();
                var select = document.getElementById("selectNumber");
                var option = document.createElement("option");
                option.text = resultObject.trn_car.car_license;
                option.value = resultObject.trn_car.car_license;
                option.onclick = function () { ShowDetail(this.value); };
                ShowDetail(resultObject.trn_car.car_license)
                select.add(option);
            }else{
                removeAlloption();
            }
        }
    }
    return false;
}
function removeAlloption() {
    var select = document.getElementById("selectNumber");
    var length = select.options.length;
    for (i = 0,c=0 ; i < length; i++) {
        select.options[c] = null;
    }
}
/*
document.getElementById("input_car_license").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
       var txt = document.getElementById("input_car_license").value
        if(txt === ""){
            createselect(product);
        }else{
            let resultObject = searchProduct(value, product);
            createselect(resultObject)
        }
     //event.preventDefault();
    
    }
  });*/

startForm();


