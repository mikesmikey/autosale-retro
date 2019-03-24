var product = [];
var customer ;
function getAllCustomer() {
    return new Promise((resolve, reject) => {
            axios.get('http://localhost:5000/customers').then((result) => {
                resolve(result.data);
            })

    })
}
function getAllProductByRegisterLicense() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/products/AllProductRegisterLicense').then((result) => {
            resolve(result.data);
            for(let i = 0 ; i < result.data.length ; i++){
                product.push(result.data[i])
            }
        })

    })
}
function countObject (obj) {
    var count = 0;

    for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            count++;
        }
    }

    return count;
}

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].type_desc.car_license === nameKey) {
            return myArray[i];
        }
    }
}

function ShowDetail(value){
    var resultObject = search(value, data);
    var divDetail = document.getElementById("detailCarAct");
    var p1 = document.createElement("p");
    p.text = resultObject;
    
}
function createselect(data){
    for(let i = 0 ; i < data.length ; i++){
        var select = document.getElementById("selectNumber");
        var option = document.createElement("option");
        option.text = data[i].trn_car.car_license;
        option.value = data[i].trn_car.car_license;
        option.onclick = function() { alert(this.value); };
        select.add(option);
        }
}
function startForm(){
    getAllProductByRegisterLicense().then((data) => {
        createselect(data);
    })
}

startForm();


