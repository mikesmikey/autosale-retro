var valBucket = decodeURIComponent(window.location.search).substring(1).split("&")
let thisPlateLicense = valBucket[0].split("=").pop()
let thisCustomer = valBucket[1].split("=").pop()
let thisProduct = valBucket[2].split("=").pop()

let product = [];
let customer = [];
let partner = [];
let invoice = [];
let carimage;
let maxCustomer = -1;
let maxInvoice = -1;
let maxProduct = -1;

whenFormOpenUp();

function whenFormOpenUp() {
    // getCarImageByThisCustAndProd(thisCustomer, thisProduct);
    getAllCarImages("Buy").then(data => {
        carimage = data
    })
    getAllCustomer().then((data) => {
        createselect(data);
    });
    getAllProduct().then((data) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].cust_id === parseInt(thisCustomer) && data[i].prod_id === parseInt(thisProduct)) {
                ShowCarDetail(data[i]);
                break;
            }
        }
    });
    getAllInvoice();
    getAllPartner();

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

// function getCarImageByThisCustAndProd(custId, prodId) {
//     return new Promise((resolve, reject) => {
//         axios.get("http://localhost:5000/images/cust/" + custId + "/prod/" + prodId).then(result => {
//             resolve(result.data);
//             document.getElementById("carsell_img").src = result.data.base64;
//         });
//     })
// }

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

function editCarBuyStatusToSold(cust, prod) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/product/type/Buy/edit/cust/' + cust + '/prod/' + prod).then((result) => {
            resolve(result.data);

        })
    });
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

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function ShowCarDetail(value) {

    console.log(value)

    document.getElementById("carBrand").innerHTML = value.trn_car.car_brand
    document.getElementById("carModel").innerHTML = value.trn_car.car_model
    document.getElementById("carLicense").innerHTML = value.trn_car.car_license
    document.getElementById("carsellPrice").innerHTML = formatNumber(value.type_desc.price_sell) + " บาท"
    document.getElementById("carEngine").innerHTML = value.trn_car.car_engine + " cc"
    document.getElementById("carStatus").innerHTML = value.trn_car.car_status + "%"
    document.getElementById("carHistor").innerHTML = value.trn_car.car_histor
}

function ShowCustomerName(customerName) {

    console.log(thisPlateLicense)

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

function createselect(data) {
    for (let i = 0; i < data.length; i++) {
        try {
            var select = document.getElementById("carsell_plicense");
            var option = document.createElement("option");
            option.text = data[i].cust_name;
            option.value = data[i].cust_name;
            option.onclick = function () { ShowCustomerName(this.value); };
            select.add(option);
        }
        catch (error) { }
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

function confirmSold() {
    var arraySell = [];
    arraySell.push(document.getElementById('cust-name').value);
    arraySell.push(document.getElementById('cust-phone').value);
    arraySell.push(document.getElementById('cust-tax_no').value);
    arraySell.push(document.getElementById('cust-addr').value);

    arraySell.push(document.getElementById('partnerName').value);
    arraySell.push(document.getElementById('partnerPhone').value);

    let checkNull = false;
    for (var i = 0; i < arraySell.length - 2; i++) {
        if (arraySell[i] === '') {
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

    if (maxProduct === -1)
        maxProduct = 0
    if (maxCustomer === -1)
        maxCustomer = 0
    if (maxInvoice === -1)
        maxInvoice = 0


    // console.log(thisCustomer, thisProduct)

    if (checkNull) {
        alert('กรุณากรอกข้อมูลให้ครบ')
    }
    else {
        var canFindThisCust = searchCustomerByName(arraySell[0], customer)
        var canFindThisPartner = searchPartnerByName(arraySell[4], partner)
        var productCarSellData;
        console.log('find cust => ', canFindThisCust, ' | find partner => ', canFindThisPartner)


        var productCarBuy = searchProductByCustomerAndProduct("Buy", thisCustomer, thisProduct, product)
        var invoiceBillCarBuy = searchInvoiceByCustomerAndProduct("Bill", thisCustomer, thisProduct, invoice)
        console.log(productCarBuy, invoiceBillCarBuy)

        console.log(carimage)

        // editCarBuyStatusToSold(thisCustomer, thisProduct).then(data => {
        //     if (data) {
        //         alert('อัพเดทสถานะขายแล้ว')
        //     }
        // })

        if (canFindThisPartner === undefined) {
            productCarSellData = {
                prod_id: maxProduct + 1,
                cust_id: (typeof canFindThisCust === 'undefined') ? maxCustomer + 1 : canFindThisCust.cust_id,
                prod_order_date: "19/05/2018",
                prod_type: 'Sell',
                type_desc: {
                    commission: 0,
                },
                trn_car: {
                    car_brand: productCarBuy.trn_car.car_brand,
                    car_model: productCarBuy.trn_car.car_model,
                    car_license: productCarBuy.trn_car.car_license,
                    car_pic: {}
                }
            };
        }
        else {
            productCarSellData = {
                prod_id: maxProduct + 1,
                cust_id: (typeof canFindThisCust === 'undefined') ? maxCustomer + 1 : canFindThisCust.cust_id,
                prod_order_date: "19/05/2018",
                prod_type: 'Sell',
                type_desc: {
                    partner_id: canFindThisPartner.partner_id,
                    commission: 5000,
                },
                trn_car: {
                    car_brand: productCarBuy.trn_car.car_brand,
                    car_model: productCarBuy.trn_car.car_model,
                    car_license: productCarBuy.trn_car.car_license,
                    car_pic: {}
                }
            };
        }

        var customerOfCarSellData = {
            cust_id: (typeof canFindThisCust === 'undefined') ? maxCustomer + 1 : canFindThisCust.cust_id,
            cust_name: arraySell[0],
            cust_phone: arraySell[1],
            cust_tax_no: arraySell[2],
            cust_addr: arraySell[3]
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
            type: "Sell",
            base64: carimage.base64
        }

        var invoiceBill = {
            invo_id: invoiceContract.invo_id + 1,
            prod_id: invoiceContract.prod_id,
            cust_id: (typeof canFindThisCust === 'undefined') ? maxCustomer + 1 : canFindThisCust.cust_id,
            invo_type: "Sell",
            type_desc: {
                total: productCarBuy.type_desc.price_sell,
                tax: productCarBuy.type_desc.price_sell * 0.07,
                exc_vat: productCarBuy.type_desc.price_sell + (productCarBuy.type_desc.price_sell * 0.07),
                items: [
                    {
                        name: "ยี่ห้อ: " + productCarBuy.trn_car.car_brand + ", รุ่น: " + productCarBuy.trn_car.car_model + ", เลขทะเบียน: " + productCarBuy.trn_car.car_license,
                        price: productCarBuy.type_desc.price_sell,
                        num: 1
                    }
                ]
            }
        }

        var invoiceReceiptPartner;

        if (canFindThisPartner !== undefined) {
            invoiceReceiptPartner = {
                invo_id: invoiceBill.invo_id + 1,
                prod_id: invoiceContract.prod_id,
                partner_id: canFindThisPartner.partner_id,
                invo_type: "ReceiptPartner",
                type_desc: {
                    total: productCarBuy.type_desc.price_sell,
                    tax: productCarBuy.type_desc.price_sell * 0.07,
                    non_vat: Math.abs(productCarBuy.type_desc.price_sell - (productCarBuy.type_desc.price_sell * 0.07)),
                    items: [
                        {
                            name: "ยี่ห้อ: " + productCarBuy.trn_car.car_brand + ", รุ่น: " + productCarBuy.trn_car.car_model + ", เลขทะเบียน: " + productCarBuy.trn_car.car_license,
                            price: productCarBuy.type_desc.price_sell,
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
                    total: productCarBuy.type_desc.price_sell,
                    tax: productCarBuy.type_desc.price_sell * 0.07,
                    non_vat: Math.abs(productCarBuy.type_desc.price_sell - (productCarBuy.type_desc.price_sell * 0.07)),
                    items: [
                        {
                            name: "ยี่ห้อ: " + productCarBuy.trn_car.car_brand + ", รุ่น: " + productCarBuy.trn_car.car_model + ", เลขทะเบียน: " + productCarBuy.trn_car.car_license,
                            price: productCarBuy.type_desc.price_sell,
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
                    total: productCarBuy.type_desc.price_sell,
                    tax: productCarBuy.type_desc.price_sell * 0.07,
                    non_vat: Math.abs(productCarBuy.type_desc.price_sell - (productCarBuy.type_desc.price_sell * 0.07)),
                    items: [
                        {
                            name: "ยี่ห้อ: " + productCarBuy.trn_car.car_brand + ", รุ่น: " + productCarBuy.trn_car.car_model + ", เลขทะเบียน: " + productCarBuy.trn_car.car_license,
                            price: productCarBuy.type_desc.price_sell,
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
            addCustomerByCarSell(customerOfCarSellData).then((data) => {
                if (data) {
                    alert('เพิ่มลูกค้าสำเร็จ')
                }
                else {
                    alert('เพิ่มลูกค้าไม่สำเร็จ')
                }
            })
        }

        addImageByCarSell(image).then((data) => {
            alert('เพิ่มรูปรถสำเร็จ')
            addProductByCarSell(productCarSellData, data).then((data) => {
                if (data) {
                    alert('เพิ่มโปรดักสำเร็จ')
                    addInvoiceContract(invoiceContract).then((data) => {
                        if (data) {
                            alert('เพิ่มใบสัญญาซื้อ-ขายสำเร็จ')
                            addInvoiceBill(invoiceBill).then((data) => {
                                if (data) {
                                    alert('เพิ่มใบกำกับภาษีสำเร็จ')
                                    window.location.href = './car_sell.html';

                                }
                            })
                        }
                    })
                }
            })
        })
    }
}

function getAllCarImages(type) {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:5000/images/type/" + type).then(result => {
            for (let i = 0; i < result.data.length; i++) {
                if (result.data[i].cust_id === parseInt(thisCustomer) && result.data[i].prod_id === parseInt(thisProduct)) {
                    resolve(result.data[i])
                }
            }
        });
    })
}

function addImageByCarSell(source) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/image/add', { "source": source }).then((result) => {
            resolve(result.data);
        })
    })
}

function addProductByCarSell(prodData, imgId) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/product/type/Sell/add', { "prodData": prodData, "imgId": imgId }).then((result) => {
            resolve(result.data);
        })
    })
}

function addCustomerByCarSell(custData) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/customer/addByCarSell', { "custData": custData }).then((result) => {
            resolve(result.data);
        })
    })
}

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

function searchInvoice(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].prod_id === nameKey) {
            return myArray[i];
        }
    }
}

function searchInvoiceByCustomerAndProduct(type, customer, product, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].invo_type === type && myArray[i].prod_id === parseInt(product) && myArray[i].cust_id === parseInt(customer)) {
            return myArray[i];
        }
    }
}

function searchProductByCustomerAndProduct(type, customer, product, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].prod_type === type && myArray[i].prod_id === parseInt(product) && myArray[i].cust_id === parseInt(customer)) {
            return myArray[i];
        }
    }
}
