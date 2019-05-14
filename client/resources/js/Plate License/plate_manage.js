//RegisterLicense
let product = [];
let customer = [];
let invoiceAppointment = [];
let invoiceBills = []
let select = "none"
function startForm() {
    getAllProductByType("RegisterLicense").then((data) => {
        createselect(data);
    });
    getAllCustomer();
    getAllInvoiceByType("Appointment");
    getInvoiceByType("Bill")
    select = 'none'
}
function getAllInvoiceByType(type) {
    invoiceAppointment=[]
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/invoices/type/' + type).then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                invoiceAppointment.push(result.data[i])
            }
        })
    })
}
function getInvoiceByType(type) {
    invoiceBills=[]
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/invoices/type/' + type).then((result) => {
            resolve(result.data);
            console.log(result.data)
            for (let i = 0; i < result.data.length; i++) {
                console.log(result.data)
                invoiceBills.push(result.data[i])
            }
        })
    })
}
function getAllCustomer() {
    customer=[]
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
    product=[]
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/products/type/' + type).then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                product.push(result.data[i])
            }
        })

    })
}
function launchLicenseDelete() {
    if (select === 'none') {
        alert('กรุณาเลือกหมายเลขทะเบียนรถก่อน')
    } else {
        document.getElementById('delete-license').classList.add('is-active');
    }
}
function launchLicenseCost() {
    if (select === 'none') {
        alert('กรุณาเลือกหมายเลขทะเบียนรถก่อน')
    } else {
        document.getElementById('cost-license').classList.add('is-active');
    }
}
function closeLicenseCost() {
    document.getElementById('cost-license').classList.remove('is-active');
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
        if (myArray[i].trn_desc.car_license === nameKey) {
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
function searchInvoiceByCusIdAndProductId(cusID, ProductId, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].prod_id === ProductId && myArray[i].cust_id === cusID) {
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
    select = value;
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
        let select = document.getElementById("selectNumber");
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
                let select = document.getElementById("selectNumber");
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
    let select = document.getElementById("selectNumber");
    var length = select.options.length;
    for (i = 0, c = 0; i < length; i++) {
        select.options[c] = null;
    }
}
function setAttributePrint(value) {
    let productObj = searchProductByCarLicense(value, product);
    let customerObj = searchCustomer(productObj.cust_id, customer);
    let invoiceObj = searchInvice(productObj.prod_id, invoiceAppointment);

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
    appiontmentApptDate.innerHTML = "วันนัดรับเล่มทะเบียน : " + formatDate7Day(productObj.prod_order_date)
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
    document.getElementById('alert-cost-number').innerHTML = "หมายเลขทะเบียน " + value
    //print_appiontment_

}
function deleteProductCustomer() {
    let productObj = this.searchProductByCarLicense(select, product)
    this.deleteProduct(productObj).then((check_product) => {
        if (check_product) {
            this.closeLicenseDelete()
            alert('ลบสำเร็จ')
            this.removeAlloption()
            this.startForm()
        } else {
            this.closeLicenseDelete()
            alert('เกิดข้อผิดพลาดลบไม่สำเร็จ')
        }
    })
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
function formatDate7Day(value) {
    var str = value.split("/");
    var dd = Number.parseInt(str[0])
    var mm = Number.parseInt(str[1])
    var yyyy = Number.parseInt(str[2])
    var date = ''
    var int_dd = Number.parseInt(dd)
    var int_mm = Number.parseInt(mm)
    var int_yyyy = Number.parseInt(yyyy)
    if (int_mm != 2) {
        if (int_dd + 7 <= 31) {
            date = (int_dd + 7) + '/' + int_mm + '/' + int_yyyy
        } else {
            let tempDay = dd + 7 - 31
            if (int_mm + 1 <= 12) {
                date = tempDay + '/' + (int_mm + 1) + '/' + int_yyyy
            } else {
                date = tempDay + '/' + (int_mm + 1 - 12) + '/' + (int_yyyy + 1)
            }
        }
    } else {
        if (int_dd + 7 <= 28) {
            date = (int_dd + 7) + '/' + int_mm + '/' + int_yyyy
        } else {
            let tempDay = int_dd + 7 - 28
            date = tempDay + '/' + (int_mm + 1) + '/' + int_yyyy
        }
    }
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
function checInvioce(value) {
    getAllProductByType("RegisterLicense").then((data) => {
        let checkObj = searchProductByCarLicense(select, product)
        console.log(checkObj)
        if (select === "none") {
            alert("กรุณาเลือกหมายเลขทะเบียนรถก่อน")
        }
        else if (value === 'print_detail' || value === 'print_appiontment') {
            printDiv(value)
        }
        else if (checkObj.trn_desc.licenae_status) {
            this.setAttributePrintFormBills()
            printDiv(value)
        } else {
            alert("ไม่สามารถพิมพ์ใบเสร็จเนื่องจากยังไม่มีการกำหนดราคาราคา")
        }
    });
}
function InsertCost() {
    let productObj = searchProductByCarLicense(select, product)
    let price = document.getElementById('inputCostPrice').value
    let cost = document.getElementById('inputCostService').value
    let sum = 0

    if (price.length === 0 || cost.length === 0) {
        alert('กรุณาระบุราคาให้ครบ')
    } else {
        sum = Number.parseInt(price) + Number.parseInt(cost)
        let tempProduct = {}
        tempProduct.prod_id = productObj.prod_id
        tempProduct.price_per_book = Number.parseInt(price)
        tempProduct.fare = Number.parseInt(cost)
        tempProduct.total_price = sum
        console.log(tempProduct)
        this.changeStatusProduct(tempProduct).then((check_producStatus) => {
            if (check_producStatus) {
                let tempBills = {}
                tempBills.price = sum
                tempBills.carLicense = select
                tempBills.cusId = productObj.cust_id
                tempBills.InvoId = searchInvoiceByCusIdAndProductId(productObj.cust_id, productObj.prod_id, invoiceAppointment).invo_id
                tempBills.prodId = productObj.prod_id
                this.insertBillsRegister(tempBills).then((check_billsResgister) => {
                    if (check_billsResgister) {
                        alert('บันทึกข้อมูลสำเร็จ')
                        this.closeLicenseCost()
                        this.removeAlloption()
                        this.startForm()
                    } else {
                        alert('เกิดข้อผิดพลาดทางเซิฟเวอร์')
                    }
                })
            } else {
                alert('เปลี่ยนไม่สำเร็จ')
            }
        })
    }
}
function CheckInsertCost() {
    if (select !== 'none') {
        product = []
        this.getAllProductByType("RegisterLicense").then((result) => {
            let checkObj = searchProductByCarLicense(select, product)
            if (!checkObj.trn_desc.licenae_status) {
                this.launchLicenseCost()
            } else {
                alert('หมายเลขทะเบียน ' + select + '  นี้มีการเพิ่มราคาไปแล้ว')
            }
        })
    } else {
        alert('กรุณาเลือกหมายเลขทะเบียนรถก่อน')
    }
}
function deleteProduct(productObj) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/product/delete', { "productData": productObj }).then((result) => {
            resolve(result.data);
        })
    })
}
function changeStatusProduct(productData) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/product/register/changeStatus/', { "productData": productData }).then((result) => {
            resolve(result.data);
        })
    })
}
function getLastInvoice() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/invoice/last').then((result) => {
            resolve(result.data);
        })
    })
}
//invoices
function insertBillsRegister(invoiceObj) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/invoice/bills/register/add', { "invoiceData": invoiceObj }).then((result) => {
            resolve(result.data);
        })
    })
}
function setAttributePrintFormBills() {
    let productData = this.searchProductByCarLicense(select, product)
    let invoiceData = this.searchInvoiceByCusIdAndProductId(productData.cust_id, productData.prod_id, invoiceBills)
    let customerData = this.searchCustomer(productData.cust_id, customer)
    console.log(invoiceData)
    document.getElementById('invoice_productLineNumber').innerHTML = '1'
    document.getElementById('invoice_productNumber').innerHTML = '1'
    document.getElementById('invoice_customerName').innerHTML = 'ผู้ซื้อ : ' + customerData.cust_name
    document.getElementById('invoice_customerId').innerHTML = 'รหัสลูกค้า : ' + productData.cust_id
    document.getElementById('invoice_customerAddress').innerHTML = 'ที่อยู่ : ' + customerData.cust_addr
    document.getElementById('invoice_customerTax').innerHTML = ' เลขที่ผู้เสียภาษี : ' + customerData.cust_tax_no
    document.getElementById('invoice_productCarLicense').innerHTML = productData.trn_desc.car_license
    document.getElementById('invoice_productCost').innerHTML = invoiceData.type_desc.total
    document.getElementById('invoice_productPrice').innerHTML = invoiceData.type_desc.total
    document.getElementById('invoice_total').innerHTML = invoiceData.type_desc.total
    document.getElementById('invoice_tax').innerHTML = invoiceData.type_desc.tax
    document.getElementById('invoice_totalAll').innerHTML = invoiceData.type_desc.exc_vat

    document.getElementById('bill_date').innerHTML = '&nbspวันที่ออกใบ : ' + formatStringDate(invoiceData.issue_date)
    document.getElementById('printBillCustomerName').innerHTML = 'ชื่อลูกค้า : ' + customerData.cust_name
    document.getElementById('printBillCustomerAddress').innerHTML = 'ที่อยู่ : ' + customerData.cust_addr
    document.getElementById('printBillCustomerPhone').innerHTML = 'เบอร์โทรศัทพ์ : ' + customerData.cust_phone
    document.getElementById('printBillProducCar').innerHTML = productData.trn_desc.car_license
    document.getElementById('printBillProducNumber').innerHTML = '1'
    document.getElementById('printBillProductPrice').innerHTML = invoiceData.type_desc.total
    document.getElementById('printBillCostAll').innerHTML = 'ราคารวม : ' + invoiceData.type_desc.total
    document.getElementById('printBillVat').innerHTML = 'ภาษี VAT 7 % : ' + invoiceData.type_desc.tax
    document.getElementById('printBillPriceAll').innerHTML = 'ราคาสุทธิ : ' + invoiceData.type_desc.exc_vat


}

startForm();
