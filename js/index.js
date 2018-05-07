// connect to the historic data api
// connect to the live data api
// get some info on the page
// how to turn data into chart? => js library?
let bpiArray = [];

fetch("https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2018-05-06")
  .then(response => response.json())
  .then(parsedJson => {
    for (var dailyBPI in parsedJson.bpi) {
      let temp = {"date": dailyBPI, "bpi": parsedJson.bpi[dailyBPI] }
      bpiArray.push(temp);
      appendListItem(temp);
    };
    generateChart(bpiArray.map(day => day.date), bpiArray.map(day => day.bpi))
    // debugger;
    // list.innerHTML += `<li> </li>`
})

function appendListItem(bpiObject) {
  // takes in: {date: "2013-09-01", bpi: 128.2597}
  let list = document.getElementById("historic");
  list.innerHTML += `<li>Date: ${bpiObject.date} | BPI: ${bpiObject.bpi} </li>`;
}

function generateChart (dateArray, priceArray) {
  debugger;
  return c3.generate({})
}

let chart = c3.generate({
  data: {
      x: 'x',
//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
      columns: [
          ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
//            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
          ['data1', 30, 200, 100, 400, 150, 250],
      ]
  },
  axis: {
      x: {
          type: 'timeseries',
          tick: {
              format: '%Y-%m-%d'
          }
      }
  }
});
