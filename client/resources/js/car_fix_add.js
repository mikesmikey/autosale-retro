whenFormOpenUp();
let resultObject;
let partshub = [];
let product = []
let customer = [];
let invoice = [];
let thisCustomer = '';
let maxCustomer = -1;
let maxProduct = -1;

function whenFormOpenUp() {
    getAllCustomer().then((data) => {
        createselect(data);
    });
    getAllProduct();
    getAllInvoiceByType("Appointment");
    getAllPart();
}
function insertCustomerByCarFix() {
    let CarFixAdds = [];
    CarFixAdds.push(document.getElementById('cust-name').value);
    CarFixAdds.push(document.getElementById('cust-phone').value);
    CarFixAdds.push(document.getElementById('cust-tax_no').value);
    CarFixAdds.push(document.getElementById('cust-addr').value);

    CarFixAdds.push(document.getElementById('car-brand').value);
    CarFixAdds.push(document.getElementById('car-model').value);
    CarFixAdds.push(document.getElementById('car-license').value);
    CarFixAdds.push(document.getElementById('repair-detail').value);
    let checkNull = false;
    for (var i in CarFixAdds) {
        if (CarFixAdds[i] === "") {
            checkNull = true;
        }
    }

    for (var i in customer) {
        if (customer[i].cust_id > maxCustomer) {
            maxCustomer = customer[i].cust_id;
        }
    }

    for (var i in product) {
        if (product[i].prod_id > maxProduct) {
            maxProduct = product[i].prod_id;
        }
    }

    console.log(maxCustomer);
    if (checkNull) {
        alert('กรุณากรอกข้อมูลให้ครบ')
    }
    else {
        var customerOfCarFixData = {
            cust_id : maxCustomer + 1,
            cust_name : CarFixAdds[0],
            cust_phone : CarFixAdds[1],
            cust_tax_no : CarFixAdds[2],
            cust_addr : CarFixAdds[3]
        };

        console.log(customerOfCarFixData)

        var productCarFixData = {
            prod_id: maxProduct + 1,
            cust_id: maxCustomer + 1,
            prod_type: 'Repair',
            type_desc: {
                repair_detail: CarFixAdds[7].split(/\n/),
                repair_status: "ยังไม่อยากซ่อม",
                cost_of_repairs: 1500,
                trn_parts_repair: []
            },
            trn_car: {
                car_brand: CarFixAdds[4],
                car_model: CarFixAdds[5],
                car_license: CarFixAdds[6],
                car_pic: {}
            }
        };

        console.log(productCarFixData)

        CarFixAdds = [];
        // window.location.href = 'car_fix.html';
    }

}
function ShowDetail(value) {
    resultObject = searchProductByCarFix(value, product);
    thisCustomer = value;
    let getCustomer = searchCustomerByName(thisCustomer, customer);
    document.getElementById('cust-name').value = getCustomer.cust_name;
    document.getElementById('cust-addr').value = getCustomer.cust_addr;
    document.getElementById('cust-phone').value = getCustomer.cust_phone;
    document.getElementById('cust-tax_no').value = getCustomer.cust_tax_no;


}
function createselect(data) {
    for (let i = 0; i < data.length; i++) {
        try {
            var select = document.getElementById("lplate_add_selected");
            var option = document.createElement("option");
            option.text = data[i].cust_name;
            option.value = data[i].cust_name;
            option.onclick = function () { ShowDetail(this.value); };
            select.add(option);
        }
        catch (error) { }
    }
}
function removeAlloption() {
    var select = document.getElementById("lplate_add_selected");
    var length = select.options.length;
    //console.log('length => ', length)
    for (i = 0, c = 0; i < length; i++) {
        select.options[c] = null;
    }
}

function runScript(e) {
    if (e.keyCode == 13) {
        var txt = document.getElementById("input_car_fix_add").value
        if (txt === "") {
            removeAlloption();
            createselect(product);
        } else {
            let resultObject = searchProductByCarFix(txt, product);
            if (resultObject !== null) {
                removeAlloption();
                var select = document.getElementById("lplate_add_selected");
                var option = document.createElement("option");
                option.text = resultObject.trn_car.car_license;
                option.value = resultObject.trn_car.car_license;
                option.onclick = function () { ShowDetail(this.value); };
                ShowDetail(resultObject.trn_car.car_license)
                select.add(option);
            } else {
                removeAlloption();
            }
        }
    }
    return false;
}

////////////////////////////////////////////////////////////////////
function addProductCarFix(product_fix) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/product/add', { "product_fix": product_fix }).then((result) => {
            resolve(result.data);
        })
    });
}

function getAllProduct() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/products/').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                product.push(result.data[i])
            }
        })
    });
}

function getAllPart() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/parts/').then((result) => {

            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                partshub.push(result.data[i])
            }
        })
    })
}
function getAllInvoiceByType(type) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/invoices/type/' + type).then((result) => {

            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                invoice.push(result.data[i])
            }
        })
    })
}
function getAllCustomer() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/customers/').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                customer.push(result.data[i])
            }
        })
    })
}
// function getAllProductByType(type) {
//     return new Promise((resolve, reject) => {
//         axios.get('http://localhost:5000/products/type/' + type).then((result) => {
//             resolve(result.data);
//             for (let i = 0; i < result.data.length; i++) {
//                 product.push(result.data[i])
//             }
//         })

//     })
// }
////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////

function searchCarLcByProduct(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].trn_car.car_license === nameKey) {
            return myArray[i];
        }
    }
    return null;
}
function searchParts(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].parts_id === nameKey) {
            return myArray[i].parts_name;
        }
    }
    return null;
}
function searchProductByCarFix(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].trn_car.car_license === nameKey) {
            return myArray[i];
        }
    }
    return null;
}
function searchProduct(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].prod_id === nameKey) {
            return myArray[i];
        }
    }
    return null;
}
function searchCustomer(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].cust_id === nameKey) {
            return myArray[i];
        }
    }
}
function searchCustomerByName(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].cust_name === nameKey) {
            return myArray[i];
        }
    }
}
function searchInvoice(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].prod_id === nameKey) {
            return myArray[i];
        }
    }
}
////////////////////////////////////////////////////////////////////