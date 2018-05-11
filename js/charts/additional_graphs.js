// specific to a div: price or volume || can change to anything
//
// two main options:
//   what graph:
//     price: daily / hourly / minute
//     volume: daily / hourly
//   what time period:
//
//
// add event listeners to the buttons

function initializeCustomGraphOptions () {
  let historyButton = document.getElementById("historyDivButton");
  let volumeButton = document.getElementById("volumeDivButton");

  historyButton.addEventListener("click", event => {
    let intervalDropDrown = document.getElementById("historyInterval");
    let cryptoDropDown = document.getElementById("historyCrypto");
    let fiatDropDown = document.getElementById("historyFiat");
    let intervalNumInput = document.getElementById("historyIntervalNum");
    // if input empty or input includes anything buy numbers then alert invalid
      // and clear the value of the input
      // and is integer not float
    let isNum = /^\d+$/.test(intervalNumInput.value);
    let isInt = Number.isInteger(parseInt(intervalNumInput.value))

    if ((intervalNumInput.value.length > 0) && (isNum) && (isInt)) {
        // send off
        let intervalStr = intervalDropDrown.value;
        let coinCurrency = cryptoDropDown.value;
        let fiatCurrency = fiatDropDown.value;
        let intervalNum = intervalNumInput.value;

        let url = apiQueryConstructor(intervalStr, coinCurrency, fiatCurrency, intervalNum);

        // using above url, fetch the data and make the graph
        ohlcArray = [];

        fetch(url)
    		.then(response => response.json())
        .then(parsedJson => {
          parsedJson.Data.forEach((day)=>{
          let temp = new Ohlc(coinCurrency, day.time, day.open,
                              day.high, day.low, day.close,
                              day.volumefrom, day.volumeto);
            ohlcArray.push(temp);
          })
          return parsedJson;
        }).then(parsedJson => {
          let title = coinCurrency + " " + intervalStr + " " + `(Intervals: ${intervalNum})` + " " + fiatCurrency;
          drawHistory(title, historyDiv, ohlcArray);
        });
        //clear input
        intervalNumInput.value = "";
    } else {
      intervalNumInput.value = "";
      alert("Invalid input for Intervals to Graph!");
    }


  });

  volumeButton.addEventListener("click", event => {
    let intervalDropDrown = document.getElementById("volumeInterval");
    let cryptoDropDown = document.getElementById("volumeCrypto");
    let fiatDropDown = document.getElementById("volumeFiat");
    let intervalNumInput = document.getElementById("volumeIntervalNum");
    // if input empty or input includes anything buy numbers then alert invalid
      // and clear the value of the input
      // and is integer not float
    let isNum = /^\d+$/.test(intervalNumInput.value);
    let isInt = Number.isInteger(parseInt(intervalNumInput.value))

    if ((intervalNumInput.value.length > 0) && (isNum) && (isInt)) {
        // send off
        let intervalStr = intervalDropDrown.value;
        let coinCurrency = cryptoDropDown.value;
        let fiatCurrency = fiatDropDown.value;
        let intervalNum = intervalNumInput.value;

        let url = apiQueryConstructor(intervalStr, coinCurrency, fiatCurrency, intervalNum);

        // using above url, fetch the data and make the graph
        ohlcArray = [];

        fetch(url)
    		.then(response => response.json())
        .then(parsedJson => {
          parsedJson.Data.forEach((day)=>{
          let temp = new Ohlc(coinCurrency, day.time, day.open,
                              day.high, day.low, day.close,
                              day.volumefrom, day.volumeto);
            ohlcArray.push(temp);
          })
          return parsedJson;
        }).then(parsedJson => {
          let title = coinCurrency + " " + intervalStr + " " + `(Intervals: ${intervalNum})` + " " + fiatCurrency;
          drawHistory(title, volumeDiv, ohlcArray);
        });
        //clear input
        intervalNumInput.value = "";
    } else {
      intervalNumInput.value = "";
      alert("Invalid input for Intervals to Graph! volume");
    }


  });


  // add volume button listener
}

function apiQueryConstructor(intervalStr, coinCurrency, fiatCurrency, intervalNum) {
  // depending on input, format part of the query string to match
  return addCustomGraphPeriod(customGraphCurrencies(customGraphTimeInterval(baseApiUrl(), intervalStr), coinCurrency, fiatCurrency), intervalNum);
}

function baseApiUrl () {
  return "https://min-api.cryptocompare.com/data/";
}

function customGraphTimeInterval(apiStr, intervalStr) {
  let intervalConstructor = {
    "Daily": "histoday?",
    "Hourly": "histohour?",
  };

  return apiStr + intervalConstructor[intervalStr];
}

function customGraphCurrencies(apiStr, coinCurrency, fiatCurrency) {
  // fsym=BTC&tsym=USD
  let coinConstructor = {
    "BTC": "fsym=BTC",
    "ETH": "fsym=ETH",
    "XRP": "fsym=XRP"
  };

  let fiatConstructor =  {
    "USD": "&tsym=USD",
    "EUR": "&tsym=EUR",
    "GBP": "&tsym=GBP"
  };

  return apiStr + coinConstructor[coinCurrency] + fiatConstructor[fiatCurrency];
}


function addCustomGraphPeriod(apiStr, intervalNum) {
  return apiStr + "&limit=" + intervalNum;
}



// ===============



function drawChart(keyArr){
  let data = getChartData(keyArr);
    let layout = {
      title: `${"asdasda"} ${keyArr.includes('volumefrom')? 'Volume' : 'Price'} Chart`,
    };
    Plotly.newPlot(domId, data, layout);
}
function getChartData(keyArr){
    return keyArr.map(key=>getTrace(key));
}

function getTrace(key){
  return {
      type: "scatter",
      mode: "lines",
      name: `${key === 'volumefrom'? 'volume' : key}`,
      x: ohlcArray.map(day => day.time), //the dates
      y: ohlcArray.map(day => day[key]), //the key
      line: {color: getTraceColor(key)}
  }
}

function getTraceColor(key){
    return {
        'open': '#1ABC9C',
        'close': '#A569BD',
        'high': '#17BECF',
        'low': '#7F7F7F',
        'volumefrom': '#25D33C'
    }[key];
  }
