const express = require("express");
const pretty = require("express-prettify");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const cors= require('cors')
app.use(bodyParser.json());
app.use(cors())
app.use(pretty({ query: 'pretty' }));

//disable cors due to the server will not using cross origin feature.

const WebDAO = require("./WebDAO");
const WebService = require("./WebService");
const Customer= require('./Customer');
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
app.get("/products/type/:type", (req, res) => {
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

app.post("/partners/edit", (req, res) => {
  WebDAOObj.editPartner(new Partner(req.body.partnerData)).then(data => {
      res.json(data);
  })
});

app.post('/partners/remove/:CompanyName', (req, res) => {
  WebDAOObj.deletePartner(req.params.CompanyName).then((pass)=> {
      res.send(pass);
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
app.get("/invoices/type/:type", (req, res) => {
  WebDAOObj.getAllInvoiceByType(req.params.type).then(data => {
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

app.post('/product/remove/:car_license', (req, res) => {
  WebDAOObj.deleteCarFixProductByThisLicense(req.params.car_license).then((pass)=> {
    console.log('what the helo')
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
