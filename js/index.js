// connect to the historic data api
// connect to the live data api
// get some info on the page
// how to turn data into chart? => js library?

document.addEventListener("DOMContentLoaded", ()=>{
  generateChart("Bitcoin", "bitcoinDiv");
  generateChart("Ethereum", "ethereumDiv");
  generateChart("Ripple", "rippleDiv");
  
});

// fetch("https://api.coindesk.com/v1/epi/currentprice.json").then(response => response.json())
// .then(parsedJson => {
//   debugger;
//   for (var dailyBPI in parsedJson.bpi) {
//     //let temp = {"date": dailyEPI, "bpi": parsedJson.epi[dailyEPI] }
//     //bpiArray.push(temp);
//     // appendListItem(temp);
//   };
//   generateChart(bpiArray);
// })
