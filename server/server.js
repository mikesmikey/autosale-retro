const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
//const cors= require('cors')
app.use(bodyParser.json());
//app.use(cors())

//disable cors due to the server will not using cross origin feature.

const WebDAO = require("./WebDAO");
const WebService = require("./WebService");

const WebDAOObj = new WebDAO();
const WebServiceObj = new WebService();

app.post("/login", (req, res) => {
  WebServiceObj.loginAuth(req.body.loginInfo).then(pass => {
    res.send(pass);
  });
});

app.get("/products", (req, res) => {
  WebDAOObj.getAllProduct().then(data => {
    if (data != null) {
      res.json(data);
    } else {
      res.sendStatus(404);
    }
  });
});

app.get("/parts", (req, res) => {
  WebDAOObj.getAllPart().then(data => {
    if (data != null) {
      res.json(data);
    } else {
      res.sendStatus(404);
    }
  });
});

app.get("/partners", (req, res) => {
  WebDAOObj.getAllPartner().then(data => {
    if (data != null) {
      res.json(data);
    } else {
      res.sendStatus(404);
    }
  });
});

app.get("/invoices", (req, res) => {
  WebDAOObj.getAllInvoice().then(data => {
    if (data != null) {
      res.json(data);
    } else {
      res.sendStatus(404);
    }
  });
});

app.get("/employees", (req, res) => {
  WebDAOObj.getAllEmployee().then(data => {
    if (data != null) {
      res.json(data);
    } else {
      res.sendStatus(404);
    }
  });
});

app.get("/customers", (req, res) => {
  WebDAOObj.getAllCustomer().then(data => {
    if (data != null) {
      res.json(data);
    } else {
      res.sendStatus(404);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
