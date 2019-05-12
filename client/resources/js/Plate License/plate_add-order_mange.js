let product = [];
let customer = [];
let invoice = [];
let selectName = 'none'
let maxCustomer = -1
let maxInvoice = -1
let maxProduct = -1

function startForm() {
    getAllProductByType("RegisterLicense")
    getAllCustomer().then((data) => {
        createselect(data)
    });
    getAllInvoiceByType("Appointment")
    setMaxvalue()
    var ar = searchCustomerByName("mark zuckerberg",customer)
}

function setMaxvalue() {
    //set product max id
    for (i = 0; i < product.length; i++) {
        if (product.prod_id > maxProduct) {
            maxProduct = product.prod_id
        }
    }
    //set customer max id 
    for (i = 0; i < customer.length; i++) {
        if (customer.cust_id > maxCustomer) {
            maxCustomer = customer.prod_id
        }
    }
    //set invoice max id 
    for (i = 0; i < invoice.length; i++) {
        if (invoice.cust_id > maxInvoice) {
            maxInvoice = invoice.prod_id
        }
    }
}
function getAllCustomer() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/customers').then((result) => {
            for (let i = 0; i < result.data.length; i++) {
                customer.push(result.data[i])
            }
            resolve(result.data);
        })
    })
}
function getAllInvoiceByType(type) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/invoices/type/' + type).then((result) => {
            for (let i = 0; i < result.data.length; i++) {
                invoice.push(result.data[i])
            }
            resolve(result.data);
        })
    })
}
function getAllProductByType(type) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/products/type/' + type).then((result) => {
            for (let i = 0; i < result.data.length; i++) {
                product.push(result.data[i])
            }
            resolve(result.data);
        })

    })
}

/* ค้นหา */
function searchCustomerByName(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].cust_name === nameKey) {
            return myArray[i];
        }
    }
    return null;
}

function removeAlloption() {
    var select = document.getElementById("list-CustomerName");
    var length = select.options.length;
    for (i = 0, c = 0; i < length; i++) {
        select.options[c] = null;
    }
}

function createselect(data) {
    for (let i = 0; i < data.length; i++) {
        var select = document.getElementById("listCustomerName");
        var option = document.createElement("option");
        option.text = data[i].cust_name;
        option.value = data[i].cust_name;
        option.onclick = function () { ShowCustomerName(this.value); };
        select.add(option);
    }
}

function ShowCustomerName(customerName) {
    showInputAdd('close')
    selectName = customerName
    var result = searchCustomerByName(customerName, customer)
    document.getElementById('label_name').innerHTML = 'ชื่อ : ' + result.cust_name
    document.getElementById('label_address').innerHTML = 'ที่อยู่ : ' + result.cust_addr
    document.getElementById('label_phone').innerHTML = 'เบอร์โทรศัพท์ : ' + result.cust_phone
    document.getElementById('label_tax').innerHTML = 'เลขประจำตัวผู้เสียภาษี : ' + result.cust_tax_no
}
function showInputAdd(command) {
    if (command === 'Show') {
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
    document.getElementById('label_name').innerHTML = 'ชื่อ : '
    document.getElementById('label_address').innerHTML = 'ที่อยู่ : '
    document.getElementById('label_phone').innerHTML = 'เบอร์โทรศัพท์ : '
    document.getElementById('label_tax').innerHTML = 'เลขประจำตัวผู้เสียภาษี : '
}

function checkInputText() {
    var cus_name = document.getElementById('input_name').value
    var cus_address = document.getElementById('input_address').value
    var cus_phone = document.getElementById('input_phone').value
    var cus_tax = document.getElementById('input_tax').value
    var cus_input = true

    var car_name = document.getElementById('input_car').value
    var car_num = document.getElementById('input_carNum').value
    var car_model = document.getElementById('input_model').value
    var car_input = true

    if (car_name === '' || car_num === '' || car_model === '') {
        car_input = false
    }

    if (cus_name === '' || cus_address === '' || cus_phone === '' || cus_tax === '') {
        cus_input = false
    }
    if ((selectName === 'none' && cus_input === false) || car_input === false) {
        alert('กรุณากรอกข้อมูล')
    } else {
        if (selectName !== 'none') {
            this.getLastProduct().then((lastProduct) => {
                var productObj = {}
                productObj.prod_id = lastProduct[0].prod_id + 1
                productObj.cust_id = searchCustomerByName(selectName,customer).cust_id
                productObj.car_brand = car_name
                productObj.car_model = car_model
                productObj.car_license = car_num
                var product_check = InsertProduct(productObj);
                if (!product_check) {
                    alert('เกิดข้อผิดหลาดทางเซิฟเวอร์')
                } else {
                    alert('บันทึกข้อมูลสำเร็จ')
                    this.startForm()
                }
             })
        } else {
            this.getLastUser().then((lastUser) =>{
                var custObj = {}
                maxCustomer = lastUser[0].cust_id
                custObj.id = lastUser[0].cust_id + 1
                custObj.name = cus_name
                custObj.addr = cus_address
                custObj.phone = cus_phone
                custObj.tax_no = cus_tax 
                var cust_check = InsertCostomer(custObj);
                this.getLastProduct().then((lastProduct) => {
                    var productObj = {}
                    productObj.prod_id = lastProduct[0].prod_id + 1
                    productObj.cust_id = custObj.id
                    productObj.car_brand = car_name
                    productObj.car_model = car_model
                    productObj.car_license = car_num
                    var product_check = InsertProduct(productObj);
                    if (!product_check) {
                        alert('เกิดข้อผิดหลาดทางเซิฟเวอร์')
                    } else {
                        alert('บันทึกข้อมูลสำเร็จ')
                        this.startForm()
                    }
                })
            })
        }

    }
}

function getLastUser() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/user/last').then((result) => {
            resolve(result.data);
        })
    })
}
function getLastProduct() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/products/productIdLast').then((result) => {
            resolve(result.data);
        })
    })
}
function InsertCostomer(CustomerData) {

    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/customer/insert', { "customerData": CustomerData }).then((result) => {
            resolve(result.data);
        })
    })
}
function InsertProduct(productData) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/products/RegisterLicense/insert', { "productData": productData }).then((result) => {
            resolve(result.data);
        })
    })
}




startForm()