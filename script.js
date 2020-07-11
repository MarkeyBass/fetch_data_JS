let fetchResponse = [];
let objectKeys = [];
let totalHours = 0;

const table = document.querySelector('#table'); 
const tbody = document.querySelector('#tbody');

function createTableBody(rows) {
  for (let i = 0; i < rows.length; i++){
    let tr = document.createElement('tr');
    tbody.appendChild(tr); 
    tr.className = 'table-info';      

    if(isURL(rows[i].url)) {
      tr.setAttribute("style", "cursor:pointer"); 
      tr.setAttribute("onclick", `document.location='${rows[i].url}'`); 
    }
    
    for(let j = 0; j < objectKeys.length; j++){
      if (objectKeys[j] === "courseName" || objectKeys[j] === "hours" ){
        let td = document.createElement('td');
        tr.appendChild(td);
        tdValue = rows[i][objectKeys[j]];   
        let tdTextNode = document.createTextNode(tdValue);
        td.appendChild(tdTextNode);

        // td.appendChild(document.createTextNode(Object.values(rows[i])[j]));
        // tdValue = Object.values(rows[i])[j] 

      }  
    }
  }
}
function isURL(str) {
  let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}

function totalPathHours(){
  
  for (i = 0; i < fetchResponse.length; i++) {
    totalHours += fetchResponse[i].hours;
  }

  const total_1 = document.getElementById('total_1_10');
  const total_2 = document.getElementById('total_2_10');
  const total_3 = document.getElementById('total_3_10');
  const total_4 = document.getElementById('total_4_10');
  const total_5 = document.createElement('tr');
  total_5.id = "total_5_10";
  total_5.className = "table-primary"
  const thLast1 = document.createElement('th');
  const thLast2 = document.createElement('th');


  total_1.appendChild(document.createTextNode(`משך הקורס-סה"כ ${totalHours} שעות אקדמיות כ-10 חודשים 2-3 מפגשים בשבוע`));;
  total_2.appendChild(document.createTextNode(`משך הקורס-סה"כ ${totalHours} שעות אקדמיות כ-10 חודשים 2-3 מפגשים בשבוע`));;
  total_3.appendChild(document.createTextNode(`משך הקורס-סה"כ ${totalHours} שעות אקדמיות כ-10 חודשים 2-3 מפגשים בשבוע`));;
  total_4.appendChild(document.createTextNode(`משך הקורס-סה"כ ${totalHours} שעות אקדמיות כ-10 חודשים 2-3 מפגשים בשבוע`));;
  

  tbody.appendChild(total_5);
  total_5.appendChild(thLast1);
  total_5.appendChild(thLast2);
  thLast1.appendChild(document.createTextNode(`סה"כ מסלול מלא`));
  thLast2.appendChild(document.createTextNode(totalHours));
  
}

fetch('https://rt-students.com/api/getpath/10')
.then(response => response.json())
.then(data => {
  console.log(data);
  console.log(typeof(data));
  fetchResponse = data;
  objectKeys = Object.keys(data[0]);

  createTableBody(fetchResponse);
  totalPathHours();
})


