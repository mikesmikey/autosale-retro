let thisCarLicense = "";
let product = [];
let partner = [];
let resultObject;
let customer = [];
let carimages = [];
let invoice = [];

function startForm() {
    getAllCarImages("Buy");
    getAllProductByType("Buy").then((data) => {
        createselect(data);
    });
    getAllPartner();
    getAllCustomer();
    getAllInvoice();
}

function getAllInvoice() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/invoices/').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                invoice.push(result.data[i])
            }
        })
    })
}
function getAllPartner() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/partners').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                partner.push(result.data[i])
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
function getAllCarImages(type) {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:5000/images/type/" + type).then(result => {
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

function mockCarBuyAdd() {
    window.location.href = './car_buy_add.html'
}

function ShowDetail(value) {
    resultObject = searchProductByCarLicense(value, product);

    thisCarLicense = value

    document.getElementById('carbuy_upload').src = ""
    let carImage = searchCarImage(resultObject.cust_id, carimages);

    document.getElementById('carbuy_upload').src = carImage.base64;

    document.getElementById("dca_prod_id").innerHTML = "&nbsp;เลขออเดอร์ : " + resultObject.prod_id;
    //เลขทะเบียนรถ
    document.getElementById("dca_car_license").innerHTML = "&nbsp;เลขทะเบียน : " + resultObject.trn_car.car_license;
    //ยี่ห้อ
    document.getElementById("dca_car_brand").innerHTML = "&nbsp;ยี่ห้อ : " + resultObject.trn_car.car_brand;
    //รุ่น
    document.getElementById("dca_car_model").innerHTML = "&nbsp;รุ่น : " + resultObject.trn_car.car_model;
    //เจ้าของ
    document.getElementById("dca_customer_name").innerHTML = "&nbsp;เจ้าของ : " + searchCustomer(resultObject.cust_id, customer).cust_name;

    document.getElementById("car_engine").innerHTML = "&nbsp;เครื่องยนต์ : " + resultObject.trn_car.car_engine + " cc"
    document.getElementById("car_status").innerHTML = "&nbsp;สภาพ : " + resultObject.trn_car.car_status + "%"
    document.getElementById("car_history").innerHTML = "&nbsp;ประวัติ : " + resultObject.trn_car.car_histor

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

function SeeCarsInStock() {
    console.log(carimages, product)

    let productNotSold = [];
    let check = false;

    for (let i = 0; i < carimages.length; i++) {
        for (let j = 0; j < product.length; j++) {
            if (carimages[i].cust_id === product[j].cust_id &&
                carimages[i].prod_id === product[j].prod_id &&
                product[j].type_desc.status_sell === "ยังไม่ขาย") {
                check = true;
                productNotSold.push(product[j])
            }
        }
    }
    if(check) {
        removeAlloption()
        createselect(productNotSold)
    }
    else {
        alert('ไม่มีรถในสต๊อกเหลือแล้ว')
    }
}

function runScript(e) {
    if (e.keyCode == 13) {
        var txt = document.getElementById("search").value
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

function checkThis() {
    if (resultObject.type_desc.commission !== 0) {
        printDiv('receipter')
    }
    else {
        printDiv('receipt')
    }
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
        // console.log(resultObject)

        if (printDivName === 'receipter') {

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
            document.getElementById("type").innerHTML = "&nbsp;ประเภทออเดอร์ : Buy";
            document.getElementById("launchDate").innerHTML = "&nbsp;วันที่ออก : 2018 05 14";

            rect = searchInvoiceByPartnerAndProd("ReceiptPartner", resultObject.type_desc.partner_id, resultObject.prod_id, invoice)
            let partnerShow = searchPartner(resultObject.type_desc.partner_id, partner)
            var table = document.getElementById("tablePartner")

            for (var i = 0; i < rect.type_desc.items.length; i++) {

                let row = table.insertRow(i + 1);
                let name = row.insertCell(0);
                let price = row.insertCell(1);
                let num = row.insertCell(2);

                name.innerHTML = rect.type_desc.items[i].name;
                price.innerHTML = rect.type_desc.items[i].price;
                num.innerHTML = rect.type_desc.items[i].num;
            }
            console.log()
            document.getElementById("partnerProdId").innerHTML = "&nbsp;เลขที่ออเดอร์ : " + rect.prod_id;
            document.getElementById("partnerInvoId").innerHTML = "&nbsp;เลขที่บิล : " + rect.invo_id;
            document.getElementById("prodType").innerHTML = "&nbsp;ประเภทออเดอร์ : Buy";
            document.getElementById("partnerLaunchDate").innerHTML = "&nbsp;วันที่ออก : 2018 05 14";
            document.getElementById("partnerName").innerHTML = "&nbsp;ชื่อนายหน้า : " + partnerShow.partner_name;
            document.getElementById("partnerCompany").innerHTML = "&nbsp;ชื่อบริษัท : " + partnerShow.company_name;
            document.getElementById("partnerType").innerHTML = "&nbsp;ประเภทนายหน้า : " + partnerShow.partner_type;

        }
        else if (printDivName === "receipt") {
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
            document.getElementById("type").innerHTML = "&nbsp;ประเภทออเดอร์ : Buy";
            document.getElementById("launchDate").innerHTML = "&nbsp;วันที่ออก : 2018 05 14";

        }
        else if (printDivName === 'bill') {
            let bill = searchInvoiceByCustAndProd("Bill", resultObject.cust_id, resultObject.prod_id, invoice)

            var table = document.getElementById("bill-table")

            var total = 0, numberParts = 0;

            for (var i = 0; i < bill.type_desc.items.length; i++) {

                let row = table.insertRow(i + 1);
                let lineNumber = row.insertCell(0);
                let name = row.insertCell(1);
                let price = row.insertCell(2);
                let num = row.insertCell(3);

                lineNumber.innerHTML = i + 1;
                name.innerHTML = bill.type_desc.items[i].name;
                price.innerHTML = bill.type_desc.items[i].price;
                num.innerHTML = bill.type_desc.items[i].num;

                total += bill.type_desc.items[i].price * bill.type_desc.items[i].num;
                numberParts += bill.type_desc.items[i].num;
            }

            let custShow = searchCustomer(resultObject.cust_id, customer);
            document.getElementById("bill-cust_name").innerHTML = "ผู้ซื้อ : " + custShow.cust_name
            document.getElementById("bill-cust_id").innerHTML = "รหัสลูกค้า : " + custShow.cust_id
            document.getElementById("bill-cust_tax_no").innerHTML = "เลขที่ผู้เสียภาษี : " + custShow.cust_tax_no
            document.getElementById("bill-cust_addr").innerHTML = "ที่อยู่ : " + custShow.cust_addr

            document.getElementById("bill-total").innerHTML = total
            document.getElementById("bill-discount").innerHTML = 0
            document.getElementById("bill-exc_vat").innerHTML = total + (total * 0.07)
        }
        else if (printDivName === 'contract') {

            let contract = searchInvoiceByCustAndProd("Contract", resultObject.cust_id, resultObject.prod_id, invoice)
            let prod = searchProduct(resultObject.prod_id, product)
            let cust = searchCustomer(resultObject.cust_id, customer)

            document.getElementById("contr-date").innerHTML = contract.issue_date
            document.getElementById("contr-cust_name").innerHTML = cust.cust_name
            document.getElementById("contr-cust_name2").innerHTML = cust.cust_name
            document.getElementById("contr-cust_addr").innerHTML = cust.cust_addr
            document.getElementById("contr-prod_desc").innerHTML = "รถ ยี่ห้อ " + prod.trn_car.car_brand + ",รุ่น " + prod.trn_car.car_model + ",เลขทะเบียน " + prod.trn_car.car_license
            document.getElementById("contr-prod_carbuy_price").innerHTML = prod.type_desc.price_buy
            document.getElementById("contr-prod_order_date").innerHTML = prod.prod_order_date
        }
        window.print();
        document.body.innerHTML = currentPage;
    }
}

function launchFixPrintsHubDelete() {
    if (thisCarLicense != "") {
        document.getElementById("printshub-fix").classList.add("is-active");
    } else {
        alert("กรุณาเลือกทะเบียนรถก่อน");
    }
}

function closeFixPrintsHubDelete() {
    document.getElementById("printshub-fix").classList.remove("is-active");
}

function launchFixDelete() {
    if (thisCarLicense != "") {
        document.getElementById("alert-license-no").innerHTML =
            "หมายเลขทะเบียน : '" + thisCarLicense + "'";
        document.getElementById("delete-fix").classList.add("is-active");
    } else {
        alert("กรุณาเลือกทะเบียนรถก่อน");
    }
}
function closeFixDelete() {
    document.getElementById("delete-fix").classList.remove("is-active");
}

function deleteCarFixProduct() {
    deleteCarBuyProductByThisLicense(thisCarLicense).then(result => {
        // console.log('this car license => ', thisCarLicense)
        if (result) {
            alert("ลบสำเร็จ");
            window.location.reload(true);
        } else {
            alert("ลบไม่สำเร็จ!");
            window.location.reload(true);
        }
    });
    thisCarLicense = "";
    closeFixDelete();
}

function deleteCarBuyProductByThisLicense(car_license) {
    return new Promise((resolve, reject) => {
        axios
            .post("http://localhost:5000/product/type/Buy/remove/" + car_license)
            .then(result => {
                resolve(result.data);
            });
    });
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

function searchPartner(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].partner_id === nameKey) {
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

function searchInvoiceByPartnerAndProd(type, partnerId, prodId, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].invo_type === type && myArray[i].partner_id === parseInt(partnerId) && myArray[i].prod_id === parseInt(prodId)) {
            return myArray[i];
        }
    }
    return null;
}
startForm();