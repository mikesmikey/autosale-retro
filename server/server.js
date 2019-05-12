const express = require("express");
const pretty = require("express-prettify");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const cors = require('cors')
app.use(bodyParser.json());
app.use(cors())
app.use(pretty({ query: 'pretty' }));

//disable cors due to the server will not using cross origin feature.

const WebDAO = require("./WebDAO");
const WebService = require("./WebService");
const Customer = require('./Customer');
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
app.post("/products/RegisterLicense/insert", (req, res) => {
  WebDAOObj.insertProdeuctRegister(req.body.productData).then(data => {
      res.json(data);
  });
});

app.get("/products/productIdLast", (req, res) => {
  WebDAOObj.getProductlastNumber().then(data => {
      res.json(data);
  });
});
app.get("/invoice/last", (req, res) => {
  WebDAOObj.getInvoicelastNumber().then(data => {
      res.json(data);
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

app.get("/user/last", (req, res) => {
  WebDAOObj.getCustomerlastNumber().then(data => {
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

app.post("/product/delete", (req, res) => {
  WebDAOObj.deleteProduct(req.body.productData).then(data => {
    res.json(data);
  })
});

app.post('/partners/remove/:CompanyName', (req, res) => {
  WebDAOObj.deletePartner(req.params.CompanyName).then((pass) => {
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

app.post('/product/type/Repair/remove/:car_license', (req, res) => {
  WebDAOObj.deleteCarFixProductByThisLicense(req.params.car_license).then((pass) => {
    res.send(pass);
  });
});


app.post('/customer/remove/:name', (req, res) => {
  WebDAOObj.deleteCustomerByName(req.params.name).then((pass) => {
    res.send(pass);
  });
});

// app.post('/product/remove/:car_license', (req, res) => {
//   WebDAOObj.deleteCarFixProductByThisLicense(req.params.car_license).then((pass)=> {
//       res.send(pass);
//   });
// });

app.post('/customer/edit', (req, res) => {
  WebDAOObj.editCustomer(new Customer(req.body.customerData)).then((pass) => {
    res.send(pass);
  })
})

app.post('/customer/insert', (req, res) => {
  console.log(req.body.customerData)
  WebDAOObj.insertCustomer(new Customer(req.body.customerData)).then((data)=> {
      res.send(data);
  })
})
app.post('/invoice/insert/register', (req, res) => {
  WebDAOObj.insertInvoiceRegister(req.body.invoiceObj).then((data)=> {
      res.send(data);
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

app.post("/image/add", (req, res) => {
  WebDAOObj.insertCarImage(req.body.source).then(data => {
    res.json(data);
  })
})

app.get("/images/id_:imgId", (req, res) => {
  WebDAOObj.getCarImageByObjectId(req.body.imgId).then(data => {
    console.log(data)
    if (data != null) {
      res.json(data);
    } else {
      res.sendStatus(404);
    }
  })
})


app.post("/invoice/type/Appt/add", (req, res) => {
  WebDAOObj.insertInvoiceByTypeAppt(req.body.invoData).then(data => {
    res.json(data);
  })
})

app.post("/product/type/Repair/add", (req, res) => {
  WebDAOObj.insertProductByTypeRepair(req.body.prodData).then(data => {
    res.json(data);
  })
})

app.get("/product/type/Repair/:lc", (req, res) => {
  WebDAOObj.getAllUsedPartsByThisLicense(req.params.lc).then(data => {
    res.json(data);
  })
})

app.post("/product/type/Repair/edit/:car_license", (req, res) => {
  WebDAOObj.editPartFromThisProduct(req.params.car_license, req.body.partsUsingData).then((pass) => {
    res.send(pass);
  })
})

app.post("/product/type/Repair/edit/status/:car_license", (req, res) => {
  WebDAOObj.editRepairStatusFromThisProduct(req.params.car_license).then((pass) => {
    res.send(pass);
  })
})

app.post("/product/type/Repair/edit/cost/:cost/:car_license", (req, res) => {
  WebDAOObj.editRepairCostFromThisProduct(req.params.car_license, req.params.cost).then((pass) => {
    res.send(pass);
  })
})

app.post("/parts/edit", (req, res) => {
  WebDAOObj.editPartsHub(req.body.partsUsingData).then((data) => {
     res.send(data);
  })
})

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
