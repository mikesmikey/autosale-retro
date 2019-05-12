let product = [];
let customer = [];
let invoice = [];
let custName = "";
let custId = null;
let custPhone = "";
let custTax = "";
let custAddr = "";

function launchCustomerEditPopUp() {
    if (custId != null) {
        document.getElementById('order-customer').classList.add('is-active');
        showDetailCustomerPopUp();
    } else {
        alert("กรุณาเลือกลูกค้าที่ต้องการแก้ไข")
    }
}

function closeCustomerEditPopUp() {
    document.getElementById('order-customer').classList.remove('is-active');
}

function launchCustomerDelete() {
    if (custName != "") {
        document.getElementById('delete-customer').classList.add('is-active');
    } else {
        alert("กรุณาเลือกลูกค้าที่ต้องการลบ")
    }
}

function closeCustomerDelete() {
    document.getElementById('delete-customer').classList.remove('is-active');
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

function deleteCustomer(name) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/customer/remove/' + name).then((result) => {
            resolve(result.data);
        })
    })
}

function editCustomer(newCustomerData) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/customer/edit', { "customerData": newCustomerData }).then((result) => {
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
    let resultObject = getCustomerDetailByName(value, customer);
    document.getElementById("cust_name").innerHTML = "ชื่อ : " + resultObject.cust_name;
    document.getElementById("cust_phone").innerHTML = "โทรศัพท์ : " + resultObject.cust_phone;
    document.getElementById("cust_tax_no").innerHTML = "เลขที่ผู้เสียภาษี : " + resultObject.cust_tax_no;
    document.getElementById("cust_addr").innerHTML = "ที่อยู่ : " + resultObject.cust_addr;
    custId = resultObject.cust_id;
    custName = value;
    custPhone = resultObject.cust_phone;
    custTax = resultObject.cust_tax_no;
    custAddr = resultObject.cust_addr;
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

function deleteCustomerByName() {
    deleteCustomer(custName).then((result) => {
        if (result) {
            alert("ลบสำเร็จ")
            window.location.reload(true);
        } else {
            alert("ลบไม่สำเร็จ!")
            window.location.reload(true);
        }
    })
    custName = "";
    closeCustomerDelete();
}

function editButtonHandle() {
    var newData = {};
    newData.id = custId;
    newData.name = document.getElementById("edit_cust_name").value;
    newData.phone = document.getElementById("edit_cust_phone").value;
    newData.tax_no = document.getElementById("edit_cust_tax_no").value;
    newData.addr = document.getElementById("edit_cust_addr").value;

    editCustomer(newData).then((result) => {
        if (result) {
            alert("แก้ไขสำเร็จ")
            closeCustomerEditPopUp();
            window.location.reload(true);
        } else {
            alert("แก้ไขไม่สำเร็จ!")
            window.location.reload(true);
        }
    })
    cust_name = "";
}

function showDetailCustomerPopUp() {
    document.getElementById("edit_cust_name").value = custName;
    document.getElementById("edit_cust_phone").value = custPhone;
    document.getElementById("edit_cust_tax_no").value = custTax;
    document.getElementById("edit_cust_addr").value = custAddr;
}

function removeAlloption() {
    var select = document.getElementById("selectCustomer");
    var length = select.options.length;
    for (i = 0, c = 0; i < length; i++) {
        select.options[c] = null;
    }
}

function runScript(e) {
    if (e.keyCode == 13) {
        var txt = document.getElementById("input_customer_name").value
        if (txt === "") {
            clearCustomerData();
            removeAlloption();
            createSelect(customer);
        } else {
            let resultObject = getCustomerDetailByName(txt, customer);
            console.log(resultObject)
            if (resultObject !== null) {
                removeAlloption();
                var select = document.getElementById("selectCustomer");
                var option = document.createElement("option");
                option.text = resultObject.cust_name;
                option.value = resultObject.cust_name;
                option.onclick = function () { showDetailCustomer(this.value); };
                showDetailCustomer(resultObject.cust_name)
                select.add(option);
            } else {
                removeAlloption();
                clearCustomerData();
            }
        }
    }
    return false;
}

function clearCustomerData(){
    custName = "";
    custId = null;
    custPhone = "";
    custTax = "";
    custAddr = "";
    document.getElementById("cust_name").innerHTML = "";
    document.getElementById("cust_phone").innerHTML = "";
    document.getElementById("cust_tax_no").innerHTML = "";
    document.getElementById("cust_addr").innerHTML = "";
}


startForm();
/*getAllCustomer().then((data) => { console.log(data) })*/


