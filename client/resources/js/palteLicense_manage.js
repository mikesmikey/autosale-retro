
var ojectData = []
function getAllProductByRegisterLicense() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/products/AllProductRegisterLicense').then((result) => {

            resolve(result.data);
            ojectData = result.data
        })

    })
}
function countObject (obj) {
    var count = 0;

    for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            count++;
        }
    }

    return count;
}

getAllProductByRegisterLicense().then((data) => {
    console.log(ojectData)
    console.log(ojectData.length) 
    for (let i = 0; i < ojectData.length; i++) {
        let objTest = ojectData[i]
        var objCount = countObject(objTest);
        console.log("data["+i+"] = "+objTest)
        console.log(objCount)
        for (let j = 0; j < objTest.length; j++) {
            console.log(objTest["prod_type"])
        }
    }
})

