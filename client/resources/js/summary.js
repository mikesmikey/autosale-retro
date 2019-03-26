let product = [];

function getAllProduct() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/products').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                product.push(result.data[i])
            }
        })
    })
}

function startForm() {
    getAllProduct().then((data) => {
        addRow('table-body', data);
    });
}

function addRow(tableID, data) {   
    for (i = 0; i < data.length; i++) {
        var tr = document.createElement('tr'); // create a td node
        var td = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        td.innerHTML = data[i].prod_id;
        td2.innerHTML = data[i].prod_type;
        td3.innerHTML = data[i].prod_order_date;
        tr.appendChild(td);
        tr.appendChild(td2);
        tr.appendChild(td3);
        document.getElementById(tableID).appendChild(tr);
    }
}

startForm()

getAllProduct().then((data) => { console.log(data) })