const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = 'mongodb://hanami:hanami02@ds131765.mlab.com:31765/ooad_kob';
const dbName = "ooad_kob";

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
    document.getElementById('add-Partner').classList.remove('is-active');
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
    insertPartner(newData);
    //CServiceObj.addUser(newData)
}

function insertPartner(newData) {
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName)
            db.collection('Partner').insertOne({newData});
        });
}