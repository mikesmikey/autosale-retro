let resultObject;
let partshub = [];
let partner = [];
let product = []
let customer = [];
let invoice = [];
let thisCustomer = '';
let maxCustomer = -1;
let maxProduct = -1;
let maxInvoice = -1;
let FileUpload = '';
let convertToBase64;
let imageType;
let imageFile;
let selectedFile;

function startForm() {
    getAllCustomer().then((data) => {
        createselect(data);
    });
    getAllPartner();
    getAllProduct();
    getAllInvoice();
    // getAllPart();
}

function getBase64() {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(FileUpload);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function wrapThis(data) {
    convertToBase64 = data;
}

function uploadImage(event) {
    selectedFile = event.target.files[0];
    var reader = new FileReader();
    // console.log(document.getElementById('image-upload').files[0])
    // document.getElementById('image-upload').value = files[0]
    var file = document.getElementById('image-upload').value.split('\\').pop().split('.')
    var img = document.getElementById('img_car')

    if (file[1] === 'jpg' || file[1] === 'png' || file[1] === 'PNG' || file[1] === 'svg') {
        reader.onload = function (event) {
            img.src = event.target.result;
            img.alt = 'car upload'
            img.width = '300'
            img.height = '200'
        };

        reader.readAsDataURL(selectedFile)
        FileUpload = selectedFile;

        // imageType = `image/${file[1]}`
        // getImageByCarFixWithCustomerId("5cd88323db38ac040ca0713a").then(data => {
        //     console.log(data)
        // })
        // imageFile = new FormData()
        // imageFile.append('carImg', selectedFile);

        getBase64(FileUpload).then(data => wrapThis(data))
    }
    else {
        alert('ไม่ใช่ไฟล์รูปภาพ กรุณาเลือกใหม่')
        document.getElementById('image-upload').value = ''
        FileUpload = '';
    }
}

function ShowCustomerName(customerName) {
    showInputAdd('close')
    selectName = customerName
    var result = searchCustomerByName(customerName, customer)

    document.getElementById('show-cust-name').innerHTML = 'ชื่อ : ' + result.cust_name
    document.getElementById('cust-name').value = result.cust_name

    document.getElementById('show-cust-addr').innerHTML = 'ที่อยู่ : ' + result.cust_addr
    document.getElementById('cust-addr').value = result.cust_addr

    document.getElementById('show-cust-phone').innerHTML = 'เบอร์โทรศัพท์ : ' + result.cust_phone
    document.getElementById('cust-phone').value = result.cust_phone

    document.getElementById('show-cust-tax_no').innerHTML = 'เลขประจำตัวผู้เสียภาษี : ' + result.cust_tax_no
    document.getElementById('cust-tax_no').value = result.cust_tax_no

}
function showInputAdd(command) {
    if (command === 'show') {
        setDafault()
        selectName = 'none'
        document.getElementById('data_input').classList.remove('deplay-none')
        document.getElementById('data_show').classList.add('deplay-none')
    } else {
        document.getElementById('data_input').classList.add('deplay-none')
        document.getElementById('data_show').classList.remove('deplay-none')
    }
}
function setDafault() {
    document.getElementById('show-cust-name').innerHTML = 'ชื่อ : '
    document.getElementById('cust-name').value = ''

    document.getElementById('show-cust-addr').innerHTML = 'ที่อยู่ : '
    document.getElementById('cust-addr').value = ''

    document.getElementById('show-cust-phone').innerHTML = 'เบอร์โทรศัพท์ : '
    document.getElementById('cust-phone').value = ''

    document.getElementById('show-cust-tax_no').innerHTML = 'เลขประจำตัวผู้เสียภาษี : '
    document.getElementById('cust-tax_no').value = ''

}

function insertThisCustomerByCarBuy() {
    let carbuy = [];
    carbuy.push(document.getElementById('cust-name').value);
    carbuy.push(document.getElementById('cust-phone').value);
    carbuy.push(document.getElementById('cust-tax_no').value);
    carbuy.push(document.getElementById('cust-addr').value);

    carbuy.push(document.getElementById('car-brand').value);
    carbuy.push(document.getElementById('car-model').value);
    carbuy.push(document.getElementById('car-license').value);
    carbuy.push(document.getElementById('car-engine').value);
    carbuy.push(document.getElementById('car-status').value);
    carbuy.push(document.getElementById('car-histor').value);
    carbuy.push(parseInt(document.getElementById('carbuy-price').value));
    carbuy.push(parseInt(document.getElementById('carsell-price').value));
    carbuy.push(document.getElementById('detail-assess').value);
    carbuy.push(FileUpload);

    carbuy.push(document.getElementById('partner-name').value);
    carbuy.push(document.getElementById('partner-phone').value);

    let checkNull = false;
    for (var i = 0; i < carbuy.length - 2; i++) {
        if (carbuy[i] === '') {
            checkNull = true;
        }
    }

    for (var i in invoice) {
        if (invoice[i].cust_id > maxInvoice) {
            maxInvoice = invoice[i].invo_id;
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

    if (maxProduct === -1)
        maxProduct = 0
    if (maxCustomer === -1)
        maxCustomer = 0
    if (maxInvoice === -1)
        maxInvoice = 0

    console.log(maxCustomer);
    console.log(maxInvoice)

    if (checkNull) {
        alert('กรุณากรอกข้อมูลให้ครบ')
    }
    else {
        var canFindThisCust = searchCustomerByName(carbuy[0], customer)
        var canFindThisPartner = searchPartnerByName(carbuy[14], partner)
        var productCarBuyData;
        if (canFindThisPartner === undefined) {
            productCarBuyData = {
                prod_id: maxProduct + 1,
                cust_id: (typeof canFindThisCust === 'undefined') ? maxCustomer + 1 : canFindThisCust.cust_id,
                prod_order_date: "15/03/2018",
                prod_type: 'Buy',
                type_desc: {
                    price_buy: carbuy[10],
                    price_sell: carbuy[11],
                    commission: 0,
                    detail_assessment: carbuy[12],
                    status_sell: "ยังไม่ขาย"
                },
                trn_car: {
                    car_brand: carbuy[4],
                    car_model: carbuy[5],
                    car_license: carbuy[6],
                    car_pic: {},
                    car_engine: carbuy[7],
                    car_status: carbuy[8],
                    car_histor: carbuy[9]
                }
            };
        }
        else {
            productCarBuyData = {
                prod_id: maxProduct + 1,
                cust_id: (typeof canFindThisCust === 'undefined') ? maxCustomer + 1 : canFindThisCust.cust_id,
                prod_order_date: "15/03/2018",
                prod_type: 'Buy',
                type_desc: {
                    partner_id: canFindThisPartner.partner_id,
                    price_buy: carbuy[10],
                    price_sell: carbuy[11],
                    commission: 5000,
                    detail_assessment: carbuy[12],
                    status_sell: "ยังไม่ขาย"
                },
                trn_car: {
                    car_brand: carbuy[4],
                    car_model: carbuy[5],
                    car_license: carbuy[6],
                    car_pic: {},
                    car_engine: carbuy[7],
                    car_status: carbuy[8],
                    car_histor: carbuy[9]
                }
            };
        }

        var customerOfCarBuyData = {
            cust_id: (typeof canFindThisCust === 'undefined') ? maxCustomer + 1 : canFindThisCust.cust_id,
            cust_name: carbuy[0],
            cust_phone: carbuy[1],
            cust_tax_no: carbuy[2],
            cust_addr: carbuy[3]
        };

        var invoiceContract = {
            invo_id: maxInvoice + 1,
            prod_id: maxProduct + 1,
            cust_id: (typeof canFindThisCust === 'undefined') ? maxCustomer + 1 : canFindThisCust.cust_id,
            issue_date_no: 1,
            invo_type: "Contract",
            type_desc: {
                type: canFindThisPartner === undefined ? "None" : (searchPartner(canFindThisPartner.partner_id, partner).partner_type === "Company" ? "Company" : "Agent")
            },
            issue_date: "01/10/2018"
        }

        var image = {
            cust_id: (typeof canFindThisCust === 'undefined') ? maxCustomer + 1 : canFindThisCust.cust_id,
            invo_id: maxInvoice + 1,
            prod_id: maxProduct + 1,
            type: "Buy",
            base64: convertToBase64
        }

        var invoiceBill = {
            invo_id: invoiceContract.invo_id + 1,
            prod_id: invoiceContract.prod_id,
            cust_id: (typeof canFindThisCust === 'undefined') ? maxCustomer + 1 : canFindThisCust.cust_id,
            invo_type: "Bill",
            type_desc: {
                total: carbuy[10],
                tax: carbuy[10] * 0.07,
                exc_vat: carbuy[10] + (carbuy[10] * 0.07),
                items: [
                    {
                        name: "ยี่ห้อ: " + carbuy[4] + ", รุ่น: " + carbuy[5] + ", เลขทะเบียน: " + carbuy[6],
                        price: carbuy[10],
                        num: 1
                    }
                ]
            }
        }

        // console.log(carbuy[13], canFindThisPartner, partner)

        var invoiceReceiptPartner;

        if (canFindThisPartner !== undefined) {
            invoiceReceiptPartner = {
                invo_id: invoiceBill.invo_id + 1,
                prod_id: invoiceContract.prod_id,
                partner_id: canFindThisPartner.partner_id,
                invo_type: "ReceiptPartner",
                type_desc: {
                    total: carbuy[10],
                    tax: carbuy[10] * 0.07,
                    non_vat: Math.abs(carbuy[10] - (carbuy[10] * 0.07)),
                    items: [
                        {
                            name: "ยี่ห้อ: " + carbuy[4] + ", รุ่น: " + carbuy[5] + ", เลขทะเบียน: " + carbuy[6],
                            price: carbuy[10],
                            num: 1
                        }
                    ]
                }
            };

            var invoiceReceipt = {
                invo_id: invoiceReceiptPartner.invo_id + 1,
                prod_id: invoiceContract.prod_id,
                cust_id: (typeof canFindThisCust === 'undefined') ? maxCustomer + 1 : canFindThisCust.cust_id,
                invo_type: "Receipt",
                type_desc: {
                    total: carbuy[10],
                    tax: carbuy[10] * 0.07,
                    non_vat: Math.abs(carbuy[10] - (carbuy[10] * 0.07)),
                    items: [
                        {
                            name: "ยี่ห้อ: " + carbuy[4] + ", รุ่น: " + carbuy[5] + ", เลขทะเบียน: " + carbuy[6],
                            price: carbuy[10],
                            num: 1
                        }
                    ]
                }
            };

            addInvoiceReceiptPartner(invoiceReceiptPartner).then((data) => {
                if (data) {
                    alert('เพิ่มใบเสร็จนายหน้าสำเร็จ')
                    addInvoiceReceipt(invoiceReceipt).then((data) => {
                        if (data) {
                            alert('เพิ่มใบเสร็จลูกค้าสำเร็จ')
                        }
                    })
                }
            })
        }
        else {
            var invoiceReceipt = {
                invo_id: invoiceBill.invo_id + 1,
                prod_id: invoiceContract.prod_id,
                cust_id: (typeof canFindThisCust === 'undefined') ? maxCustomer + 1 : canFindThisCust.cust_id,
                invo_type: "Receipt",
                type_desc: {
                    total: carbuy[10],
                    tax: carbuy[10] * 0.07,
                    non_vat: Math.abs(carbuy[10] - (carbuy[10] * 0.07)),
                    items: [
                        {
                            name: "ยี่ห้อ: " + carbuy[4] + ", รุ่น: " + carbuy[5] + ", เลขทะเบียน: " + carbuy[6],
                            price: carbuy[10],
                            num: 1
                        }
                    ]
                }
            };

            addInvoiceReceipt(invoiceReceipt).then((data) => {
                if (data) {
                    alert('เพิ่มใบเสร็จลูกค้าสำเร็จ')

                }
            })
        }

        //if new customer
        if (typeof canFindThisCust === 'undefined') {
            addCustomerByCarBuy(customerOfCarBuyData).then((data) => {
                if (data) {
                    alert('เพิ่มลูกค้าสำเร็จ')
                }
                else {
                    alert('เพิ่มลูกค้าไม่สำเร็จ')
                }
            })
        }

        addImageByCarBuy(image).then((data) => {
            alert('เพิ่มรูปรถสำเร็จ')
            addProductByCarBuy(productCarBuyData, data).then((data) => {
                if (data) {
                    alert('เพิ่มโปรดักสำเร็จ')
                    addInvoiceContract(invoiceContract).then((data) => {
                        if (data) {
                            alert('เพิ่มใบสัญญาซื้อ-ขายสำเร็จ')
                            addInvoiceBill(invoiceBill).then((data) => {
                                if (data) {
                                    alert('เพิ่มใบกำกับภาษีสำเร็จ')
                                    window.location.href = './car_buy.html';

                                }
                            })
                        }
                    })
                }
            })
        })
    }
}

function addNewCustomerByRepair() {
    document.getElementById('cust-name').disabled = false
    document.getElementById('cust-phone').disabled = false
    document.getElementById('cust-tax_no').disabled = false
    document.getElementById('cust-addr').disabled = false
}

function createselect(data) {
    for (let i = 0; i < data.length; i++) {
        try {
            var select = document.getElementById("carbuy_plicense");
            var option = document.createElement("option");
            option.text = data[i].cust_name;
            option.value = data[i].cust_name;
            option.onclick = function () { ShowCustomerName(this.value); };
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
function addInvoiceContract(invoData) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/invoice/type/Contract/add', { "invoData": invoData }).then((result) => {
            resolve(result.data);
        })
    })
}

function addInvoiceBill(invoData) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/invoice/type/Bill/add', { "invoData": invoData }).then((result) => {
            resolve(result.data);
        });
    });
}

function addInvoiceReceiptPartner(invoData) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/invoice/type/ReceiptPartner/add', { "invoData": invoData }).then((result) => {
            resolve(result.data);
        });
    });
}

function addInvoiceReceipt(invoData) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/invoice/type/Receipt/add', { "invoData": invoData }).then((result) => {
            resolve(result.data);
        });
    });
}

function addImageByCarBuy(source) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/image/add', { "source": source }).then((result) => {
            resolve(result.data);
        })
    })
}

function addCustomerByCarBuy(custData) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/customer/addByCarBuy', { "custData": custData }).then((result) => {
            resolve(result.data);
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

function addProductByCarBuy(prodData, imgId) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/product/type/Buy/add', { "prodData": prodData, "imgId": imgId }).then((result) => {
            resolve(result.data);
        })
    })
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

// function getAllPart() {
//     return new Promise((resolve, reject) => {
//         axios.get('http://localhost:5000/parts/').then((result) => {

//             resolve(result.data);
//             for (let i = 0; i < result.data.length; i++) {
//                 partshub.push(result.data[i])
//             }
//         })
//     })
// }

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
        axios.get('http://localhost:5000/customers/').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                customer.push(result.data[i])
            }
        })
    })
}

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
function searchPartnerByName(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].partner_name === nameKey) {
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
function searchInvoice(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].prod_id === nameKey) {
            return myArray[i];
        }
    }
}
startForm();