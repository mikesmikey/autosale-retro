let thisPlateLicense = decodeURIComponent(window.location.search)
    .substring(1)
    .split("=")
    .pop();
whenFormOpenUp();
let partshub = [];
let resultObject;
let thisParts = "";
let thisCarData;
var partsRepair;
let appraiseChoose;

function whenFormOpenUp() {
    getAllPart();

    getAllUsedPartsByThisLicense(thisPlateLicense).then(data => {
        createrowtableUsedParts(data);
    });
}

function editRepairCost(cost) {
    return new Promise((resolve, reject) => {
        axios
            .post(
                "http://localhost:5000/product/type/Repair/edit/cost/" +
                cost + "/" + thisPlateLicense
            )
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

function createrowtableUsedParts(data) {
    partsRepair = data.type_desc.trn_parts_repair;
    let total_parts_price = 0;
    for (let i = 0; i < partsRepair.length; i++) {
        var table = document.getElementById("apr_used_part_table");
        try {
            var row = table.insertRow(table.length);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            cell1.innerHTML = searchParts(partsRepair[i].parts_id, partshub);
            cell2.innerHTML = partsRepair[i].parts_num;
            cell3.innerHTML = partsRepair[i].parts_price;
            total_parts_price += partsRepair[i].parts_num * partsRepair[i].parts_price;
        } catch (error) { }
    }
    document.getElementById("total_parts_price").value = total_parts_price
}

function clearChecked() {
    var sibling = document.getElementsByName("making_p")
    for (let i = 0; i < sibling.length; i++) {
        sibling[i].checked = false
    }
}

function appraiseOne() {
    var total_pp = parseInt(document.getElementById("total_parts_price").value)
    document.getElementById("repair_price").value = total_pp + total_pp * 0.1
    document.getElementById("repair_price").disabled = true
}
function appraiseTwo() {
    var total_pp = parseInt(document.getElementById("total_parts_price").value)
    document.getElementById("repair_price").value = total_pp + total_pp * 0.2
    document.getElementById("repair_price").disabled = true
}
function appraiseThree() {
    var total_pp = parseInt(document.getElementById("total_parts_price").value)
    document.getElementById("repair_price").value = total_pp + total_pp * 0.3
    document.getElementById("repair_price").disabled = true
}
function appraiseMyself() {
    document.getElementById("repair_price").value = "";
    document.getElementById("repair_price").disabled = false
}

function accept() {
    var cost = parseInt(document.getElementById("repair_price").value)
    if (document.getElementById("repair_price").value === "") {
        alert("กรุณากรอกราคาซ่อม")
    }
    else {
        editRepairCost(cost).then(data => {
            if (data) {
                alert("อัพเดทราคาซ่อมแล้ว")
                window.location.href = "./car_fix.html"
            }
        })
    }
}

function validateNumber(evt) {
    if (/^[\D]$/.test(String.fromCharCode(evt.keyCode))) {
        evt.preventDefault();
    }
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