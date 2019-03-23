function launchPartnerEdit() {
    document.getElementById('edit-Partner').classList.add('is-active');
}

function closePartnerEdit() {
    document.getElementById('edit-Partner').classList.remove('is-active');
}

function launchPartnerAdd() {
    document.getElementById('add-Partner').classList.add('is-active');
}

function closePartnerAdd() {
    document.getElementById('add-Partner').classList.remove('is-active');
}

function launchPartnerDelete() {
    document.getElementById('delete-Partner').classList.add('is-active');
}

function closePartnerDelete() {
    document.getElementById('delete-Partner').classList.remove('is-active');
}
function handleInputChange(e) {
    const name = target.name;
    const value = target.value;

    this.setState({
        [name]: value
    })
}
function addButtonHandle(companyName,partnerName,partnerPhone,partnerType,partnerAddr) {
    var newData = {};
    newData.companyName = companyName;
    newData.partnerName = partnerName;
    newData.partnerPhone = partnerPhone;
    newData.partnerType = partnerType;
    newData.partnerAddr = partnerAddr;

    console.log(companyName);
    console.log(partnerName);
    console.log(partnerPhone);
    console.log(partnerType);
    console.log(partnerAddr);
    //CServiceObj.addUser(newData)
}