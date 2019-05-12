let part = [];


function getAllPart() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/parts').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                part.push(result.data[i])
            }
        })
    })
}

function startForm() {
    getAllPart().then((data) => {
        addRow('table-body', data);
        addRow('table-body2', data);
    });
}

function addRow(tableID, data) {   
    for (i = 0; i < data.length; i++) {
        var tr = document.createElement('tr'); // create a td node
        var td = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
       
        td.innerHTML = data[i].parts_id;
        td2.innerHTML = data[i].parts_name;
        td3.innerHTML = data[i].parts_num;
        td4.innerHTML = data[i].parts_price;
       
       
      
        tr.appendChild(td);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
     
        document.getElementById(tableID).appendChild(tr);
    }
  
    
}



startForm()
getAllPart().then((data) => { console.log(data) })