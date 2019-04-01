let product = [];
var totalExpenses = 0
var totalIncome = 0
var totalProfit = 0

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
        var td4 = document.createElement('td');
        var td5 = document.createElement('td'); 
        var td6 = document.createElement('td'); 
        td.innerHTML = data[i].prod_id;
        td2.innerHTML = data[i].prod_type;
        td3.innerHTML = data[i].prod_order_date;
        if(data[i].prod_type =="Buy"){
            var priceBuyAll = data[i].type_desc.price_buy + data[i].type_desc.commission
            td4.innerHTML = priceBuyAll;
            td5.innerHTML = 0
            td6.innerHTML = 0 - priceBuyAll

            totalExpenses = totalExpenses + priceBuyAll
            totalIncome = totalIncome + 0
            totalProfit = totalProfit + (0 - priceBuyAll)
        }else if(data[i].prod_type =="Sell"){
             //รายจ่าย
            td4.innerHTML = 0;

            //รายรับ
            var idBuy = data[i].type_desc.trn_buy_id
            var arrSell = data
            var priceSell = 0
            for (j = 0; j < 2; j++){
                    if(idBuy == arrSell[j].prod_id){
                        priceSell = arrSell[j].type_desc.price_sell
                        break 
                    } 
            }
            td5.innerHTML = priceSell

            //สรุป
            td6.innerHTML = priceSell - 0
            
            totalExpenses = totalExpenses + 0
            totalIncome = totalIncome + priceSell
            totalProfit = totalProfit + (priceSell - 0)
        }else if(data[i].prod_type =="RegisterLicense"){
            //รายจ่าย
            var priceCost = data[i].type_desc.price_per_book + data[i].type_desc.fare
            td4.innerHTML = priceCost;
          
            //รายรับ
            var totalPriceRel = data[i].type_desc.total_price
            td5.innerHTML = totalPriceRel

            //สรุป
            td6.innerHTML = totalPriceRel - priceCost

            totalExpenses = totalExpenses + priceCost
            totalIncome = totalIncome + totalPriceRel
            totalProfit = totalProfit + (totalPriceRel - priceCost)
        }else if(data[i].prod_type =="Repair"){ 
            //รายจ่าย
            var arrPartsRepair = data[i].type_desc.trn_parts_repair
            var priceParts = 0
           for (j = 0; j < 2; j++) {
                priceParts = priceParts + (arrPartsRepair[j].parts_price * arrPartsRepair[j].parts_num) 
            }
            td4.innerHTML = priceParts

            //รายรับ
            var costOfRepairs = data[i].type_desc.cost_of_repairs
            td5.innerHTML = costOfRepairs

            //สรุป
            td6.innerHTML = costOfRepairs - priceParts

            totalExpenses = totalExpenses + priceParts
            totalIncome = totalIncome + costOfRepairs
            totalProfit = totalProfit + (costOfRepairs - priceParts)
        }
        tr.appendChild(td);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        document.getElementById(tableID).appendChild(tr);
    }
    showTotalPrice()
    
}

function showTotalPrice(){
    document.getElementById("totalExpenses").innerHTML = "รายจ่ายรวม : " + totalExpenses +" บาท"
    document.getElementById("totalIncome").innerHTML = "รายรับรวม : " + totalIncome +" บาท"
    document.getElementById("totalProfit").innerHTML = "สรุปผลกำไรรวม : " + totalProfit +" บาท"
}

startForm()
getAllProduct().then((data) => { console.log(data) })