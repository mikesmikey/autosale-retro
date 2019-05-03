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
let selectedRow = -1;
let selectedRowUsed = -1;

function whenFormOpenUp() {
  getAllPart().then(data => {
    createrowtablePartsHub(data);
  });

  getAllUsedPartsByThisLicense(thisPlateLicense).then(data => {
    createrowtableUsedParts(data);
  });
}
