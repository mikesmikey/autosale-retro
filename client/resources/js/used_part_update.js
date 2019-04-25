let thisPlateLicense = decodeURIComponent(window.location.search)
  .substring(1)
  .split("=")
  .pop();
let partshub = [];
let resultObject;
let thisParts = "";
let thisCarData;
var partsRepair;
let selectedRow = -1;
let selectedRowUsed = -1;

whenFormOpenUp();

function whenFormOpenUp() {
  getAllPart().then(data => {
    createrowtablePartsHub(data);
  });

  getAllUsedPartsByThisLicense(thisPlateLicense).then(data => {
    createrowtableUsedParts(data);
  });
}

function editPartThisProduct(partsUsingData, thisPlateLicense) {
  return new Promise((resolve, reject) => {
    console.log(thisPlateLicense);
    axios
      .post(
        "http://localhost:5000/product/type/Repair/edit/" + thisPlateLicense,
        { partsUsingData: partsUsingData }
      )
      .then(result => {
        resolve(result.data);
      });
  });
}

function editPartsHub(partsUsingData) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/parts/edit", {
        partsUsingData: partsUsingData
      })
      .then(result => {
        resolve(result.data);
      });
  });
}

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

function ShowDetail(val1) {
  //   resultObject = searchParts(value, product);
  console.table("result => ", val1);
}

function addPartsToUsedParts() {
  // table parts hub
  var table = document.getElementById("parts_hub_table");
  var rows = table.getElementsByTagName("tr");
  if (selectedRow > 0) {
    if (parseInt(rows[selectedRow].innerText.match(/\S+/g)[1]) > 0) {
      let getPartsHubSelected = rows[selectedRow].innerText.match(/\S+/g);
      table.deleteRow(selectedRow);

      //switch background to default when rows was deleted
      for (let i = 1; i < rows.length; i++) {
        if (i % 2 === 1) {
          rows[i].style.backgroundColor = "white";
        } else {
          rows[i].style.backgroundColor = "#dddddd";
        }
        rows[i].style.color = "black";
      }

      //table parts used
      let table2 = document.getElementById("used_part_table");
      let rows2 = table2.getElementsByTagName("tr");

      let notHasUsed = false;
      selectedRow = -1;

      //looping find parts used which is match of parts hub which is selected to modify its number
      for (let j = 1; j < rows2.length; j++) {
        let getPartsUsed = rows2[j].innerText.match(/\S+/g);
        if (getPartsHubSelected[0] === getPartsUsed[0]) {
          notHasUsed = true;
          table2.deleteRow(j);

          let row2 = table2.insertRow(j);
          let cell1 = row2.insertCell(0);
          let cell2 = row2.insertCell(1);
          cell1.innerHTML = getPartsUsed[0];
          cell2.innerHTML =
            parseInt(getPartsHubSelected[1]) + parseInt(getPartsUsed[1]);
          break;
        }
      }

      //if not match insert to used parts
      if (!notHasUsed) {
        let row = table2.insertRow(table2.length);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.innerHTML = getPartsHubSelected[0];
        cell2.innerHTML = getPartsHubSelected[1];
      }

      //touch another table when one is changed
      selectedUsedPartsToModify();
      selectedPartsHubToUsedPart();
    } else {
      alert("ไม่มีอะไหล่")
    }
  } else if (rows.length > 1) {
    alert("กรุณาเลือกแถวข้อมูลที่ต้องการทางตารางฝั่งซ้ายก่อน");
  } else {
    alert("อะไหล่หมดตารางแล้ว");
  }
}

function turnDefaultBackgroundColor() {
  let table = document.getElementById("parts_hub_table");
  let rows = table.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) {
    if (i !== selectedRow) {
      if (i % 2 === 1) {
        rows[i].style.backgroundColor = "white";
      } else {
        rows[i].style.backgroundColor = "#dddddd";
      }
      rows[i].style.color = "black";
    }
  }
}

function selectedPartsHubToUsedPart() {
  var table = document.getElementById("parts_hub_table");
  var rows = table.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) {
    rows[i].onmouseenter = function() {
      turnDefaultBackgroundColor();
      if (i !== selectedRow) {
        rows[i].style.backgroundColor = "rgb(35, 128, 250)";
        rows[i].style.color = "white";
      }
      selectedPartsHubToUsedPart();
    };

    rows[i].onclick = function() {
      turnDefaultBackgroundColor();

      // turn to default bgColor last time slected
      if (selectedRow % 2 === 1) {
        rows[selectedRow].style.backgroundColor = "white";
        rows[selectedRow].style.color = "black";
      } else if (selectedRow % 2 === 0) {
        rows[selectedRow].style.backgroundColor = "#dddddd";
        rows[selectedRow].style.color = "black";
      }

      // set bgColor newest selected
      selectedRow = i;
      rows[i].style.backgroundColor = "rgb(1, 13, 124)";
      rows[i].style.color = "white";

      selectedPartsHubToUsedPart();
    };
  }
}

function createrowtablePartsHub(data) {
  for (let i = 0; i < data.length; i++) {
    var table = document.getElementById("parts_hub_table");
    try {
      var row = table.insertRow(table.length);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = data[i].parts_name;
      cell2.innerHTML = data[i].parts_num;
    } catch (error) {}
  }
  selectedPartsHubToUsedPart();
}

function createrowtableUsedParts(data) {
  partsRepair = data.type_desc.trn_parts_repair;
  for (let i = 0; i < partsRepair.length; i++) {
    var table = document.getElementById("used_part_table");
    try {
      var row = table.insertRow(table.length);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);

      cell1.innerHTML = searchParts(partsRepair[i].parts_id, partshub);
      cell2.innerHTML = partsRepair[i].parts_num;
    } catch (error) {}
  }
  selectedUsedPartsToModify();
}

function turnDefaultBackgroundColorUsed() {
  let table = document.getElementById("used_part_table");
  let rows = table.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) {
    if (i !== selectedRowUsed) {
      if (i % 2 === 1) {
        rows[i].style.backgroundColor = "white";
      } else {
        rows[i].style.backgroundColor = "#dddddd";
      }
      rows[i].style.color = "black";
    }
  }
}

function selectedUsedPartsToModify() {
  var table = document.getElementById("used_part_table");
  var rows = table.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) {
    rows[i].onmouseenter = function() {
      turnDefaultBackgroundColorUsed();

      if (i !== selectedRowUsed) {
        rows[i].style.backgroundColor = "rgb(35, 128, 250)";
        rows[i].style.color = "white";
      }

      selectedUsedPartsToModify();
    };

    rows[i].onclick = function() {
      turnDefaultBackgroundColorUsed();
      if (selectedRowUsed % 2 === 1) {
        rows[selectedRowUsed].style.backgroundColor = "white";
        rows[selectedRowUsed].style.color = "black";
      } else if (selectedRowUsed % 2 === 0) {
        rows[selectedRowUsed].style.backgroundColor = "#dddddd";
        rows[selectedRowUsed].style.color = "black";
      }
      selectedRowUsed = i;
      rows[i].style.backgroundColor = "rgb(1, 13, 124)";
      rows[i].style.color = "white";

      selectedUsedPartsToModify();
    };
  }
}

function validateNumber(evt) {
  if (/^[\D]$/.test(String.fromCharCode(evt.keyCode))) {
    evt.preventDefault();
  }
}

function modifyUsedParts() {
  var table = document.getElementById("used_part_table");
  var rows = table.getElementsByTagName("tr");

  if (document.getElementById("partsName").value !== "") {
    if (
      document.getElementById("partsName").value !==
      rows[selectedRowUsed].innerText.match(/\S+/g)[0]
    ) {
      alert("แก้ไขไม่ได้, อะไหล่ไม่ตรงกัน");
    } else {
      var modifyNum = parseInt(document.getElementById("partsNum").value);

      //find with using parts name(another table)
      var findPartsFromHub = searchPartsByName(
        document.getElementById("partsName").value,
        partshub
      );

      if (modifyNum > 0 && modifyNum <= findPartsFromHub.parts_num) {
        //add extra used parts num to using parts num
        var isPartsExists = false;

        for (let j = 0; j < partsRepair.length; j++) {
          var getText = rows[selectedRowUsed].innerText.match(/\S+/g);
          if (getText[0] === searchParts(partsRepair[j].parts_id, partshub)) {
            isPartsExists = true;
            table.deleteRow(selectedRowUsed);
            let row = table.insertRow(selectedRowUsed);

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerHTML = getText[0];
            cell2.innerHTML = modifyNum + partsRepair[j].parts_num;
            break;
          }
        }

        if (!isPartsExists) {
          table.deleteRow(selectedRowUsed);

          let row = table.insertRow(selectedRowUsed);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);

          cell1.innerHTML = document.getElementById("partsName").value;
          cell2.innerHTML = modifyNum;
        }

        selectedUsedPartsToModify();

        document.getElementById("partsName").value = "";
        document.getElementById("partsNum").value = "";
      } else {
        alert("แก้ไขไม่ได้, จำนวนอะไหล่เกินจากในคลัง หรือ เป็น 0");
      }
    }
  } else if (selectedRowUsed > 0) {
    let getUsedPartsSelected = rows[selectedRowUsed].innerText.match(/\S+/g);

    let thisPartsHasLatestUsed = false;
    for (let i = 0; i < partsRepair.length; i++) {
      if (
        searchParts(partsRepair[i].parts_id, partshub) ===
          getUsedPartsSelected[0] &&
        partsRepair[i].parts_num === parseInt(getUsedPartsSelected[1])
      ) {
        thisPartsHasLatestUsed = true;
        break;
      }
    }

    if (!thisPartsHasLatestUsed) {
      document.getElementById("partsName").value = getUsedPartsSelected[0];
      document.getElementById("partsNum").value = getUsedPartsSelected[1];
    } else {
      alert("อะไหล่นี้ถูกใช้ไปแล้ว");
    }
  } else {
    alert("กรุณาเลือกแถวข้อมูลที่ต้องการทางตารางฝั่งขวาก่อน");
  }
}

function deleteUsedParts() {
  var table = document.getElementById("used_part_table");
  var rows = table.getElementsByTagName("tr");

  var tableph = document.getElementById("parts_hub_table");
  var rowsph = tableph.getElementsByTagName("tr");

  if (selectedRowUsed > 0) {
    let getUsedPartsSelected = rows[selectedRowUsed].innerText.match(/\S+/g);

    let partsTurnToHub = searchPartsByName(getUsedPartsSelected[0], partshub);
    if (partsTurnToHub !== null) {
      //looping to check,Is parts from Hub has available
      let hubHasFoundThisParts = false;
      //looping to check,Is parts from Used has available
      let usedHasFoundThisParts = false;

      for (let i = 1; i < rowsph.length; i++) {
        if (rowsph[i].innerText.match(/\S+/g)[0] === getUsedPartsSelected[0]) {
          hubHasFoundThisParts = true;
          break;
        }
      }

      for (let i = 0; i < partsRepair.length; i++) {
        if (
          searchParts(partsRepair[i].parts_id, partshub) ===
          getUsedPartsSelected[0]
        ) {
          usedHasFoundThisParts = true;
          break;
        }
      }

      if (!hubHasFoundThisParts && usedHasFoundThisParts) {
        // modify row of used parts to default first seen
        table.deleteRow(selectedRowUsed);
        let row = table.insertRow(selectedRowUsed);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.innerHTML = searchParts(
          partsRepair[selectedRowUsed - 1].parts_id,
          partshub
        );
        cell2.innerHTML = partsRepair[selectedRowUsed - 1].parts_num;

        // insert row of parts hub to default first seen
        row = tableph.insertRow(tableph.length);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell1.innerHTML = partsTurnToHub.parts_name;
        cell2.innerHTML = partsTurnToHub.parts_num;
      } else if (!hubHasFoundThisParts && !usedHasFoundThisParts) {
        table.deleteRow(selectedRowUsed);

        let row = tableph.insertRow(tableph.length);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = partsTurnToHub.parts_name;
        cell2.innerHTML = partsTurnToHub.parts_num;
      } else {
        alert("อะไหล่นี้เหลือไม่เพียงพอ");
      }

      //switch background to default when rows was deleted
      for (let i = 1; i < rows.length; i++) {
        if (i % 2 === 1) {
          rows[i].style.backgroundColor = "white";
        } else {
          rows[i].style.backgroundColor = "#dddddd";
        }
        rows[i].style.color = "black";
      }

      selectedRowUsed = -1;

      //clear fields
      document.getElementById("partsName").value = "";
      document.getElementById("partsNum").value = "";

      //touch another table when one is changed
      selectedUsedPartsToModify();
      selectedPartsHubToUsedPart();
    } else {
      alert("อะไหล่นี้ถูกใช้ไปแล้ว");
    }
  } else {
    alert("กรุณาเลือกแถวข้อมูลที่ต้องการทางตารางฝั่งขวาก่อน");
  }
}

function acceptChange() {
  if (document.getElementById("partsName").value !== "") {
    alert("กรุณาแก้ไขให้เรียบร้อยก่อน");
  } else {
    let rows = document
      .getElementById("used_part_table")
      .getElementsByTagName("tr");

    const partsUsingData = [];

    for (let i = 1; i < rows.length; i++) {
      let parts = searchPartsByName(
        rows[i].innerText.match(/\S+/g)[0],
        partshub
      );
      partsUsingData.push({
        parts_id: parts.parts_id,
        parts_num: parseInt(rows[i].innerText.match(/\S+/g)[1]),
        parts_price: parts.parts_price
      });
    }

    editPartThisProduct(partsUsingData, thisPlateLicense).then(data => {
      if (data) {
        alert("อัพเดทอะไหล่สำเร็จ");

        for (let i = 0; i < partsUsingData.length; i++) {
          for (let j = 0; j < partshub.length; j++) {
            if (partsUsingData[i].parts_id === partshub[j].parts_id) {
              let hasUpdate = false,
                hasNumchange = false;
              for (let k = 0; k < partsRepair.length; k++) {
                if (partsUsingData[i].parts_id === partsRepair[k].parts_id) {
                  hasUpdate = true;
                  if (
                    partsUsingData[i].parts_num !== partsRepair[k].parts_num
                  ) {
                    hasNumchange = true;
                  }
                  break;
                }
              }

              if (
                (hasUpdate === true && hasNumchange === true) ||
                (hasUpdate === false && hasNumchange === false)
              ) {
                let partsNumNotNegative =
                  partshub[j].parts_num - partsUsingData[i].parts_num;
                const newPartshub = {
                  parts_id: partsUsingData[i].parts_id,
                  parts_num: partsNumNotNegative < 0 ? 0 : partsNumNotNegative
                };

                editPartsHub(newPartshub).then(data => {
                  if (data.status) {
                    alert(
                      `อัพเดทอะไหล่ "${searchParts(
                        data.parts_id,
                        partshub
                      )}" สำเร็จ`
                    );
                  }
                });
                console.log(partsUsingData[i], hasUpdate, hasNumchange);
                break;
              }
            }
          }
        }
      } else {
        alert("อัพเดทอะไหล่ไม่สำเร็จ");
      }
    });
  }
}

//                            [SEARCHING]
function removeAlloption() {
  // var select = document.getElementById("lplate_add_selected");
  // var length = select.options.length;
  //console.log('length => ', length)
  // for (i = 0, c = 0; i < length; i++) {
  //     select.options[c] = null;
  // }
}

function runScript(e) {
  if (e.keyCode == 13) {
    var txt = document.getElementById("input_used_part").value;
    if (txt === "") {
      removeAlloption();
      createrowtablePartsHub(product);
    } else {
      console.log(txt);
      let resultObject = searchProductByCarFix(txt, product);
      if (resultObject !== null) {
        removeAlloption();
        var table = document.getElementById("parts_hub_table");

        var row = table.insertRow(table.length);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "NEW CELL1";
        cell2.innerHTML = "NEW CELL2";

        // var select = document.getElementById("lplate_selected");
        // var option = document.createElement("option");
        // option.text = resultObject.trn_car.car_license;
        // option.value = resultObject.trn_car.car_license;
        // option.onclick = function () { ShowDetail(this.value); };
        // ShowDetail(resultObject.trn_car.car_license)
        // select.add(option);
      } else {
        removeAlloption();
      }
    }
  }
  return false;
}



function searchParts(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].parts_id === nameKey) {
      return myArray[i].parts_name;
    }
  }
  return null;
}

function searchPartsByName(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].parts_name === nameKey) {
      return myArray[i];
    }
  }
  return null;
}
