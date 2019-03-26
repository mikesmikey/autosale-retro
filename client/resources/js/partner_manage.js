var partner = [];
var select = document.getElementById("PartnerSearch");
let max = 0;

function launchPartnerEdit() {
    document.getElementById('edit-Partner').classList.add('is-active');
}

function closePartnerEdit() {
    document.getElementById('edit-Partner').classList.remove('is-active');
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
    document.getElementById('delete-Partner').classList.add('is-active');
}

function closePartnerDelete() {
    document.getElementById('delete-Partner').classList.remove('is-active');
}

function clearInput(companyName,partnerName,partnerPhone,partnerType,partnerAddr) {
    companyName = "";
    partnerName = "";
    partnerPhone = "";
    partnerType = "";
    partnerAddr = "";
    return(companyName,partnerName,partnerPhone,partnerType,partnerAddr);
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
    document.getElementById("companyName").innerHTML = partner[first].company_name;
    document.getElementById("partnerName").innerHTML = partner[first].partner_name;
    document.getElementById("partnerPhone").innerHTML = partner[first].partner_phone;
    document.getElementById("partnerType").innerHTML = partner[first].partner_type;
    document.getElementById("partnerAddr").innerHTML = partner[first].partner_addr;
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
            alert("สำเร็จ!")
            var el = document.createElement("option");
            el.value = partnerData.company_name;
            el.textContent = partnerData.company_name;
            select.appendChild(el);
            partner.push(partnerData);
            closePartnerAdd();
        } else {
            alert("เพิ่มไม่สำเร็จ!")
            closePartnerAdd();
        }
    })
}


function loadDetailPartner() {
    for(let i = 0;i<partner.length;i++){
        if(partner[i].company_name == document.getElementById("PartnerSearch").value){
            document.getElementById("companyName").innerHTML = partner[i].company_name;
            document.getElementById("partnerName").innerHTML = partner[i].partner_name;
            document.getElementById("partnerPhone").innerHTML = partner[i].partner_phone;
            document.getElementById("partnerType").innerHTML = partner[i].partner_type;
            document.getElementById("partnerAddr").innerHTML = partner[i].partner_addr;
            break;
        }
        //console.log(partner[i])
    }
    //document.getElementById("label").innerHTML=document.getElementById("PartnerSearch").value;
}








