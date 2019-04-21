let thisPlateLicense = decodeURIComponent(window.location.search)
  .substring(1)
  .split("=")
  .pop();
let partshub = [];
let resultObject;
let thisParts = "";
let thisCarData;
whenFormOpenUp();

function whenFormOpenUp() {
  getAllPart().then(data => {
    createrowtablePartsHub(data);
  });

  getAllUsedPartsByThisLicense(thisPlateLicense).then(data => {
    createrowtableUsedParts(data);
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

function selectedUsedPartsToModify() {

}

function createrowtableUsedParts(data) {
  const partsRepair = data.type_desc.trn_parts_repair;
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
  
}

function selectedPartsHubToUsingPart() {
  var table = document.getElementById("parts_hub_table");
  var rows = table.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) {
    rows[i].onclick = function() {
      let caps = rows[i].innerText.match(/\S+/g);
      var table2 = document.getElementById("used_part_table");
      var rows2 = table2.getElementsByTagName("tr");
      var notHasUsed = false;

      for (let j = 1; j < rows2.length; j++) {
        let capsPartsUsed = rows2[j].innerText.match(/\S+/g);
        if (caps[0] === capsPartsUsed[0]) {
          notHasUsed = true;
          table.deleteRow(i);
          table2.deleteRow(j);

          let row = table2.insertRow(j);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          cell1.innerHTML = capsPartsUsed[0];
          cell2.innerHTML = parseInt(caps[1]) + parseInt(capsPartsUsed[1]);
          break;
        }
      }

      if(!notHasUsed) {
        table.deleteRow(i);
        let row = table2.insertRow(table2.length);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
  
        cell1.innerHTML = caps[0];
        cell2.innerHTML = caps[1];
      }
      console.log(notHasUsed)
      selectedPartsHubToUsingPart()

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
  selectedPartsHubToUsingPart();
}

function removeAlloption() {
  // var select = document.getElementById("lplate_add_selected");
  // var length = select.options.length;
  // //console.log('length => ', length)
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

        // <tr>
        //     <td class="mix">
        //     <br />
        //         </td>
        //     <td class="mix">
        //         <br />
        //     </td>
        // </tr>

        // <tr>
        //     <td class="mixUnder">
        //         <br />
        //     </td>
        //     <td class="mixUnder">
        //         <br />
        //     </td>
        // </tr>
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
