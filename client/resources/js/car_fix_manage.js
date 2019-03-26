car_fix = []

function getCarFixByPlate_License() {
    var pointer = document.getElementById("lplate_selected");
    var getPlateL = pointer.options[pointer.selectedIndex].value;
    alert(getPlateL)
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/products').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                customer.push(result.data[i])
            }
        })
    })
}  
function ReceiveCarFixAddContent() {
    var name = document.getElementById("name_text");
    var phone = document.getElementById("phone_text");
    var addr = document.getElementById("addr_text");
    var tax_no = document.getElementById("tax_no_text");

    var car_name = document.getElementById("cname_text");
    var car_brand = document.getElementById("cbrand_text");
    var car_model = document.getElementById("cmodel_text");
    var car_plicense = document.getElementById("c_plicense_text");
    var car_plicense = document.getElementById("c_plicense_text");
}
