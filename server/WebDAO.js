const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = 'mongodb://hanami:hanami02@ds163164.mlab.com:63164/choketawee';
const dbName = 'choketawee';

const User = require('./User');

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
}

module.exports = WebDAO;