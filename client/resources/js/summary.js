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
    /*// Get a reference to the table
   
    let tableRef = document.getElementById(tableID);
    // Insert a row at the end of the table
    
  
    // Insert a cell in the row at index 0
   
  
    // Append a text node to the cell
 
    for (let i = 0; i < data.length; i++) {
        
        let newRow = tableRef.insertRow(-1);
        let newCell = newRow.insertCell(i);
        let productID = data[i].prod_id
        let  newText = document.createTextNode(productID);
        newCell.appendChild(newText);
    }*/

   
    for (i = 0; i < data.length; i++) {
        var tr = document.createElement('tr'); // create a td node
        var td = document.createElement('td');
        td.innerHTML = data[i].prod_id;
        tr.appendChild(td);
        document.getElementById(tableID).appendChild(tr);
    }
}



startForm()

getAllProduct().then((data) => { console.log(data) })