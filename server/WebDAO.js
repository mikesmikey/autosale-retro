const mongoDb = require('mongodb');
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = 'mongodb://hanami:hanami02@ds163164.mlab.com:63164/choketawee';
const dbName = 'choketawee';

const User = require('./User');
const GridFSBucket = require('mongodb').GridFSBucket;
const fs = require('fs')
const { Readable, Writable } = require('stream')

class WebDAO {

    /*===========[User DAO]===================*/

    getAllUser() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('User').find({}).project({ "_id": 0, "username": 0, "password": 0 }).toArray((err, data) => {
                    if (err) { client.close(); throw err }
                    return resolve(data);
                });
                client.close();
            });
        });
    }

    getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('User').findOne({ "username": username }, { "_id": 0, "username": 0, "password": 0 }, (err, data) => {
                    if (err) { client.close(); throw err }
                    return resolve(data);
                });
                client.close();
            });
        });
    }

    getAllProduct() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').find({}).toArray((err, data) => {
                    if (err) { client.close(); throw err }
                    return resolve(data);
                });
                client.close();
            });
        });
    }
    getCustomerlastNumber() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Customer').find().sort({ cust_id: -1 }).limit(1).toArray((err, data) => {
                    if (err) { throw err }
                    if(data){
                        return resolve(data); 
                    }else{
                        var result = {}
                        result.cust_id = 0
                        return resolve(result)
                    }
                });
                client.close();
            });
        });
    }
    getProductlastNumber() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').find().sort({ prod_id: -1 }).limit(1).toArray((err, data) => {
                    if (err) { client.close(); throw err }
                    return resolve(data);
                });
                client.close();
            });
        });
    }

    editProductCarBuyStatusToSold(cust, prod) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').findOneAndUpdate({ prod_id: parseInt(prod), cust_id: parseInt(cust) }, { "$set": { "type_desc.status_sell": "ขายแล้ว" } }, (err, result) => {
                    if (err) { client.close(); throw err }
                    if (result.value) {
                        return resolve(true);
                    } else { return resolve(false) }
                })
                client.close();
            });
        });
    }
    getAllProductNotsoldTypeBuy() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').find({ "prod_type": "Buy", "type_desc.status_sell": "ยังไม่ขาย" }).toArray((err, data) => {
                    if (err) { client.close(); throw err }
                    return resolve(data);
                    if (err) { throw err }
                    if(data){
                        return resolve(data); 
                    }else{
                        var result = {}
                        result.prod_id = 0
                        return resolve(result)
                    }
                });
            });
        });
    }
    getInvoicelastNumber() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Invoice').find().sort({ invo_id: -1 }).limit(1).toArray((err, data) => {
                    if (err) { throw err }
                    if(data){
                        return resolve(data); 
                    }else{
                        var result = {}
                        result.invo_id = 0
                        return resolve(result)
                    }
                });
                client.close();
            });
        });
    }
    getAllProductByType(type) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').find({ "prod_type": type }).toArray((err, data) => {
                    if (err) { client.close(); throw err }
                    return resolve(data);
                });
                client.close();
            });
        });
    }

    getAllCustomer() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Customer').find({}).toArray((err, data) => {
                    if (err) { client.close(); throw err }
                    return resolve(data);
                });
                client.close();
            });
        });
    }

    getAllProduct() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').find({}).toArray((err, data) => {
                    if (err) { client.close(); throw err }
                    return resolve(data);
                });
                client.close();
            });
        });
    }

    getAllPart() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('PartsHub').find({}).toArray((err, data) => {
                    if (err) { client.close(); throw err }
                    return resolve(data);
                });
                client.close();
            });
        });
    }

    getAllPartner() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Partner').find({}).toArray((err, data) => {
                    if (err) { client.close(); throw err }
                    return resolve(data);
                });
                client.close();
            });
        });
    }



    getAllEmployee() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Employee').find({}).toArray((err, data) => {
                    if (err) { client.close(); throw err }
                    return resolve(data);
                });
                client.close();
            });
        });
    }

    getAllInvoice() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Invoice').find({}).toArray((err, data) => {
                    if (err) { throw err }
                    return resolve(data);
                });
                client.close();
            });
        });
    }
    getAllInvoiceByType(type) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Invoice').find({ "invo_type": type }).toArray((err, data) => {
                    if (err) { throw err }
                    return resolve(data);
                });
            });
        });
    }

    insertUser(user) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('User').findOne({ "username": user.username }, (err, data) => {
                    if (err) { throw err }
                    if (!data) {
                        db.collection('User').insertOne(user.getUserObjectData(), (err, result) => {
                            if (err) { throw err }
                            return resolve(true);
                        });
                    } else { return resolve(false) }
                });
            });
        });
    }

    insertCustomerByCarFix(customer) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Customer').insertOne(customer, (err, result) => {
                    if (err) { throw err }
                    return resolve(true);
                });
            });
        });
    }

    insertCustomerByCarBuy(customer) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Customer').insertOne(customer, (err, result) => {
                    if (err) { throw err }
                    return resolve(true);
                });
            });
        });
    }

    insertCustomerByCarSell(customer) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Customer').insertOne(customer, (err, result) => {
                    if (err) { throw err }
                    return resolve(true);
                });
            });
        });
    }

    insertCustomer(customer) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Customer').findOne({ "cust_name": customer.cust_name }, (err, data) => {
                    if (err) { throw err }
                    if (!data) {
                        db.collection('Customer').insertOne(customer.getCustomerObjectData(), (err, result) => {
                            if (err) { throw err }
                            return resolve(true);
                        });
                    } else { return resolve(false) }
                });
            });
        });
    }
    insertProdeuctRegister(arrObj) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                var doc = {
                    prod_id: arrObj.prod_id,
                    cust_id: arrObj.cust_id,
                    prod_order_date: today,
                    prod_type: 'RegisterLicense',
                    type_desc: {
                        car_license: arrObj.car_license,
                        price_per_book: -1,
                        fare: -1,
                        total_price: -1,
                        licenae_status: false
                    },
                    trn_car: {
                        car_brand: arrObj.car_brand,
                        car_model: arrObj.car_model,
                        car_license: arrObj.car_license,
                        car_pic: {}
                    }
                };
                db.collection('Product').insertOne(doc, (err, result) => {
                    if (err) { throw err }
                    if (result) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                });

            });
        });
    }
    insertBillsTypeRegister(invoice) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + ' ' + mm + ' ' + dd;

        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                var paraTemp = {}
                paraTemp.total = invoice.price
                paraTemp.tax = Number.parseInt(paraTemp.total) * 0.07
                paraTemp.exc_vat = paraTemp.total + paraTemp.tax
                var doc = {
                    invo_id: invoice.InvoId,
                    prod_id: invoice.prodId,
                    cust_id: invoice.cusId,
                    invo_type: "Bill",
                    type_desc: {
                        total: paraTemp.total,
                        tax: paraTemp.tax,
                        exc_vat: paraTemp.exc_vat,
                        items: [
                            {
                                item_name: invoice.carLicense,
                                item_price: invoice.price,
                                item_num: 1
                            }
                        ]
                    },
                    issue_date_no: 1,
                    issue_date: today
                };
                db.collection('Invoice').insertOne(doc, (err, result) => {
                    if (err) { throw err }
                    if (result) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                });

            });
        });
    }
    insertInvoiceRegister(invoice) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + ' ' + mm + ' ' + dd;

        var day7 = ''
        var int_dd = Number.parseInt(dd)
        var int_mm = Number.parseInt(mm)
        var int_yyyy = Number.parseInt(yyyy)
        if (int_mm !== 2) {
            var checkday = int_dd + 7
            var checkmon = int_mm + 1
            if (checkday <= 31) {
                day7 = int_yyyy + ' ' + int_mm + ' ' + checkday
            } else {
                let tempDay = int_dd + 7 - 31
                if (checkmon <= 12) {
                    day7 = int_yyyy + ' ' + (int_checkmon) + ' ' + tempDay
                } else {
                    day7 = (int_yyyy + 1) + ' ' + (checkmon - 12) + ' ' + tempDay
                }
            }
        } else {
            if (int_dd + 7 <= 28) {
                day7 = int_yyyy + ' ' + int_mm + ' ' + (int_dd + 7)
            } else {
                let tempDay = int_dd + 7 - 28
                day7 = int_yyyy + ' ' + (int_mm + 1) + ' ' + tempDay
            }
        }
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                var doc = {
                    invo_id: invoice.invo_id,
                    prod_id: invoice.prod_id,
                    cust_id: invoice.cust_id,
                    issue_date_no: 1,
                    invo_type: "Appointment",
                    type_desc: {
                        type: "RegisterLicense",
                        appt_date: day7
                    },
                    issue_date: today
                };
                db.collection('Invoice').insertOne(doc, (err, result) => {
                    if (err) { throw err }
                    if (result) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                });

            });
        });
    }
    changeStatusProductRegister(productData) {
        //console.log(productData)
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').find({ prod_id: Number.parseInt(productData.prod_id)  }).toArray((err, data) => {
                    if (err) { throw err }
                    if(data){
                        data[0].type_desc.price_per_book = Number.parseInt(productData.price_per_book)
                        data[0].type_desc.fare = Number.parseInt(productData.fare)
                        data[0].type_desc.total_price = Number.parseInt(productData.total_price)
                        data[0].type_desc.licenae_status =  true
                        console.log(data[0])
                        db.collection('Product').findOneAndUpdate({ "prod_id": Number.parseInt(productData.prod_id) }, { "$set": data[0] }, (err, result) => {
                            if (err) { throw err }
                            if (result.value) {
                                return resolve(true);
                            } else { return resolve(false) }
                        });
                    }else{
                        return resolve(false)
                    }
                });
            });
        });
    }

    deleteCustomerByName(name) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Customer').findOne({ "cust_name": name }, (err, data) => {
                    if (err) { throw err }
                    if (data) {
                        db.collection('Customer').deleteOne({ "cust_name": name }, (err, result) => {
                            if (err) { throw err }
                            return resolve(true);
                        });
                    } else { return resolve(false) }
                });
            });
        });
    }

    insertPartner(partner) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Partner').findOne({ "company_name": partner.company_name }, (err, data) => {
                    if (err) { throw err }
                    if (!data) {
                        db.collection('Partner').insertOne(partner.getPartnerObjectData(), (err, result) => {
                            if (err) { throw err }
                            return resolve(true);
                        });
                    } else { return resolve(false) }

                });
            });
        });
    }

    editPartner(partner) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Partner').findOneAndUpdate({ "partner_id": partnerfindOneAndUpdate.partner_id }, { "$set": partner.getPartnerObjectData() }, (err, result) => {
                    
                    if (err) { throw err }
                    if (result.value) {
                        return resolve(true);
                    } else { return resolve(false) }
                });
            });
        });
    }

    deletePartner(companyName) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Partner').findOne({ "company_name": companyName }, (err, data) => {
                    if (err) { throw err }
                    if (data) {
                        db.collection('Partner').deleteOne({ "company_name": companyName }, (err, result) => {
                            if (err) { throw err }
                            return resolve(true);
                        });
                    } else { return resolve(false) }
                });
            });
        });
    }
    deleteProduct(productObj) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').findOne({ "prod_id": productObj.prod_id }, (err, data) => {
                    if (err) { throw err }
                    if (data) {
                        db.collection('Product').deleteOne({ "prod_id": productObj.prod_id }, (err, result) => {
                            if (err) { throw err }
                            return resolve(true);
                        });
                    } else { return resolve(false) }
                });
            });
        });
    }

    editCustomer(newCustomerData) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Customer').findOneAndUpdate({ "cust_id": newCustomerData.cust_id }, { "$set": newCustomerData.getCustomerObjectData() }, (err, result) => {
                    if (err) { throw err }
                    if (result.value) {
                        return resolve(true);
                    } else { return resolve(false) }
                });
            });
        });
    }


    /*===========[Car Fix DAO]===================*/

    getCarByPlateLicense(lplate) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').findOne(
                    { "type_desc.car_license": lplate }, (err, data) => {
                        if (err) { throw err }
                        return resolve(data);
                    });
            });
        });
    }

    deleteCarBuyProductByThisLicense(car_license) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').findOne({ "prod_type": "Buy" }, (err, data) => {
                    if (err) { throw err }
                    if (data) {
                        db.collection('Product').deleteOne({ "trn_car.car_license": car_license }, (err, result) => {
                            if (err) { throw err }
                            return resolve(true);
                        });
                    } else { return resolve(false) }
                });
            });
        });
    }

    deleteCarFixProductByThisLicense(car_license) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').findOne({ "prod_type": "Repair" }, (err, data) => {
                    if (err) { throw err }
                    if (data) {
                        db.collection('Product').deleteOne({ "trn_car.car_license": car_license }, (err, result) => {
                            if (err) { throw err }
                            return resolve(true);
                        });
                    } else { return resolve(false) }
                });
            });
        });
    }

    testUploadImg() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                if (client) {

                    const db = client.db(dbName)
                    var bucket = new mongoDb.GridFSBucket(db, {
                        chunkSizeBytes: 32768,
                        bucketName: 'carImgs'
                    });

                    fs.createReadStream('./1ED0CMq.jpg').
                        pipe(bucket.openUploadStream('1ED0CMq.jpg')).
                        on('error', function (error) {
                            assert.ifError(error);
                        }).
                        on('finish', function () {
                            console.log('done!');
                        });
                } else {
                    resolve(false)
                }
            })
        })
    }

    getCarImageByThisCustAndProd(custId, prodId) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('CarImage').findOne({ cust_id: custId, prod_id: prodId  }, (err, data) => {
                    if (err) { throw err }
                    return resolve(data)
                })
            })
        })
    }

    getCarImageById(imgId) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('CarImage').findOne(new ObjectId(imgId), (err, data) => {
                    if (err) { throw err }
                    return resolve(data)
                })
            })
        })
    }

    getAllCarImages(type) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('CarImage').find({ "type": type }).project({ "_id": 0 }).toArray((err, data) => {
                    if (err) { throw err }
                    return resolve(data)
                })
            })
        })
    }

    getProductsNotSold() {

    }

    insertCarImage(source) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('CarImage').insertOne(source, (err, result) => {
                    if (err) { throw err }
                    console.log('success on id -> ', source._id)
                    return resolve(source._id)
                });
            });
        });
    }

    insertProductByTypeRepair(product, imgId) {
        product.trn_car.car_pic = new ObjectId(imgId)

        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').insertOne(product, (err, result) => {
                    if (err) { throw err }
                    return resolve(true);
                });
            });
        });
    }

    insertProductByTypeSell(product, imgId) {
        product.trn_car.car_pic = new ObjectId(imgId)

        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').insertOne(product, (err, result) => {
                    if (err) { throw err }
                    return resolve(true);
                });
            });
        });
    }

    insertProductByTypeBuy(product, imgId) {
        product.trn_car.car_pic = new ObjectId(imgId)

        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').insertOne(product, (err, result) => {
                    if (err) { throw err }
                    return resolve(true);
                });
            });
        });
    }

    insertInvoiceByTypeAppt(invoice) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Invoice').insertOne(invoice, (err, result) => {
                    if (err) { throw err }
                    return resolve(true);
                });

            });
        });
    }

    insertInvoiceByTypeContract(invoice) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Invoice').insertOne(invoice, (err, result) => {
                    if (err) { throw err }
                    return resolve(true);
                });

            });
        });
    }

    insertInvoiceByTypeReceipt(invoice) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Invoice').insertOne(invoice, (err, result) => {
                    if (err) { throw err }
                    return resolve(true);
                });
            });
        });
    }

    insertInvoiceByTypeBill(invoice) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Invoice').insertOne(invoice, (err, result) => {
                    if (err) { throw err }
                    return resolve(true);
                });

            });
        });
    }

    getAllUsedPartsByThisLicense(licenseCarFix) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').findOne({ "prod_type": "Repair", "trn_car.car_license": licenseCarFix }, (err, data) => {
                    if (err) { throw err }
                    return resolve(data)
                })
            });
        });
    }

    editPartFromThisProduct(licenseCarFix, partsUsingData) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').findOneAndUpdate({ "trn_car.car_license": licenseCarFix }, { "$set": { "type_desc.trn_parts_repair": partsUsingData } }, (err, result) => {
                    if (err) { throw err }
                    if (result.value) {
                        return resolve(true);
                    } else {
                        return resolve(false)
                    }
                })

            });
        });
    }

    editRepairCostFromThisProduct(licenseCarFix, cost) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').findOneAndUpdate({ "trn_car.car_license": licenseCarFix }, { "$set": { "type_desc.cost_of_repairs": parseInt(cost) } }, (err, result) => {
                    if (err) { throw err }
                    if (result.value) {
                        return resolve(true);
                    } else {
                        return resolve(false)
                    }
                })
            });
        });
    }

    editRepairStatusFromThisProduct(licenseCarFix) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').findOneAndUpdate({ "trn_car.car_license": licenseCarFix }, { "$set": { "type_desc.repair_status": "ดำเนินการเรียบร้อย" } }, (err, result) => {
                    if (err) { throw err }
                    if (result.value) {
                        return resolve(true);
                    } else {
                        return resolve(false)
                    }
                })
            });
        });
    }

    editPartsHub(partsUsingData) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('PartsHub').findOneAndUpdate({ "parts_id": partsUsingData.parts_id }, { "$set": { "parts_num": partsUsingData.parts_num } }, (err, result) => {
                    if (err) { throw err }
                    if (result.value) {
                        return resolve({ "status": true, "parts_id": partsUsingData.parts_id });
                    } else {
                        return resolve({ "status": false })
                    }
                })
            });
        });
    }
}




module.exports = WebDAO;