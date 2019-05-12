var partner = [];
var select = document.getElementById("PartnerSelect");
let max = 0;
let numberStatr = 0;
let companyname = "";

function launchPartnerEdit() {
    if(document.getElementById("PartnerSelect").value != "" || document.getElementById("companyNameInput").value != ""){
        console.log(document.getElementById("PartnerSelect").value)
        document.getElementById('edit-Partner').classList.add('is-active');
        loadDetailPartner();
    }else{
        alert("กรุณาเลือกคู่ค้าที่ต้องการแก้ไข")
    }
}

function closePartnerEdit() {
    document.getElementById('edit-Partner').classList.remove('is-active');
    //document.getElementById('edit-Partner').reset();
}

function launchPartnerAdd() {
    document.getElementById('add-Partner').classList.add('is-active');
}

function closePartnerAdd()  {
    console.log(partner);
    document.getElementById('add-Partner').classList.remove('is-active');
    document.getElementById('add-Partner').reset();
}

function launchPartnerDelete() {
    if(document.getElementById("PartnerSelect").value != "" || document.getElementById("companyNameInput").value != ""){
        document.getElementById('delete-Partner').classList.add('is-active');
    }else{
        alert("กรุณาเลือกคู่ค้าที่ต้องการแก้ไข")
    }
}

function closePartnerDelete() {
    document.getElementById('delete-Partner').classList.remove('is-active');
}


function setSelectedStart(first) {
    document.getElementById("companyName").innerHTML = partner[first].company_name;
    document.getElementById("partnerName").innerHTML = partner[first].partner_name;
    document.getElementById("partnerPhone").innerHTML = partner[first].partner_phone;
    document.getElementById("partnerType").innerHTML = partner[first].partner_type;
    document.getElementById("partnerAddr").innerHTML = partner[first].partner_addr;


    document.getElementById("companyNamePrint").innerHTML = partner[first].company_name;
    document.getElementById("partnerNamePrint").innerHTML = partner[first].partner_name;
    document.getElementById("partnerPhonePrint").innerHTML = partner[first].partner_phone;
    document.getElementById("partnerTypePrint").innerHTML = partner[first].partner_type;
    document.getElementById("partnerAddrPrint").innerHTML = partner[first].partner_addr;
}

function  setDetailZero() {
    document.getElementById("companyName").innerHTML = "";
    document.getElementById("partnerName").innerHTML = "";
    document.getElementById("partnerPhone").innerHTML = "";
    document.getElementById("partnerType").innerHTML = "";
    document.getElementById("partnerAddr").innerHTML = "";
}


function removeSelected() {
    var length = select.options.length;
    for (i = 0, c = 0; i < length; i++) {
        select.options[c] = null;
    }
}

function setSelected(data) {
    let min = data[0].partner_id;
    let first = 0;
    for(let i = 0;i<data.length;i++){
        var el = document.createElement("option");
        el.value = data[i].company_name;
        el.textContent = data[i].company_name;
        if(data[i].partner_id < min){
            el.selected = true;
            min=data[i].partner_id;
            first = i;
        }
        if(data[i].partner_id > max ){
            max=data[i].partner_id;
        }
        select.appendChild(el);
        partner.push(data[i]);
       // console.log(partner[i])
    }
    numberStatr = first;
    setSelectedStart(first);
}

function setSelectedEdit(data) {
    for(let i = 0;i<data.length;i++){
        var el = document.createElement("option");
        el.value = data[i].company_name;
        el.textContent = data[i].company_name;
        partner[i].company_name = data[i].company_name;
        partner[i].partner_name = data[i].partner_name;
        partner[i].partner_phone = data[i].partner_phone;
        partner[i].partner_type = data[i].partner_type;
        partner[i].partner_addr = data[i].partner_addr;
        select.appendChild(el);
       // console.log(partner[i])
    }
    setSelectedStart(numberStatr);
}


function getAllPartner() {
    return new Promise((resolve, reject) => {
            axios.get('http://localhost:5000/partners').then((result) => {
                resolve(result.data);
            })
    })
}

getAllPartner().then((data) => {
    setSelected(data);
})


function addPartner(partnerData) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/partners/add', {"partnerData" : partnerData}).then((result) => {
            resolve(result.data);
        })
    })
}


function addButtonHandle(companyName,partnerName,partnerPhone,partnerType,partnerAddr) {
    var partnerData = {};
    partnerData.partner_id = max+1;
    partnerData.company_name = companyName;
    partnerData.partner_name = partnerName;
    partnerData.partner_phone = partnerPhone;
    partnerData.partner_type = partnerType;
    partnerData.partner_addr = partnerAddr;

    console.log(partnerData);
    addPartner(partnerData).then((data) => {
        if (data) {
            removeSelected();
            getAllPartner().then((data) => {
                setSelected(data);
            })
            alert("สำเร็จ!")
            closePartnerAdd();
        } else {
            alert("เพิ่มไม่สำเร็จ!")
            closePartnerAdd();
        }
    })
}


function editPartner(partnerData) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/partners/edit', {"partnerData" : partnerData}).then((result) => {
            resolve(result.data);
        })
    })
}

function editButtonHandle(companyName,partnerName,partnerPhone,partnerType,partnerAddr) {
    var partnerData = {};
    
    for(let i = 0;i<partner.length;i++){
        if(partner[i].company_name == document.getElementById("PartnerSelect").value){
            partnerData.partner_id = partner[i].partner_id;
            break;
        }
    }
    partnerData.company_name = companyName;
    partnerData.partner_name = partnerName;
    partnerData.partner_phone = partnerPhone;
    partnerData.partner_type = partnerType;
    partnerData.partner_addr = partnerAddr;

    //console.log(partnerData);
    editPartner(partnerData).then((data) => {
        if (data) { 
            removeSelected();
            getAllPartner().then((data) => {
                setSelectedEdit(data);
            })
            alert("สำเร็จ!")
            closePartnerEdit();
        } else {
            alert("แก้ไขไม่สำเร็จ!")
            closePartnerEdit();
        }
    })
    
}

function deletePartner(CompanyName) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/partners/remove/' + CompanyName).then((result) => {
            resolve(result.data);
        })
    })
}

function deleteButtonHandle(){
    deletePartner(companyname).then((data) => {
        console.log(companyname);
        if (data) {
            removeSelected();
            getAllPartner().then((data) => {
                setSelected(data);
            })
            alert("สำเร็จ!")
            closePartnerDelete();
        } else {
            alert("ลบไม่สำเร็จ!")
            closePartnerDelete();
        }
    })
}

function loadCompanyNameInSelect() {
    var Cname = document.getElementById("PartnerSelect").value;
    loadDetailPartner(Cname);
}

function loadDetailPartner(CompanyNameS) {
    for(let i = 0;i<partner.length;i++){
        if(partner[i].company_name == CompanyNameS){
            document.getElementById("companyName").innerHTML = partner[i].company_name;
            document.getElementById("partnerName").innerHTML = partner[i].partner_name;
            document.getElementById("partnerPhone").innerHTML = partner[i].partner_phone;
            document.getElementById("partnerType").innerHTML = partner[i].partner_type;
            document.getElementById("partnerAddr").innerHTML = partner[i].partner_addr;

            document.getElementById("companyNameInput").value = partner[i].company_name;
            document.getElementById("partnerNameInput").value = partner[i].partner_name;
            document.getElementById("partnerPhoneInput").value = partner[i].partner_phone;
            document.getElementById("partnerTypeInput").value = partner[i].partner_type;
            document.getElementById("partnerAddrInput").value = partner[i].partner_addr;

            document.getElementById("companyNamePrint").innerHTML = partner[i].company_name;
            document.getElementById("partnerNamePrint").innerHTML = partner[i].partner_name;
            document.getElementById("partnerPhonePrint").innerHTML = partner[i].partner_phone;
            document.getElementById("partnerTypePrint").innerHTML = partner[i].partner_type;
            document.getElementById("partnerAddrPrint").innerHTML = partner[i].partner_addr;
            companyname = partner[i].company_name;
            break;
        }
        //console.log(partner[i])
    }
    //document.getElementById("label").innerHTML=document.getElementById("PartnerSearch").value;
}

function getPartnerDetailByCompany(companyName, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].company_name === companyName) {
            return myArray[i];
        }
    }
    return null;
}











