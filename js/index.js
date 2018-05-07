// connect to the historic data api
// connect to the live data api
// get some info on the page
// how to turn data into chart? => js library?

document.addEventListener("DOMContentLoaded", ()=>{

  let bpiArray = [];

  fetch("https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2018-05-06")
    .then(response => response.json())
    .then(parsedJson => {
      for (var dailyBPI in parsedJson.bpi) {
        let temp = {"date": dailyBPI, "bpi": parsedJson.bpi[dailyBPI] }
        bpiArray.push(temp);
        // appendListItem(temp);
      };
      generateChart(bpiArray);
      // debugger;
      // list.innerHTML += `<li> </li>`
  })  
})

function appendListItem(bpiObject) {
  // takes in: {date: "2013-09-01", bpi: 128.2597}
  let list = document.getElementById("historic");
  list.innerHTML += `<li>Date: ${bpiObject.date} | BPI: ${bpiObject.bpi} </li>`;
}

function generateChart (bpiArray) {
  var trace1 = {
    type: "scatter",
    mode: "lines",
    name: 'BPI',
    x: bpiArray.map(day => day.date), //the dates
    y: bpiArray.map(day => day.bpi), //the bpi
    line: {color: '#17BECF'}
  }
  var data = [trace1];
  var layout = {
  title: 'Bitcoin Price Chart',
  };
  // debugger; 
  
  Plotly.newPlot('myDiv', data, layout);
}

function unpack(bpiObject, key){

}
