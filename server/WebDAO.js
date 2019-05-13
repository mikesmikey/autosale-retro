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
                    if (err) { throw err }
                    return resolve(data);
                });
            });
        });
    }

    getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('User').findOne({ "username": username }, { "_id": 0, "username": 0, "password": 0 }, (err, data) => {
                    if (err) { throw err }
                    return resolve(data);
                });
            });
        });
    }

    getAllProduct() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').find({}).toArray((err, data) => {
                    if (err) { throw err }
                    return resolve(data);
                });
            });
        });
    }
    getCustomerlastNumber(){
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Customer').find().sort({cust_id: -1}).limit(1).toArray((err, data) => {
                    if (err) { throw err }
                    return resolve(data);
                });
            });
        });
    }
    getProductlastNumber(){
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').find().sort({prod_id: -1}).limit(1).toArray((err, data) => {
                    if (err) { throw err }
                    return resolve(data);
                });
            });
        });
    }

    getAllProductByType(type) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').find({ "prod_type": type }).toArray((err, data) => {
                    if (err) { throw err }
                    return resolve(data);
                });
            });
        });
    }

    getAllCustomer() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Customer').find({}).toArray((err, data) => {
                    if (err) { throw err }
                    return resolve(data);
                });
            });
        });
    }

    getAllProduct() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Product').find({}).toArray((err, data) => {
                    if (err) { throw err }
                    return resolve(data);
                });
            });
        });
    }

    getAllPart() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('PartsHub').find({}).toArray((err, data) => {
                    if (err) { throw err }
                    return resolve(data);
                });
            });
        });
    }

    getAllPartner() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Partner').find({}).toArray((err, data) => {
                    if (err) { throw err }
                    return resolve(data);
                });
            });
        });
    }



    getAllEmployee() {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                db.collection('Employee').find({}).toArray((err, data) => {
                    if (err) { throw err }
                    return resolve(data);
                });
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

        today = yyyy + ' ' + mm + ' ' + dd;
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)
                console.log('[insertProdeuctRegister] arrObj = ' + arrObj)
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
                console.log('[insertProdeuctRegister] doc = ' + doc)
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
                    //console.log(partner.company_name)
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
                db.collection('Partner').findOneAndUpdate({ "partner_id": partner.partner_id }, { "$set": partner.getPartnerObjectData() }, (err, result) => {
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

    // getCarImageByObjectId(cust_id) { //cust_id => specified a file
    //     return new Promise((resolve, reject) => {
    //         mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    //             const db = client.db(dbName)
    //             let bucket = new GridFSBucket(db, { bucketName: 'carImgs' })
    //             let downloadStream = bucket.openDownloadStreamByName(cust_id);

    // const writadableImgStream = new Writable({
    //     write(chunk, encoding, callback) {
    //         console.log('on write stream  => ', chunk.toString());
    //         callback();
    //     }
    // });

    //             downloadStream.on('data', (chunk) => {
    //                console.log('on data => ', chunk)
    //             });

    //             downloadStream.on('error', (err) => {
    //                 console.log('error => ', err)
    //                 return resolve(false)
    //             });

    //             downloadStream.on('end', () => {
    //                 console.log('error => ', err)
    //                 return resolve(true)
    //             });
    //         })
    //     })
    //}

    // getCarImageToFile(id) {
    //     return new Promise((resolve, reject) => {
    //         mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    //             const db = client.db(dbName)

    //             const bucket = new GridFSBucket(db, {
    //                 chunkSizeBytes: 32768,
    //                 bucketName: 'carImgs'
    //             });

    //             bucket.openDownloadStream(new ObjectId(id)).
    //             pipe(fs.createWriteStream('./output.jpg')).
    //             on('error', function(err) {
    //                 console.log(err)
    //             }).
    //             on('finish', function() {
    //                 console.log('done!');
    //                 process.exit(0);
    //             });
    //         });
    //     });
    // }

    insertCarImage(source) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                const db = client.db(dbName)

                const bucket = new GridFSBucket(db, {
                    chunkSizeBytes: 32768,
                    bucketName: 'carImgs'
                });

                const readableImgStream = new Readable()
                readableImgStream.push(source.base64)
                readableImgStream.push(null)

                let uploadStream = bucket.openUploadStream(source.name);
                let id = uploadStream.id;
                readableImgStream.pipe(uploadStream)

                uploadStream.on('error', () => {
                    return resolve(false)
                });
                uploadStream.on('finish', () => {
                    console.log('success on id => ', id)
                    return resolve(id)
                });
            });
        });
    }

    insertProductByTypeRepair(product) {
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