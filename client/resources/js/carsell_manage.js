let thisCarLicense = "";
let product = [];
let resultObject;
let customer = [];
let carimages = [];
let invoice = [];
function startForm() {
    getAllCarImages("Buy");
    getAllProductByType("Buy").then((data) => {
        createselect(data);
    });
    getAllCustomer();
    getAllInvoice();
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

function getAllProductNotSoldByType() {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:5000/products/type/Buy/notSold").then(result => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                product.push(result.data[i]);
            }
        });
    });
}

function searchProductByCarLicense(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].trn_car.car_license === nameKey) {
            return myArray[i];
        }
    }
    return null;
}

function checkStatusSell(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].trn_car.car_license === nameKey && myArray[i].type_desc.status_sell === "ยังไม่ขาย" ) {
            return true;
        }
        else {
            return false;
        }
    }
}

function searchProduct(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].prod_id === nameKey) {
            return myArray[i];
        }
    }
    return null;
}

function searchCarImage(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].cust_id === nameKey) {
            return myArray[i];
        }
    }
}

function searchCustomer(nameKey, myArray) {
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

function searchInvoiceByPartnerAndProd(type, partnerId, prodId, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].invo_type === type && myArray[i].partner_id === parseInt(partnerId) && myArray[i].prod_id === parseInt(prodId)) {
            return myArray[i];
        }
    }
    return null;
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function mockCarSellAdd() {
    let checkstatus = checkStatusSell(thisCarLicense, product)
    if (thisCarLicense != "") {
        if(checkstatus) {
            valuate = "?license_plate=" + thisCarLicense + "&customerId=" + resultObject.cust_id + "&productId=" + resultObject.prod_id;
            window.location.href = "./car_sell_add.html" + valuate;
        }
        else {
            alert('รถคันนี้ได้ขายไปแล้ว')
        }
    }
    else {
        alert('กรุณาคลิกป้ายทะเบียนก่อน')
    }
}

function ShowDetail(value) {
    resultObject = searchProductByCarLicense(value, product);

    thisCarLicense = value

    document.getElementById('carsell_upload').src = ""
    let carImage = searchCarImage(resultObject.cust_id, carimages);

    document.getElementById('carsell_upload').src = carImage.base64;

    document.getElementById("carsell-prod_id").innerHTML = "&nbsp;เลขออเดอร์ : " + resultObject.prod_id;
    //เลขทะเบียนรถ
    document.getElementById("car-license").innerHTML = "&nbsp;เลขทะเบียน : " + resultObject.trn_car.car_license;
    //ยี่ห้อ
    document.getElementById("car-brand").innerHTML = "&nbsp;ยี่ห้อ : " + resultObject.trn_car.car_brand;
    //รุ่น
    document.getElementById("car-model").innerHTML = "&nbsp;รุ่น : " + resultObject.trn_car.car_model;
    //เจ้าของ
    document.getElementById("cust-name").innerHTML = "&nbsp;เจ้าของ : " + searchCustomer(resultObject.cust_id, customer).cust_name;

    document.getElementById("carsell-price").innerHTML = "&nbsp;ราคา : " + formatNumber(resultObject.type_desc.price_sell) + " บาท"

    document.getElementById("car-engine").innerHTML = "&nbsp;เครื่องยนต์ : " + resultObject.trn_car.car_engine + " cc"
    document.getElementById("car-status").innerHTML = "&nbsp;สภาพ : " + resultObject.trn_car.car_status + "%"
    document.getElementById("car-histor").innerHTML = "&nbsp;ประวัติ : " + resultObject.trn_car.car_histor

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
            document.getElementById("type").innerHTML = "&nbsp;ประเภทออเดอร์ : Sell";
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
            document.getElementById("partnerLaunchDate").innerHTML = "&nbsp;วันที่ออก : 2018 07 14";
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
            document.getElementById("type").innerHTML = "&nbsp;ประเภทออเดอร์ : Sell";
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
            document.getElementById("contr-prod_carbuy_price").innerHTML = prod.type_desc.price_sell
            document.getElementById("contr-prod_order_date").innerHTML = prod.prod_order_date
        }
        window.print();
        document.body.innerHTML = currentPage;
    }
}
startForm();