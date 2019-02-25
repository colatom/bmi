var btn = document.querySelector('.btn');
btn.addEventListener('click',getAns,false);
var data = JSON.parse(localStorage.getItem('list')) || []
var table = document.querySelector('table');
var sta = document.querySelector('.sta');

updateList(data);


function getAns(){
  var tall = document.querySelector('.tall').value;
  var weight = document.querySelector('.weight').value;
  var bmi = weight / ((tall/100)*(tall/100));
  bmi = bmi.toFixed(2)
  if(tall == '' || weight == ''){
      return alert('你有欄位未輸入!!');
    }

  var d = new Date();  
  var year = d.getFullYear();
  var mon = d.getMonth();
  var date = d.getDate();
  if(d.getMonth() < 10){mon = '0'+(d.getMonth()+1)};  
  if(d.getDate() < 10){date = '0'+d.getDate()};
  var status = '';
  var statusColor ="";
  var btnsta ='';
  if(bmi <= 18.5){
    status = "過輕";
    statusColor = "status-1";
    btnsta = 'stacolor-1'
  }else if(bmi <= 25 && bmi > 18.5){
    status = "理想";
    statusColor = "status-2";
    btnsta = 'stacolor-2'
  }else if(bmi <= 30 && bmi > 25){
    status = "過重"
    statusColor = "status-3";
    btnsta = 'stacolor-3'
  }else if(bmi <= 35 && bmi > 30){
    status = "輕度肥胖"
    statusColor = "status-4";
    btnsta = 'stacolor-4'
  }else if(bmi <= 40 && bmi > 35){
    status = "中度肥胖"
    statusColor = "status-5";
    btnsta = 'stacolor-5'
  }else if(bmi <= 40){
    status = "重度肥胖"
    statusColor = "status-6";
    btnsta = 'stacolor-6'
  }else return;  

  var record = `
  <tr class="ans">
    <td class="${statusColor}"></td>
    <td class="status">${status}</td>
    <td><span>BMI</span>${bmi}</td>
    <td><span>weight</span>${weight}kg</td>
    <td><span>height</span>${tall}cm</td>
    <td><span>${mon}-${date}-${year}</span></td>
  </tr>
  `

  var rec = {
    content: record
  }
  data.push(rec);
  updateList(data);
  localStorage.setItem('list', JSON.stringify(data))

  function getStatus(){
    btn.innerHTML = `
                    <h2>${bmi}</h2>
                    `
    btn.classList.add(btnsta);
    sta.innerHTML = status;
    sta.style.border = 'none';     
    sta.classList.add(btnsta);   
    }
  getStatus();
}

function updateList(items){
  var str = '';
  for(var i = 0; i<items.length;i++){
    str += items[i].content;
  }
  table.innerHTML = str 
};

