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
            var priceBuyAll = data[i].trn_desc.price_buy + data[i].trn_desc.commission
            td4.innerHTML =  Number.parseInt(priceBuyAll).toLocaleString('en-US')
            td5.innerHTML = 0
            td6.innerHTML =  Number.parseInt(0 - priceBuyAll).toLocaleString('en-US')

            totalExpenses = totalExpenses + priceBuyAll
            totalIncome = totalIncome + 0
            totalProfit = totalProfit + (0 - priceBuyAll)
        }else if(data[i].prod_type =="Sell"){
             //รายจ่าย
            td4.innerHTML = 0;

            //รายรับ
            var idBuy = data[i].trn_desc.trn_buy_id
            var arrSell = data
            var priceSell = 0
            for (j = 0; j < 2; j++){
                    if(idBuy == arrSell[j].prod_id){
                        priceSell = arrSell[j].trn_desc.price_sell - data[i].trn_desc.commission
                        break 
                    } 
            }
            td5.innerHTML = Number.parseInt(priceSell).toLocaleString('en-US')

            //สรุป
            td6.innerHTML = Number.parseInt(priceSell - 0).toLocaleString('en-US')
            
            totalExpenses = totalExpenses + 0
            totalIncome = totalIncome + priceSell
            totalProfit = totalProfit + (priceSell - 0)
        }else if(data[i].prod_type =="RegisterLicense"){
            console.log(data[i])
            //รายจ่าย
            console.log(data[i].trn_desc.car_license +" ****" )
            var priceCost = data[i].trn_desc.price_per_book + data[i].trn_desc.fare
            td4.innerHTML = Number.parseInt(priceCost).toLocaleString('en-US')
          
            //รายรับ
            var totalPriceRel = data[i].trn_desc.total_price
            td5.innerHTML = Number.parseInt(totalPriceRel).toLocaleString('en-US')

            //สรุป
            td6.innerHTML = Number.parseInt(totalPriceRel - priceCost ).toLocaleString('en-US')

            totalExpenses = totalExpenses + priceCost
            totalIncome = totalIncome + totalPriceRel
            totalProfit = totalProfit + (totalPriceRel - priceCost)
        }else if(data[i].prod_type =="Repair"){ 
            //รายจ่าย
            var arrPartsRepair = data[i].trn_desc.trn_parts_repair
            var priceParts = 0
           for (j = 0; j < 2; j++) {
                priceParts = priceParts + (arrPartsRepair[j].parts_price * arrPartsRepair[j].parts_num) 
            }
            td4.innerHTML =  Number.parseInt(priceParts).toLocaleString('en-US')

            //รายรับ
            var costOfRepairs = data[i].trn_desc.cost_of_repairs
            td5.innerHTML =  Number.parseInt(costOfRepairs).toLocaleString('en-US')

            //สรุป
            td6.innerHTML =  Number.parseInt(costOfRepairs - priceParts).toLocaleString('en-US')

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
   /*document.querySelectorAll(".Cprice").forEach((element)=> {
        element.innerHTML = " ราคา : " + Number.parseInt(resultObject.trn_desc.price_sell).toLocaleString('en-US') +" บาท";
    })*/
function showTotalPrice(){
   /* Number.parseInt(totalProfit).toLocaleString('en-US')*/
    document.getElementById("totalExpenses").innerHTML = "รายจ่ายรวม : " + Number.parseInt(totalExpenses).toLocaleString('en-US') +" บาท"
    document.getElementById("totalIncome").innerHTML = "รายรับรวม : " + Number.parseInt(totalIncome).toLocaleString('en-US') +" บาท"
    document.getElementById("totalProfit").innerHTML = "สรุปผลกำไรรวม : " + Number.parseInt(totalProfit).toLocaleString('en-US')+" บาท"
}

startForm()
getAllProduct().then((data) => { console.log(data) })