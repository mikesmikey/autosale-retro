
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


function getAllCustomer() {
    return new Promise((resolve, reject) => {
            axios.get('http://localhost:5000/customers').then((result) => {
                resolve(result.data);
            })

    })
}
getAllCustomer().then((data) => {console.log(data)})

