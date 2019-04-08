


whenFormOpenUp();
let resultObject;
let partshub = [];
let product = [];
let customer = [];
let invoice = [];
let thisCarLicense = "";
let thisCarFixProduct = [];
let packReairingDetail = [];

function whenFormOpenUp() {
    getAllProductByType("Repair").then((data) => {
        createselect(data);
    });
    getAllCustomer();
    getAllInvoiceByType("Appointment");
    getAllPart();
}


function printDiv(printDivName) {
    let resPrintRepairDetail = resultObject.type_desc.repair_detail
    let resPrintReparingParts_Name = []
    let resPrintReparingParts_Num = []
    const currentPage = document.body.innerHTML
    document.body.innerHTML = document.getElementById(printDivName).innerHTML
    if (printDivName === 'repairingBill') {

        document.getElementById('repairingBill_car_license').innerHTML = '&nbsp;&nbsp;เลขทะเบียน : ' + thisCarFixProduct[0];
        document.getElementById('repairingBill_car_brand').innerHTML = '&nbsp;&nbsp;ยี่ห้อ : ' + thisCarFixProduct[1];
        document.getElementById('repairingBill_car_model').innerHTML = '&nbsp;&nbsp;รุ่น : ' + thisCarFixProduct[2];
        document.getElementById('repairingBill_car_owner').innerHTML = '&nbsp;&nbsp;เจ้าของ : ' + thisCarFixProduct[3];

        for (var i in resultObject.type_desc.trn_parts_repair) {
            resPrintReparingParts_Name[i] = searchParts(resultObject.type_desc.trn_parts_repair[i].parts_id, partshub);
            resPrintReparingParts_Num[i] = resultObject.type_desc.trn_parts_repair[i].parts_num;
        }

        for (var i in resultObject.type_desc.trn_parts_repair) {
            console.log(resPrintReparingParts_Name[i], ", ", resPrintReparingParts_Num[i])
        }

        for (var i in resPrintRepairDetail) {
            var node = document.createElement("p");
            var textnode = document.createTextNode('- ' + resPrintRepairDetail[i]);
            node.appendChild(textnode);
            document.getElementById('repairingBill_repairing_detail').appendChild(node);
        }

        for (var i in resultObject.type_desc.trn_parts_repair) {
            var node = document.createElement("p");
            var textnode = document.createTextNode(resPrintReparingParts_Name[i] + ' ' + resPrintReparingParts_Num[i] + ' ชิ้น');
            node.appendChild(textnode);
            document.getElementById('repairingBill_parts_repair').appendChild(node);
        }
    }
    else if (printDivName === 'bill') {

    }
    else if (printDivName === 'receipt') {

    }
    else if (printDivName === 'appointment') {
        document.getElementById('appointment_car_license').innerHTML = '&nbsp;&nbsp;เลขทะเบียน : ' + thisCarFixProduct[0];
        document.getElementById('appointment_car_brand').innerHTML = '&nbsp;&nbsp;ยี่ห้อ : ' + thisCarFixProduct[1];
        document.getElementById('appointment_car_model').innerHTML = '&nbsp;&nbsp;รุ่น : ' + thisCarFixProduct[2];
        document.getElementById('appointment_car_owner').innerHTML = '&nbsp;&nbsp;เจ้าของ : ' + thisCarFixProduct[3];
        document.getElementById('appointment_car_appt_date').innerHTML = '&nbsp;&nbsp;วันที่นัดรับ : ' + thisCarFixProduct[4];

        for (var i in resPrintRepairDetail) {
            var node = document.createElement("p");
            var textnode = document.createTextNode('- ' + resPrintRepairDetail[i]);
            node.appendChild(textnode);

            document.getElementById('appointment_repairing_detail').appendChild(node);
        }

    }

    window.print();
    document.body.innerHTML = currentPage;
}
function launchFixPrintsHubDelete() {
    if (thisCarLicense != "") {
        document.getElementById('printshub-fix').classList.add('is-active');
    }
    else {
        alert("กรุณาเลือกทะเบียนรถก่อน")
    }
}
function closeFixPrintsHubDelete() {
    document.getElementById('printshub-fix').classList.remove('is-active');
}

function launchFixDelete() {
    if (thisCarLicense != "") {
        document.getElementById('alert-license-no').innerHTML = "หมายเลขทะเบียน : '" + thisCarLicense + "'";
        document.getElementById('delete-fix').classList.add('is-active');
    } else {
        alert("กรุณาเลือกทะเบียนรถก่อน")
    }
}
function closeFixDelete() {
    document.getElementById('delete-fix').classList.remove('is-active');
}

function deleteCarFixProduct() {
    deleteCarFixProductByThisLicense(thisCarLicense).then((result) => {
        // console.log('this car license => ', thisCarLicense)
        if (result) {
            alert("ลบสำเร็จ")
            window.location.reload(true);
        } else {
            alert("ลบไม่สำเร็จ!")
            window.location.reload(true);
        }
    })
    thisCarLicense = "";
    closeFixDelete();
}
////////////////////////////////////////////////////////////////////
function deleteCarFixProductByThisLicense(car_license) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/product/type/Repair/remove/' + car_license).then((result) => {
            resolve(result.data);
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
function getAllProductByType(type) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/products/type/' + type).then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                product.push(result.data[i])
            }
        })

    })
}
////////////////////////////////////////////////////////////////////
function ShowDetail(value) {
    resultObject = searchProductByCarFix(value, product);
    console.log('result => ', resultObject)
    let carOwner = searchCustomer(resultObject.cust_id, customer).cust_name;
    let ApptDate = searchInvoice(resultObject.prod_id, invoice).type_desc.appt_date;
    thisCarLicense = value;
    document.getElementById("productID").innerHTML = "เลขออเดอร์ : " + resultObject.prod_id;
    document.getElementById("carLicense").innerHTML = "เลขทะเบียน : " + resultObject.trn_car.car_license;
    document.getElementById("carBrand").innerHTML = "ยี่ห้อ : " + resultObject.trn_car.car_brand;
    document.getElementById("carModel").innerHTML = "รุ่น : " + resultObject.trn_car.car_model;
    document.getElementById("carOwner").innerHTML = "เจ้าของ : " + carOwner;
    document.getElementById("ApptDate").innerHTML = "วันที่นัดรับ : " + ApptDate;

    thisCarFixProduct.push(resultObject.trn_car.car_license)
    thisCarFixProduct.push(resultObject.trn_car.car_brand)
    thisCarFixProduct.push(resultObject.trn_car.car_model)
    thisCarFixProduct.push(carOwner)
    thisCarFixProduct.push(ApptDate)

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

    let packListParts = [];
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
        try {
            var select = document.getElementById("lplate_selected");
            var option = document.createElement("option");
            option.text = data[i].trn_car.car_license;
            option.value = data[i].trn_car.car_license;
            option.onclick = function () { ShowDetail(this.value); };
            select.add(option);
        }
        catch (error) { }
    }
}
function removeAlloption() {
    var select = document.getElementById("lplate_selected");
    var length = select.options.length;
    //console.log('length => ', length)
    for (i = 0, c = 0; i < length; i++) {
        select.options[c] = null;
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