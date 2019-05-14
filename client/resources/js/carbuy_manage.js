//RegisterLicense
let product = [];
let resultObject;
let customer = [];
let carimages = [];
let invoice = [];
let select = "none"
function startForm() {
    getAllProductByType("Buy").then((data) => {
        createselect(data);
    });
    getAllCarImages();
    getAllCustomer();
    getAllInvoiceByType("Appointment");
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
        axios.get('http://localhost:5000/customers').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                customer.push(result.data[i])
            }
        })
    })
}
function getAllCarImages() {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:5000/images").then(result => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                carimages.push(result.data[i]);
            }
        });
    })
}
function getAllProductByType(type) {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:5000/products/type/" + type).then(result => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                product.push(result.data[i]);
            }
        });
    });
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
function searchInvice(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].prod_id === nameKey) {
            return myArray[i];
        }
    }
}
function printDiv(type) {
    let resPrintRepairDetail = resultObject.type_desc.repair_detail;
    let resPrintReparingParts_Name = [];
    let resPrintReparingParts_Num = [];
    const currentPage = document.body.innerHTML;

    if (type === 'receipt') {

    }
    window.print();
    document.body.innerHTML = currentPage;
}

function ShowDetail(value) {
    resultObject = searchProductByCarLicense(value, product);
    console.log(resultObject)

    document.getElementById('carbuy_upload').src = ""
    let carImage = searchCarImage(resultObject.cust_id, carimages);
    select = value;
    document.getElementById('carbuy_upload').src = carImage.base64;

    document.getElementById("dca_prod_id").innerHTML = "เลขออเดอร์ : " + resultObject.prod_id;
    //เลขทะเบียนรถ
    document.getElementById("dca_car_license").innerHTML = "เลขทะเบียน : " + resultObject.trn_car.car_license;
    //ยี่ห้อ
    document.getElementById("dca_car_brand").innerHTML = "ยี่ห้อ : " + resultObject.trn_car.car_brand;
    //รุ่น
    document.getElementById("dca_car_model").innerHTML = "รุ่น : " + resultObject.trn_car.car_model;
    //เจ้าของ
    document.getElementById("dca_customer_name").innerHTML = "เจ้าของ : " + searchCustomer(resultObject.cust_id, customer).cust_name;

    document.getElementById("car_engine").innerHTML = "เครื่องยนต์ : " + resultObject.trn_car.car_engine + " cc"
    document.getElementById("car_status").innerHTML = "สภาพ : " + resultObject.trn_car.car_status + "%"
    document.getElementById("car_history").innerHTML = "ประวัติ : " + resultObject.trn_car.car_history
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
    // let invoiceDate = document.getElementById('print_detail_date')
    // invoiceDate.innerHTML = "วันที่ " + getCurrentDate();
    // let customerName = document.getElementById('print_detail_customer_name')
    // customerName.innerHTML = "ชื่อลูกค้า : " + searchCustomer(productObj.cust_id, customer).cust_name;
    // let cutomerPhone = document.getElementById('print_detail_phone')
    // cutomerPhone.innerHTML = "เบอร์โทรศัทพ์ : " + customerObj.cust_phone
    // let cutomerAddress = document.getElementById('print_detail_address')
    // cutomerAddress.innerHTML = "ที่อยู่ : " + customerObj.cust_addr
    // let cutomerBrand = document.getElementById('print_detail_car_brand')
    // cutomerBrand.innerHTML = "ยี่ห้อรถ : " + productObj.trn_car.car_brand
    // let cutomerModel = document.getElementById('print_detail_car_model')
    // cutomerModel.innerHTML = "รุ่น : " + productObj.trn_car.car_model
    // let cutomerLicense = document.getElementById('print_detail_car_license')
    // cutomerLicense.innerHTML = "เลขทะเบียน : " + productObj.trn_car.car_license



    //from ใบรับเล่มทะเบียน print_appiontment_appt_date
    // let appiontmentApptDate = document.getElementById('print_appiontment_appt_date')
    // appiontmentApptDate.innerHTML = "วันนัดรับเล่มทะเบียน : " + formatStringDate(invoiceObj.trn_desc.appt_date);
    // let appiontmentDate = document.getElementById('print_appiontment_date')
    // appiontmentDate.innerHTML = "วันที่ " + formatStringDate(invoiceObj.issue_date);
    // let appiontmentName = document.getElementById('print_appiontment_customer_name')
    // appiontmentName.innerHTML = "ชื่อลูกค้า : " + searchCustomer(productObj.cust_id, customer).cust_name;
    // let appiontmentPhone = document.getElementById('print_appiontment_phone')
    // appiontmentPhone.innerHTML = "เบอร์โทรศัทพ์ : " + customerObj.cust_phone
    // let appiontmentAddress = document.getElementById('print_appiontment_address')
    // appiontmentAddress.innerHTML = "ที่อยู่ : " + customerObj.cust_addr
    // let appiontmentBrand = document.getElementById('print_appiontment_brand')
    // appiontmentBrand.innerHTML = "ยี่ห้อรถ : " + productObj.trn_car.car_brand
    // let appiontmentModel = document.getElementById('print_appiontment_model')
    // appiontmentModel.innerHTML = "รุ่น : " + productObj.trn_car.car_model
    // let appiontmentLicense = document.getElementById('print_appiontment_license')
    // appiontmentLicense.innerHTML = "เลขทะเบียน : " + productObj.trn_car.car_license

    //Text in Alert
    //document.getElementById('alert-license-no').innerHTML = "หมายเลขทะเบียน : " + value
    //print_appiontment_

}
function printDiv(printDivName) {
    if (resultObject === undefined) {
        alert('กรุณาคลิกป้ายทะเบียนก่อน')
    }
    else {
        let resPrintRepairDetail = resultObject.type_desc.repair_detail;
        let resPrintReparingParts_Name = [];
        let resPrintReparingParts_Num = [];
        const currentPage = document.body.innerHTML;
        document.body.innerHTML = document.getElementById(printDivName).innerHTML;
        if (printDivName === "receipt") {
            let rect = searchInvoiceByCustAndProd("Receipt", resultObject.cust_id, resultObject.prod_id, invoice)
            var table = document.getElementById("table01")

            for (var i = 0; i < rect.type_desc.items.length; i++) {

                let row = table.insertRow(i + 1);
                let name = row.insertCell(0);
                let price = row.insertCell(1);
                let num = row.insertCell(2);

                name.innerHTML = rect.type_desc.items[i].name;
                price.innerHTML = rect.type_desc.items[i].price;
                num.innerHTML = rect.type_desc.items[i].num;
            }
            document.getElementById("prodId").innerHTML = "&nbsp;เลขที่ออเดอร์ : " + rect.prod_id;
            document.getElementById("invoId").innerHTML = "&nbsp;เลขที่บิล : " + rect.invo_id;
            document.getElementById("type").innerHTML = "&nbsp;วันที่ออก : Repair";
            document.getElementById("launchDate").innerHTML = "&nbsp;ประเภทออเดอร์ : 14/05/2019";
        }
        window.print();
        document.body.innerHTML = currentPage;
    }
}
function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    yyyy = yyyy + 543
    today = dd + '/' + mm + '/' + yyyy;

    return today
}
function formatStringDate(value) {
    var str = value.split(" ");
    var date = str[2] + '/' + str[1] + '/' + str[0]
    return date
}

function searchCarImage(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].cust_id === nameKey) {
            return myArray[i];
        }
    }
}
function searchInvoiceByCustAndProd(type, custId, prodId, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].invo_type === type && myArray[i].cust_id === parseInt(custId) && myArray[i].prod_id === parseInt(prodId)) {
      return myArray[i];
    }
  }
  return null;
}
startForm();