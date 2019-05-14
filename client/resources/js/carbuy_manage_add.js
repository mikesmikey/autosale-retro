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
    getAllPart();
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
    let CarFixAdds = [];
    CarFixAdds.push(document.getElementById('cust-name').value);
    CarFixAdds.push(document.getElementById('cust-phone').value);
    CarFixAdds.push(document.getElementById('cust-tax_no').value);
    CarFixAdds.push(document.getElementById('cust-addr').value);

    CarFixAdds.push(document.getElementById('car-brand').value);
    CarFixAdds.push(document.getElementById('car-model').value);
    CarFixAdds.push(document.getElementById('car-license').value);
    CarFixAdds.push(document.getElementById('car-engine').value);
    CarFixAdds.push(document.getElementById('car-status').value);
    CarFixAdds.push(document.getElementById('car-histor').value);
    CarFixAdds.push(document.getElementById('carbuy-price').value);
    CarFixAdds.push(document.getElementById('carsell-price').value);
    CarFixAdds.push(document.getElementById('detail-assess').value);
    CarFixAdds.push(FileUpload);

    CarFixAdds.push(document.getElementById('partner-name').value);
    CarFixAdds.push(document.getElementById('partner-phone').value);

    let checkNull = false;
    for (var i = 0; i < CarFixAdds.length - 2; i++) {
        if (CarFixAdds[i] === '') {
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

    console.log(maxCustomer);
    console.log(maxInvoice)

    if (checkNull) {
        alert('กรุณากรอกข้อมูลให้ครบ')
    }
    else {
        console.log(CarFixAdds)
        var canFindThisCust = searchCustomerByName(CarFixAdds[0], customer)
        var canFindThisPartner = searchPartnerByName(CarFixAdds[12], partner)
        var productCarBuyData;
        if(canFindThisPartner === undefined) {
            productCarBuyData = {
                prod_id: maxProduct + 1,
                cust_id: (typeof canFindThisCust === 'undefined') ? maxCustomer + 1 : canFindThisCust.cust_id,
                prod_order_date: "15/03/2018",
                prod_type: 'Buy',
                type_desc: {
                    price_buy: CarFixAdds[10],
                    price_sell: CarFixAdds[11],
                    detail_assessment: CarFixAdds[12],
                    status_buy: "ยังไม่ขาย"
                },
                trn_car: {
                    car_brand: CarFixAdds[4],
                    car_model: CarFixAdds[5],
                    car_license: CarFixAdds[6],
                    car_pic: {},
                    car_engine: CarFixAdds[7],
                    car_status: CarFixAdds[8],
                    car_histor: CarFixAdds[9]
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
                    price_buy: CarFixAdds[10],
                    price_sell: CarFixAdds[11],
                    commission: 5000,
                    detail_assessment: CarFixAdds[12],
                    status_buy: "ยังไม่ขาย"
                },
                trn_car: {
                    car_brand: CarFixAdds[4],
                    car_model: CarFixAdds[5],
                    car_license: CarFixAdds[6],
                    car_pic: {},
                    car_engine: CarFixAdds[7],
                    car_status: CarFixAdds[8],
                    car_histor: CarFixAdds[9]
                }
            };
        }

        var customerOfCarBuyData = {
            cust_id: (typeof canFindThisCust === 'undefined') ? maxCustomer + 1 : canFindThisCust.cust_id,
            cust_name: CarFixAdds[0],
            cust_phone: CarFixAdds[1],
            cust_tax_no: CarFixAdds[2],
            cust_addr: CarFixAdds[3]
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
            base64: convertToBase64
        }

        console.log(productCarBuyData)
        console.log(customerOfCarBuyData)
        console.log(invoiceContract)
        console.log(image)

        //if new customer
        if (typeof canFindThisCust === 'undefined') {
            addCustomerByCarFix(customerOfCarBuyData).then((data) => {
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
                            alert('เพิ่มใบสัญญาซื้อสำเร็จ')
                            //window.location.href = './car_buy.html';
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

function addImageByCarBuy(source) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/image/add', { "source": source }).then((result) => {
            resolve(result.data);
        })
    })
}

function addCustomerByCarFix(custData) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/customer/addByCarfix', { "custData": custData }).then((result) => {
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

function addProductByCarBuy(prodData) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/product/type/Buy/add', { "prodData": prodData }).then((result) => {
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