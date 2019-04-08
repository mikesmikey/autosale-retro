
whenFormOpenUp();
let resultObject;
let partshub = [];
let product = []
let customer = [];
let invoice = [];
let thisCustomer = '';
let maxCustomer = -1;
let maxProduct = -1;
let maxInvoice = -1;
let FileUpload = '';

function whenFormOpenUp() {
    getAllCustomer().then((data) => {
        createselect(data);
    });
    getAllProduct();
    getAllInvoice();
    getAllPart();
}

function uploadImage(event) {
    var selectedFile = event.target.files[0];
    console.log(selectedFile)
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

function insertThisCustomerByCarFix() {
    let CarFixAdds = [];
    CarFixAdds.push(document.getElementById('cust-name').value);
    CarFixAdds.push(document.getElementById('cust-phone').value);
    CarFixAdds.push(document.getElementById('cust-tax_no').value);
    CarFixAdds.push(document.getElementById('cust-addr').value);

    CarFixAdds.push(document.getElementById('car-brand').value);
    CarFixAdds.push(document.getElementById('car-model').value);
    CarFixAdds.push(document.getElementById('car-license').value);
    CarFixAdds.push(document.getElementById('repair-detail').value);
    CarFixAdds.push(FileUpload);

    let checkNull = false;
    for (var i in CarFixAdds) {
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

        var canFindThisCust = searchCustomerByName(CarFixAdds[0], customer)

        var customerOfCarFixData = {
            cust_id: (typeof canFindThisCust === 'undefined') ? maxCustomer + 1 : canFindThisCust.cust_id,
            cust_name: CarFixAdds[0],
            cust_phone: CarFixAdds[1],
            cust_tax_no: CarFixAdds[2],
            cust_addr: CarFixAdds[3]
        };

        var productCarFixData = {
            prod_id: maxProduct + 1,
            cust_id: maxCustomer + 1,
            prod_order_date: "",
            prod_type: 'Repair',
            type_desc: {
                repair_detail: CarFixAdds[7].split(/\n/),
                repair_status: "ยังไม่อยากซ่อม",
                cost_of_repairs: 0,
                trn_parts_repair: []
            },
            trn_car: {
                car_brand: CarFixAdds[4],
                car_model: CarFixAdds[5],
                car_license: CarFixAdds[6],
                car_pic: {}
            }
        };

        var invoiceAppt = {
            invo_id: maxInvoice + 1,
            prod_id: maxProduct + 1,
            cust_id: maxCustomer + 1,
            issue_date_no: 1,
            invo_type: "Appointment",
            type_desc: {
                type: "Repair",
                appt_date: "2018 03 22"
            },
            issue_date: "2018 03 20"
        }

        var image = {
            name: FileUpload.name,
            size: FileUpload.size,
            type: "image/jpeg"
        }

        console.log(customerOfCarFixData)
        console.log(productCarFixData)
        console.log(invoiceAppt)
        console.log(image)
        // addCustomerByCarFix(customerOfCarFixData).then((data) => {
        //     if (data) {
        //         alert('เพิ่มลูกค้าสำเร็จ')
        //         addProductByCarFix(productCarFixData).then((data) => {
        //             if (data) {
        //                 alert('เพิ่มโปรดักสำเร็จ')
        //                 addInvoiceAppt(invoiceAppt).then((data) => {
        //                     if (data) {
        //                         alert('เพิ่มใบนัดรับ(รถ)สำเร็จ')                              
        //                         addImageByCarFix(image).then((data) => {
        //                             if (data) {
        //                                 alert('เพิ่มรูปรถสำเร็จ')
        //                             }
        //                             else {
        //                                 alert('เพิ่มรูปรถไม่สำเร็จ')
        //                             }
        //                         })      
        //                     }
        //                     else {
        //                         alert('เพิ่มรูปรถไม่สำเร็จ')
        //                     }
        //                 })
        //             }
        //             else {
        //                 alert('เพิ่มโปรดักไม่สำเร็จ')
        //             }
        //         })
        //     }
        //     else {
        //         alert('เพิ่มลูกค้าไม่สำเร็จ')
        //     }
        // })
        addImageByCarFix(image).then((data) => {
            if (data) {
                alert('เพิ่มรูปรถสำเร็จ')
            }
            else {
                alert('เพิ่มรูปรถไม่สำเร็จ')
            }
        })
        CarFixAdds = []
        // window.location.href = 'car_fix.html';
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
            var select = document.getElementById("lplate_add_selected");
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
function addInvoiceAppt(invoData) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/invoice/type/Appt/add', { "invoData": invoData }).then((result) => {
            resolve(result.data);
        })
    })
}

function addImageByCarFix(source) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/image/add', { "source": source }).then((result) => {
            resolve(result.data);
        })
    })
}

function addCustomerByCarFix(custData) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/customer/add', { "custData": custData }).then((result) => {
            resolve(result.data);
        })
    })
}

function addProductByCarFix(prodData) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/product/type/Repair/add', { "prodData": prodData }).then((result) => {
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

// function getAllInvoiceByType(type) {
//     return new Promise((resolve, reject) => {
//         axios.get('http://localhost:5000/invoices/type/' + type).then((result) => {

//             resolve(result.data);
//             for (let i = 0; i < result.data.length; i++) {
//                 invoice.push(result.data[i])
//             }
//         })
//     })
// }

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

// function getAllProductByType(type) {
//     return new Promise((resolve, reject) => {
//         axios.get('http://localhost:5000/products/type/' + type).then((result) => {
//             resolve(result.data);
//             for (let i = 0; i < result.data.length; i++) {
//                 product.push(result.data[i])
//             }
//         })

//     })
// }
////////////////////////////////////////////////////////////////////




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