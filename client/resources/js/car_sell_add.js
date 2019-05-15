var customer = [];
var selectName = "none";
var partner = [];
var select = document.getElementById("PartnerSelect");
let max = 0;
let numberStatr = 0;
let companyname = "";

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

function getAllPartner() {
    return new Promise((resolve, reject) => {
            axios.get('http://localhost:5000/partners').then((result) => {
                resolve(result.data);
            })
    })
}

function getCustomerDetailByName(name, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].cust_name === name) {
            return myArray[i];
        }
    }
    return null;
}

function startForm() {
    getAllCustomer().then((data) => {
        createSelect(data);
    });
}

function showDetailCustomer(value) {
    showInputAdd('close')
    selectName = value
    let resultObject = getCustomerDetailByName(value, customer);
    document.getElementById("label_name").innerHTML = "ชื่อ : " + resultObject.cust_name;
    document.getElementById("label_phone").innerHTML = "โทรศัพท์ : " + resultObject.cust_phone;
    document.getElementById("label_address").innerHTML = "ที่อยู่ : " + resultObject.cust_addr;
    document.getElementById("label_tax").innerHTML = "เลขประจำตัวผู้เสียภาษี : " + resultObject.cust_tax_no;
}

function createSelect(data) {
    for (let i = 0; i < data.length; i++) {
        var select = document.getElementById("selectCustomer");
        var option = document.createElement("option");
        option.text = data[i].cust_name;
        option.value = data[i].cust_name;
        option.onclick = function () { showDetailCustomer(this.value); };
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
        document.getElementById('input_data').classList.remove('deplay-none')
        document.getElementById('data_show').classList.add('deplay-none')
    } else {
        document.getElementById('data_show').classList.remove('deplay-none')
        document.getElementById('input_data').classList.add('deplay-none')
    }
}

function setDafault() {
    document.getElementById('label_name').innerHTML = 'ชื่อ : '
    document.getElementById('label_address').innerHTML = 'ที่อยู่ : '
    document.getElementById('label_phone').innerHTML = 'เบอร์โทรศัพท์ : '
    document.getElementById('label_tax').innerHTML = 'เลขประจำตัวผู้เสียภาษี : '
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

function checkInsert(){
    var pname = document.getElementById('partner_name').value
    if(pname.length !== 0){
        
    }
}

startForm();