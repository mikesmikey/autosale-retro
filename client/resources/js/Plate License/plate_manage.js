//RegisterLicense
let product = [];
let customer = [];
let invoice = [];
let select = "none"
function startForm() {
    getAllProductByType("RegisterLicense").then((data) => {
        createselect(data);
    });
    getAllCustomer();
    getAllInvoiceByType("Appointment");
}
function getAllInvoiceByType(type) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/invoices/type/'+type).then((result) => { 
            console.log(result.data) 
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                invoice.push(result.data[i])
            }
        })
    })
}
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
function getAllProductByType(type) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/products/type/'+type).then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                product.push(result.data[i])
            }
        })

    })
}
function launchLicenseDelete() {
    document.getElementById('delete-license').classList.add('is-active');
}
function closeLicenseDelete() {
    document.getElementById('delete-license').classList.remove('is-active');
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
function searchProductByCarLicense(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].type_desc.car_license === nameKey) {
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

function searchInvice(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].prod_id === nameKey) {
            return myArray[i];
        }
    }
}

function searchCustomer(value, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].cust_id === value) {
            return array[i];
        }
    }
}
function ShowDetail(value) {
    let resultObject = searchProductByCarLicense(value, product);
    console.log(resultObject)
    select = value ;
    document.getElementById("dca_prod_id").innerHTML = "เลขออเดอร์ : " + resultObject.prod_id;
    //เลขทะเบียนรถ
    document.getElementById("dca_car_license").innerHTML = "เลขทะเบียน : " + resultObject.trn_car.car_license;
    //ยี่ห้อ
    document.getElementById("dca_car_brand").innerHTML = "ยี่ห้อ : " + resultObject.trn_car.car_brand;
    //รุ่น
    document.getElementById("dca_car_model").innerHTML = "รุ่น : " + resultObject.trn_car.car_model;
    //เจ้าของ
    document.getElementById("dca_customer_name").innerHTML = "เจ้าของ : " + searchCustomer(resultObject.cust_id, customer).cust_name;
    setAttributePrint(value)
}
function createselect(data) {
    for (let i = 0; i < data.length; i++) {
        var select = document.getElementById("selectNumber");
        var option = document.createElement("option");
        option.text = data[i].trn_car.car_license;
        option.value = data[i].trn_car.car_license;
        option.onclick = function () { ShowDetail(this.value); };
        select.add(option);
    }
}
function runScript(e) {
    if (e.keyCode == 13) {
        var txt = document.getElementById("input_car_license").value
        if (txt === "") {
            removeAlloption();
            createselect(product);
        } else {
            let resultObject = searchProductByCarLicense(txt, product);
            if (resultObject !== null) {
                removeAlloption();
                var select = document.getElementById("selectNumber");
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
    var select = document.getElementById("selectNumber");
    var length = select.options.length;
    for (i = 0, c = 0; i < length; i++) {
        select.options[c] = null;
    }
}
function setAttributePrint(value) {
    let productObj = searchProductByCarLicense(value, product);
    let customerObj = searchCustomer(productObj.cust_id, customer);
    let invoiceObj = searchInvice(productObj.prod_id, invoice);

    //from รายละเอียดลูกค้า
    let invoiceDate = document.getElementById('print_detail_date')
    invoiceDate.innerHTML = "วันที่ " + getCurrentDate();
    let customerName = document.getElementById('print_detail_customer_name')
    customerName.innerHTML = "ชื่อลูกค้า : " + searchCustomer(productObj.cust_id, customer).cust_name;
    let cutomerPhone = document.getElementById('print_detail_phone')
    cutomerPhone.innerHTML = "เบอร์โทรศัทพ์ : " + customerObj.cust_phone
    let cutomerAddress = document.getElementById('print_detail_address')
    cutomerAddress.innerHTML = "ที่อยู่ : " + customerObj.cust_addr
    let cutomerBrand = document.getElementById('print_detail_car_brand')
    cutomerBrand.innerHTML = "ยี่ห้อรถ : " + productObj.trn_car.car_brand
    let cutomerModel = document.getElementById('print_detail_car_model')
    cutomerModel.innerHTML = "รุ่น : " + productObj.trn_car.car_model
    let cutomerLicense = document.getElementById('print_detail_car_license')
    cutomerLicense.innerHTML = "เลขทะเบียน : " + productObj.trn_car.car_license

    //from ใบรับเล่มทะเบียน print_appiontment_appt_date
    let appiontmentApptDate = document.getElementById('print_appiontment_appt_date')
    appiontmentApptDate.innerHTML = "วันนัดรับเล่มทะเบียน : " + formatStringDate(invoiceObj.trn_desc.appt_date);
    let appiontmentDate = document.getElementById('print_appiontment_date')
    appiontmentDate.innerHTML = "วันที่ " + formatStringDate(invoiceObj.issue_date);
    let appiontmentName = document.getElementById('print_appiontment_customer_name')
    appiontmentName.innerHTML = "ชื่อลูกค้า : " + searchCustomer(productObj.cust_id, customer).cust_name;
    let appiontmentPhone = document.getElementById('print_appiontment_phone')
    appiontmentPhone.innerHTML = "เบอร์โทรศัทพ์ : " + customerObj.cust_phone
    let appiontmentAddress = document.getElementById('print_appiontment_address')
    appiontmentAddress.innerHTML = "ที่อยู่ : " + customerObj.cust_addr
    let appiontmentBrand = document.getElementById('print_appiontment_brand')
    appiontmentBrand.innerHTML = "ยี่ห้อรถ : " + productObj.trn_car.car_brand
    let appiontmentModel = document.getElementById('print_appiontment_model')
    appiontmentModel.innerHTML = "รุ่น : " + productObj.trn_car.car_model
    let appiontmentLicense = document.getElementById('print_appiontment_license')
    appiontmentLicense.innerHTML = "เลขทะเบียน : " + productObj.trn_car.car_license

    //Text in Alert
    document.getElementById('alert-license-no').innerHTML = "หมายเลขทะเบียน : " + value
    //print_appiontment_

}
function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    yyyy = yyyy+543 
    today = dd + '/' + mm + '/' + yyyy;

    return today
}
function formatStringDate(value){
    var str = value.split(" ");
    var date = str[2] + '/' +str[1] + '/'+str[0]
    return date
}
function printDiv(printDivName) {
    const currentPage = document.body.innerHTML

    document.body.innerHTML = document.getElementById(printDivName).innerHTML;

    window.print();

    document.body.innerHTML = currentPage;
    startFromBeforePrint();
}
function startFromBeforePrint() {
    removeAlloption();
    document.getElementById("dca_prod_id").innerHTML = "กรุณาเลือกหมายเลขทะเบียนทางด้านซ้าย"
    document.getElementById("dca_car_license").innerHTML = "เพือแสดงข้อความรายละเอียด"
    document.getElementById("dca_car_brand").innerHTML = "การต่อทะเบียนซึ่งข้อมูลประกอบไปด้วย"
    document.getElementById("dca_car_model").innerHTML = "1.หมายเลขออเดอร์ 2.เลขทะเบียน 3.ยี่ห้อรถ "
    document.getElementById("dca_customer_name").innerHTML = "4.รุ่นรถ 5.เจ้าของรถ"
    getAllProductByType("RegisterLicense").then((data) => {
        createselect(data);
    });
    getAllCustomer();
    getAllInvoiceByType("Appointment");
}
function checInvioce(){
    
    let checkObj = searchProductByCarLicense(select,product)
    if(select === "none"){
        alert("กรุณาเลือกหมายเลขทะเบียนรถก่อน")
    }
    else if(checkObj.type_desc.licenae_status){
        //function setAttributePrintFormBills
        //printDiv('print_bill')
        //printDiv('print_invoice')
    }else{
        alert("ไม่สามารถพิมพ์ใบเสร็จเนื่องจากยังไม่มีราคา")
    }
}

startForm();
