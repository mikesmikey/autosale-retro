const axios = require ('axios')

function launchCustomerOrder() {
    document.getElementById('order-customer').classList.add('is-active');
}

function closeCustomerOrder() {
    document.getElementById('order-customer').classList.remove('is-active');
}

function launchCustomerDelete() {
    document.getElementById('delete-customer').classList.add('is-active');
}

function closeCustomerDelete() {
    document.getElementById('delete-customer').classList.remove('is-active');
}


function getAllCustomer(data) {
    return new Promise((resolve, reject) => {
            axios.get('/customer', sendData).then((result) => {
                resolve(result.data);
            })
      
    })
}

