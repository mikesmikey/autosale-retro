const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const cors= require('cors')
app.use(bodyParser.json());
app.use(cors())

//disable cors due to the server will not using cross origin feature.

const WebDAO = require("./WebDAO");
const WebService = require("./WebService");
<<<<<<< HEAD
=======
const Customer= require('./Customer');
>>>>>>> 49f1e9631772c1d69b52007bdb90405f4a3077af
const Partner = require('./Partner');


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
app.get("/products/:type", (req, res) => {
  WebDAOObj.getAllProductByType(req.params.type).then(data => {
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

app.post("/partners/add", (req, res) => {
  WebDAOObj.insertPartner(new Partner(req.body.partnerData)).then(data => {
      res.json(data);
  })
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
app.get("/invoices/:type", (req, res) => {
  WebDAOObj.getAllInvoiceByType(req.params.type).then(data => {
    console.log(req.params.type)
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
  })
})

app.post('/customer/remove/:name', (req, res) => {
  WebDAOObj.deleteCustomerByName(req.params.name).then((pass)=> {
      res.send(pass);
  });
});

app.post('/customer/edit', (req, res) => {
  WebDAOObj.editCustomer(new Customer(req.body.customerData)).then((pass)=> {
      res.send(pass);
  })
})

app.get("/products", (req, res) => {
  WebDAOObj.getAllProduct().then(data => {
    if (data != null) {
      res.json(data);
    } else {
      res.sendStatus(404);
    }
  })
})

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
