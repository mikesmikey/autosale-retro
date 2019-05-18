whenFormOpenUp();
let resultObject;
let partshub = [];
let product = [];
let customer = [];
let invoice = [];
let carimages = [];
let thisCarLicense = "";
let thisCarData;
let thisCarFixProduct = [];
let packReairingDetail = [];

function whenFormOpenUp() {
  getAllProductByType("Repair").then(data => {
    createselect(data);
  });

  getAllCarImages("Repair");
  getAllCustomer();
  getAllInvoice();
  getAllPart();
}

function mockCarFixAdd() {
  window.location.href = "./car_fix_add.html";
}

// function mockCarFixAppraise() {
//   if (thisCarLicense !== "") {
//     getAllUsedPartsByThisLicense(thisCarLicense).then(data => {
//       if (data.type_desc.cost_of_repairs !== 0) {
//         alert("โปรดักนี้ประเมินราคาซ่อมแล้ว")
//       }
//       else if (data.type_desc.repair_status === "อยู่ในระหว่างดำเนินการ") {
//         alert("สถานะของโปรดักอยู่ในระหว่างดำเนินการ")
//       }
//       else if (data.type_desc.repair_status === "ดำเนินการเรียบร้อย") {

//         let productNow = searchProductByCarFix(thisCarLicense, product);

//         valuate = "?license_plate=" + thisCarLicense + "&custId=" + productNow.cust_id + "&prodId=" + productNow.prod_id;
//         window.location.href = "./car_fix_appraise.html" + valuate;
//       }
//     });
//   }
//   else {
//     alert("กรุณาเลือกเลขทะเบียนก่อน")
//   }
// }

function mockUsedPartUpdate() {
  if (thisCarLicense !== "") {
    getAllUsedPartsByThisLicense(thisCarLicense).then(data => {
      if (data.type_desc.repair_status === "ดำเนินการเรียบร้อย") {
        alert("สถานะของโปรดักดำเนินการซ่อมเรียบร้อยแล้ว")
      }
      else {
        let productNow = searchProductByCarFix(thisCarLicense, product);

        valuate = "?license_plate=" + thisCarLicense + "&customerId=" + productNow.cust_id + "&productId=" + productNow.prod_id;
        window.location.href = "./used_part_update.html" + valuate;
      }
    })
  }
  else {
    alert("กรุณาเลือกเลขทะเบียนก่อน")
  }
}

function printDiv(printDivName) {
  if (resultObject.type_desc.cost_of_repairs === 0) {
    alert('โปรดักอยู่ในระหว่างดำเนินการซ่อม')
  }
  else {
    let resPrintRepairDetail = resultObject.type_desc.repair_detail;
    let resPrintReparingParts_Name = [];
    let resPrintReparingParts_Num = [];
    const currentPage = document.body.innerHTML;
    document.body.innerHTML = document.getElementById(printDivName).innerHTML;
    if (printDivName === "repairingBill") {
      document.getElementById("repairingBill_car_license").innerHTML =
        "&nbsp;&nbsp;เลขทะเบียน : " + thisCarFixProduct[0];
      document.getElementById("repairingBill_car_brand").innerHTML =
        "&nbsp;&nbsp;ยี่ห้อ : " + thisCarFixProduct[1];
      document.getElementById("repairingBill_car_model").innerHTML =
        "&nbsp;&nbsp;รุ่น : " + thisCarFixProduct[2];
      document.getElementById("repairingBill_car_owner").innerHTML =
        "&nbsp;&nbsp;เจ้าของ : " + thisCarFixProduct[3];

      for (var i in resultObject.type_desc.trn_parts_repair) {
        resPrintReparingParts_Name[i] = searchParts(
          resultObject.type_desc.trn_parts_repair[i].parts_id,
          partshub
        );
        resPrintReparingParts_Num[i] =
          resultObject.type_desc.trn_parts_repair[i].parts_num;
      }

      document.getElementById('repairingBill_car_upload').src = ""
      let carImage = searchCarImage(resultObject.cust_id, carimages);
      document.getElementById('repairingBill_car_upload').src = carImage.base64;

      for (var i in resPrintRepairDetail) {
        var node = document.createElement("p");
        var textnode = document.createTextNode("- " + resPrintRepairDetail[i]);
        node.appendChild(textnode);
        document
          .getElementById("repairingBill_repairing_detail")
          .appendChild(node);
      }

      for (var i in resultObject.type_desc.trn_parts_repair) {
        var node = document.createElement("p");
        var textnode = document.createTextNode(
          resPrintReparingParts_Name[i] +
          " " +
          resPrintReparingParts_Num[i] +
          " ชิ้น"
        );
        node.appendChild(textnode);
        document.getElementById("repairingBill_parts_repair").appendChild(node);
      }
    } else if (printDivName === "bill") {
      let bill = searchInvoiceByCustAndProd("Bill", resultObject.cust_id, resultObject.prod_id, invoice)

      var table = document.getElementById("bill-table")

      var total = 0, numberParts = 0;

      for (var i = 0; i < bill.type_desc.items.length; i++) {

        let row = table.insertRow(i + 1);
        let lineNumber = row.insertCell(0);
        let name = row.insertCell(1);
        let price = row.insertCell(2);
        let num = row.insertCell(3);

        lineNumber.innerHTML = i + 1;
        name.innerHTML = bill.type_desc.items[i].name;
        price.innerHTML = bill.type_desc.items[i].price;
        num.innerHTML = bill.type_desc.items[i].num;

        total += bill.type_desc.items[i].price * bill.type_desc.items[i].num;
        numberParts += bill.type_desc.items[i].num;
      }



      let custShow = searchCustomer(resultObject.cust_id, customer);
      document.getElementById("bill-cust_name").innerHTML = "ผู้ซื้อ : " + custShow.cust_name
      document.getElementById("bill-cust_id").innerHTML = "รหัสลูกค้า : " + custShow.cust_id
      document.getElementById("bill-cust_tax_no").innerHTML = "เลขที่ผู้เสียภาษี : " + custShow.cust_tax_no
      document.getElementById("bill-cust_addr").innerHTML = "ที่อยู่ : " + custShow.cust_addr

      let discount = (numberParts > 99) ? numberParts * 10 : 0

      document.getElementById("bill-total").innerHTML = total
      document.getElementById("bill-discount").innerHTML = discount
      document.getElementById("bill-exc_vat").innerHTML = Math.abs(total + (total * 0.07) - discount)

    } else if (printDivName === "receipt") {

      let rect = searchInvoiceByCustAndProd("Receipt", resultObject.cust_id, resultObject.prod_id, invoice)
      var table = document.getElementById("receipt-table")

      for (var i = 0; i < rect.type_desc.items.length; i++) {

        let row = table.insertRow(i + 1);
        let name = row.insertCell(0);
        let price = row.insertCell(1);
        let num = row.insertCell(2);

        name.innerHTML = rect.type_desc.items[i].name;
        price.innerHTML = rect.type_desc.items[i].price;
        num.innerHTML = rect.type_desc.items[i].num;
      }

      document.getElementById("rect-prod_id").innerHTML = "&nbsp;เลขที่ออเดอร์ : " + rect.prod_id;
      document.getElementById("rect-invo_id").innerHTML = "&nbsp;เลขที่บิล : " + rect.invo_id;
      document.getElementById("rect-type").innerHTML = "&nbsp;ประเภทออเดอร์ : Repair";
      document.getElementById("rect-launch_date").innerHTML = "&nbsp;วันที่ออก : 2018 05 14";

    } else if (printDivName === "appointment") {

      document.getElementById("appointment_car_license").innerHTML =
        "&nbsp;&nbsp;เลขทะเบียน : " + thisCarFixProduct[0];
      document.getElementById("appointment_car_brand").innerHTML =
        "&nbsp;&nbsp;ยี่ห้อ : " + thisCarFixProduct[1];
      document.getElementById("appointment_car_model").innerHTML =
        "&nbsp;&nbsp;รุ่น : " + thisCarFixProduct[2];
      document.getElementById("appointment_car_owner").innerHTML =
        "&nbsp;&nbsp;เจ้าของ : " + thisCarFixProduct[3];
      document.getElementById("appointment_car_appt_date").innerHTML =
        "&nbsp;&nbsp;วันที่นัดรับ : " + thisCarFixProduct[4];

      for (var i in resPrintRepairDetail) {
        var node = document.createElement("p");
        var textnode = document.createTextNode("- " + resPrintRepairDetail[i]);
        node.appendChild(textnode);

        document.getElementById("appointment_repairing_detail").appendChild(node);
      }
    }

    window.print();
    document.body.innerHTML = currentPage;
  }
}

function launchFixPrintsHubDelete() {
  if (thisCarLicense != "") {
    document.getElementById("printshub-fix").classList.add("is-active");
  } else {
    alert("กรุณาเลือกทะเบียนรถก่อน");
  }
}
function closeFixPrintsHubDelete() {
  document.getElementById("printshub-fix").classList.remove("is-active");
}

function launchFixDelete() {
  if (thisCarLicense != "") {
    document.getElementById("alert-license-no").innerHTML =
      "หมายเลขทะเบียน : '" + thisCarLicense + "'";
    document.getElementById("delete-fix").classList.add("is-active");
  } else {
    alert("กรุณาเลือกทะเบียนรถก่อน");
  }
}
function closeFixDelete() {
  document.getElementById("delete-fix").classList.remove("is-active");
}

function deleteCarFixProduct() {
  deleteCarFixProductByThisLicense(thisCarLicense).then(result => {
    // console.log('this car license => ', thisCarLicense)
    if (result) {
      alert("ลบสำเร็จ");
      window.location.reload(true);
    } else {
      alert("ลบไม่สำเร็จ!");
      window.location.reload(true);
    }
  });
  thisCarLicense = "";
  closeFixDelete();
}
////////////////////////////////////////////////////////////////////
// function getImageByCarFixWithCustomerId(imgId) {
//   return new Promise((resolve, reject) => {
//       axios.get('http://localhost:5000/image/id_' + imgId).then((result) => {
//           resolve(result.data);
//       })
//   })
// }

function getAllUsedPartsByThisLicense(val) {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:5000/product/type/Repair/" + val)
      .then(result => {
        resolve(result.data);
        thisCarData = result.data;
      });
  });
}

function getAllInvoice() {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:5000/invoices/').then((result) => {
      resolve(result.data);
      for (let i = 0; i < result.data.length; i++) {
        invoice.push(result.data[i])
      }
    })
  })
}

function deleteCarFixProductByThisLicense(car_license) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/product/type/Repair/remove/" + car_license)
      .then(result => {
        resolve(result.data);
      });
  });
}

function getAllCarImages(type) {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:5000/images/type/" + type).then(result => {
      resolve(result.data);
      for (let i = 0; i < result.data.length; i++) {
        carimages.push(result.data[i]);
      }
    });
  })
}

function getAllPart() {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:5000/parts/").then(result => {
      resolve(result.data);
      for (let i = 0; i < result.data.length; i++) {
        partshub.push(result.data[i]);
      }
    });
  });
}

// function getAllInvoiceByType(type) {
//   return new Promise((resolve, reject) => {
//     axios.get("http://localhost:5000/invoices/type/" + type).then(result => {
//       resolve(result.data);
//       for (let i = 0; i < result.data.length; i++) {
//         invoice.push(result.data[i]);
//       }
//     });
//   });
// }

function getAllCustomer() {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:5000/customers/").then(result => {
      resolve(result.data);
      for (let i = 0; i < result.data.length; i++) {
        customer.push(result.data[i]);
      }
    });
  });
}
function getAllProductByType(type) {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:5000/products/type/" + type).then(result => {
      resolve(result.data);
      for (let i = 0; i < result.data.length; i++) {
        product.push(result.data[i]);
      }
    });
  });
}
////////////////////////////////////////////////////////////////////
function ShowDetail(value) {
  resultObject = searchProductByCarFix(value, product);
  let carOwner = searchCustomer(resultObject.cust_id, customer).cust_name;
  // console.log(resultObject)
  let ApptDate = searchInvoiceByCustAndProd("Appointment", resultObject.cust_id, resultObject.prod_id, invoice).type_desc.appt_date;
  let repairingStatus = resultObject.type_desc.repair_status

  document.getElementById('carUpload').src = ""
  let carImage = searchCarImage(resultObject.cust_id, carimages);

  thisCarLicense = value;

  document.getElementById('carUpload').src = carImage.base64;

  document.getElementById("productID").innerHTML =
    "&nbsp;เลขออเดอร์ : " + resultObject.prod_id;
  document.getElementById("carLicense").innerHTML =
    "&nbsp;เลขทะเบียน : " + resultObject.trn_car.car_license;
  document.getElementById("carBrand").innerHTML =
    "&nbsp;ยี่ห้อ : " + resultObject.trn_car.car_brand;
  document.getElementById("carModel").innerHTML =
    "&nbsp;รุ่น : " + resultObject.trn_car.car_model;
  document.getElementById("carOwner").innerHTML = "&nbsp;เจ้าของ : " + carOwner;
  document.getElementById("ApptDate").innerHTML = "&nbsp;วันที่นัดรับ : " + ApptDate;
  document.getElementById("repairingStatus").innerHTML = "&nbsp;สถานะซ่อม : " + repairingStatus;

  thisCarFixProduct.push(resultObject.trn_car.car_license);
  thisCarFixProduct.push(resultObject.trn_car.car_brand);
  thisCarFixProduct.push(resultObject.trn_car.car_model);
  thisCarFixProduct.push(carOwner);
  thisCarFixProduct.push(ApptDate);

  var thisList = searchCarLcByProduct(resultObject.trn_car.car_license, product)
    .type_desc.repair_detail;

  var list = document.getElementById("repairingLists");

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  var node = document.createElement("li");
  var textnode = document.createTextNode("อาการ");
  node.appendChild(textnode);
  list.appendChild(node);

  for (var i in thisList) {
    node = document.createElement("li");
    textnode = document.createTextNode("-" + thisList[i]);
    node.appendChild(textnode);
    list.appendChild(node);
  }

  var thisPartsList = searchCarLcByProduct(
    resultObject.trn_car.car_license,
    product
  ).type_desc.trn_parts_repair;
  var listParts = document.getElementById("repairingtable");

  let packListParts = [];
  for (var i in thisPartsList) {
    var partsName = searchParts(thisPartsList[i].parts_id, partshub);
    packListParts.push(`${partsName},${thisPartsList[i].parts_num}`);
  }
  //    console.log(packListParts)

  for (var i = 0; i < listParts.rows.length; i++) {
    if (i > 1) {
      listParts.deleteRow(i);
    }
  }

  if (listParts.rows.length > 2) listParts.deleteRow(listParts.rows.length - 1);

  for (var i = 0; i < packListParts.length; i++) {
    var j = i + 2;
    var NewRow = listParts.insertRow(j);
    var Newcell1 = NewRow.insertCell(0);
    var Newcell2 = NewRow.insertCell(1);

    var spliter = packListParts[i].split(",");
    Newcell1.innerHTML = spliter[0];
    Newcell2.innerHTML = spliter[1];
  }
  //setAttributePrint(value)
}

function createselect(data) {
  for (let i = 0; i < data.length; i++) {
    try {
      var select = document.getElementById("lplate_selected");
      var option = document.createElement("option");
      option.text = data[i].trn_car.car_license;
      option.value = data[i].trn_car.car_license;
      option.onclick = function () {
        ShowDetail(this.value);
      };
      select.add(option);
    } catch (error) { }
  }
}
function removeAlloption() {
  var select = document.getElementById("lplate_selected");
  var length = select.options.length;
  //console.log('length => ', length)
  for (i = 0, c = 0; i < length; i++) {
    select.options[c] = null;
  }
}

function runScript(e) {
  if (e.keyCode == 13) {
    var txt = document.getElementById("input_car_fix").value;
    if (txt === "") {
      removeAlloption();
      createselect(product);
    } else {
      let resultObject = searchProductByCarFix(txt, product);
      if (resultObject !== null) {
        removeAlloption();
        var select = document.getElementById("lplate_selected");
        var option = document.createElement("option");
        option.text = resultObject.trn_car.car_license;
        option.value = resultObject.trn_car.car_license;
        option.onclick = function () {
          ShowDetail(this.value);
        };
        ShowDetail(resultObject.trn_car.car_license);
        select.add(option);
      } else {
        removeAlloption();
      }
    }
  }
  return false;
}
////////////////////////////////////////////////////////////////////

function searchCarLcByProduct(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].trn_car.car_license === nameKey) {
      return myArray[i];
    }
  }
  return null;
}
function searchParts(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].parts_id === nameKey) {
      return myArray[i].parts_name;
    }
  }
  return null;
}
function searchProductByCarFix(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].trn_car.car_license === nameKey) {
      return myArray[i];
    }
  }
  return null;
}
function searchProduct(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].prod_id === nameKey) {
      return myArray[i];
    }
  }
  return null;
}
function searchCustomer(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].cust_id === nameKey) {
      return myArray[i];
    }
  }
}
function searchCustomerByName(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].cust_name === nameKey) {
      return myArray[i];
    }
  }
}
function searchInvoice(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].prod_id === nameKey.prod_id && myArray[i].cust_id === nameKey.cust_id) {
      return myArray[i];
    }
  }
}
function searchCarImage(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].cust_id === nameKey) {
      return myArray[i];
    }
  }
}
function searchInvoiceByCustAndProd(type, custId, prodId, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].invo_type === type && myArray[i].cust_id === parseInt(custId) && myArray[i].prod_id === parseInt(prodId)) {
      return myArray[i];
    }
  }
  return null;
}
////////////////////////////////////////////////////////////////////
