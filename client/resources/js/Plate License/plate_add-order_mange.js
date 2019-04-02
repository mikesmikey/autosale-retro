let product = [];
let customer = [];
let invoice = [];
let selectName = 'none'
function startForm() {
    getAllProductByType("RegisterLicense")
    getAllCustomer().then((data) => {
        createselect(data)
    });
    getAllInvoiceByType("Appointment")
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
        axios.get('http://localhost:5000/invoices/' + type).then((result) => {
            for (let i = 0; i < result.data.length; i++) {
                invoice.push(result.data[i])
            }
            resolve(result.data);
        })
    })
}
function getAllProductByType(type) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/products/' + type).then((result) => {
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
function setDafault(){
    document.getElementById('label_name').innerHTML = 'ชื่อ : ' 
    document.getElementById('label_address').innerHTML = 'ที่อยู่ : ' 
    document.getElementById('label_phone').innerHTML = 'เบอร์โทรศัพท์ : ' 
    document.getElementById('label_tax').innerHTML = 'เลขประจำตัวผู้เสียภาษี : ' 
}








startForm()