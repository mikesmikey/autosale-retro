const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
//const cors= require('cors')
app.use(bodyParser.json());
//app.use(cors())

//disable cors due to the server will not using cross origin feature.

const WebDAO = require('./WebDAO');
const WebService = require('./WebService');
const User = require('./User');

const WebDAOObj = new WebDAO();
const WebServiceObj = new WebService();

app.get('/user', (req, res) => {
    WebDAOObj.getAllUser().then((data)=> {
        if (data != null) {
            res.json(data);
        } else {
            res.sendStatus(404);
        }
    })
});

app.post('/user', (req, res) => {
    //console.log(req.body.registerForm)
    WebDAOObj.insertUser(new User(req.body.registerForm)).then((pass)=> {
        res.send(pass);
    })
});

app.get('/user/:username', (req, res) => {
    WebDAOObj.getUserByUsername(req.params.username).then((data)=> {
        if (data != null) {
            res.json(data);
        } else {
            res.sendStatus(404);
        }
    })
})

app.post('/login', (req, res) => {
    WebServiceObj.loginAuth(req.body.loginInfo).then((pass)=> {
        res.send(pass);
    })
})

app.get('/products', (req, res) => {
    
})

app.get('/parts', (req, res) => {
    
})

app.get('/partners', (req, res) => {
    
})

app.get('/invoices', (req, res) => {
    
})

app.get('/employes', (req, res) => {
    
})

app.get('/customers', (req, res) => {
    
})


app.listen(port, () => {
    console.log(`App listening on ${port}`);
})