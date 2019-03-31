


whenFormOpenUp();
let product = [];
let customer = [];
let invoice = [];
let select = "none";
let partshub = [];

function whenFormOpenUp() {
    getAllProductByType("Repair").then((data) => {
        createselect(data);
    });
    getAllCustomer();
    getAllInvoiceByType("Appointment");
    getAllPart();
}

////////////////////////////////////////////////////////////////////
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
function getAllProductByType(type) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/products/type/' + type).then((result) => {
            resolve(result.data);
            console.log(result.data)
            for (let i = 0; i < result.data.length; i++) {
                product.push(result.data[i])
            }
        })

    })
}
////////////////////////////////////////////////////////////////////
function ShowDetail(value) {
    let resultObject = searchProductByCarFix(value, product);
    select = value;
    document.getElementById("productID").innerHTML = "เลขออเดอร์ : " + resultObject.prod_id;
    document.getElementById("carLicense").innerHTML = "เลขทะเบียน : " + resultObject.trn_car.car_license;
    document.getElementById("carBrand").innerHTML = "ยี่ห้อ : " + resultObject.trn_car.car_brand;
    document.getElementById("carModel").innerHTML = "รุ่น : " + resultObject.trn_car.car_model;
    document.getElementById("carOwner").innerHTML = "เจ้าของ : " + searchCustomer(resultObject.cust_id, customer).cust_name;
    document.getElementById("IssueDate").innerHTML = "วันที่นัดรับ : " + searchInvoice(resultObject.prod_id, invoice).type_desc.appt_date;

    var thisList = searchCarLcByProduct(resultObject.trn_car.car_license, product).type_desc.repair_detail;

    var list = document.getElementById("repairingLists");

    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
    var node = document.createElement("li");
    var textnode = document.createTextNode("อาการ");
    node.appendChild(textnode);
    list.appendChild(node);

    for (var i in thisList) {
        node = document.createElement("li");
        textnode = document.createTextNode("-" + thisList[i]);
        node.appendChild(textnode);
        list.appendChild(node);
    }

    var thisPartsList = searchCarLcByProduct(resultObject.trn_car.car_license, product).type_desc.trn_parts_repair;
    var listParts = document.getElementById("repairingtable");

    var packListParts = [];
    for (var i in thisPartsList) {
        var partsName = searchParts(thisPartsList[i].parts_id, partshub);
        packListParts.push(`${partsName},${thisPartsList[i].parts_num}`);
    }
    //    console.log(packListParts)

    for (var i = 0; i < listParts.rows.length; i++) {
        if (i > 1) {
            listParts.deleteRow(i);
        }
    }

    if (listParts.rows.length > 2)
        listParts.deleteRow(listParts.rows.length - 1)

    for (var i = 0; i < packListParts.length; i++) {
        var j = i + 2;
        var NewRow = listParts.insertRow(j);
        var Newcell1 = NewRow.insertCell(0);
        var Newcell2 = NewRow.insertCell(1);

        var spliter = packListParts[i].split(',');
        Newcell1.innerHTML = spliter[0];
        Newcell2.innerHTML = spliter[1];
    }
    //setAttributePrint(value)
}

function createselect(data) {
    for (let i = 0; i < data.length; i++) {
        var select = document.getElementById("lplate_selected");
        var option = document.createElement("option");
        option.text = data[i].trn_car.car_license;
        option.value = data[i].trn_car.car_license;
        option.onclick = function () {
            ShowDetail(this.value);
        };
        select.add(option);
    }
}
function runScript(e) {
    if (e.keyCode == 13) {
        var txt = document.getElementById("input_car_fix").value
        if (txt === "") {
            removeAlloption();
            createselect(product);
        } else {
            let resultObject = searchProductByCarFix(txt, product);
            if (resultObject !== null) {
                removeAlloption();
                var select = document.getElementById("lplate_selected");
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
function removeAlloption() {
    var select = document.getElementById("lplate_selected");
    var length = select.options.length;
    for (i = 0, c = 0; i < length; i++) {
        select.options[c] = null;
    }
}
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
function searchInvoice(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].prod_id === nameKey) {
            return myArray[i];
        }
    }
}
////////////////////////////////////////////////////////////////////