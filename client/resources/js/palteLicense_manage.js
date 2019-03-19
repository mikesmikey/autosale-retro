function getAllCustomer() {
    let data;
    return new Promise((resolve, reject) => {
            axios.get('/products', sendData).then((result) => {
                resolve(result.data); 
            })
    })
}
console.log(getAllCustomer())