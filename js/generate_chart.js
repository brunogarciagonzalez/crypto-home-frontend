function generateChart (coinStr, domId) {
  let title = coinStr;
  let divId = domId;
  let dictionary = {
    "Bitcoin": "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=1000",
    "Ethereum": "https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=1000",
    "Ripple": "https://min-api.cryptocompare.com/data/histoday?fsym=XRP&tsym=USD&limit=200"
  };

  let apiUrl = dictionary[coinStr]
  let ohlcArray = [];

  fetch(apiUrl)
  .then(response => response.json())
  .then(parsedJson => {
    for (var index in parsedJson.Data) {
      let current = parsedJson.Data[index];
      let temp = {"time": unixTSConvert(current.time),
                  "open": current.open, 
                  "high": current.high,
                  "low": current.low, 
                  "close": current.close };
      ohlcArray.push(temp);
    };
    drawChart(ohlcArray);
  })

  function drawChart (ohlcArray) {
    let data = getChartData(ohlcArray, ['open', 'close', 'high', 'low']);
    let layout = {
      title: `${coinStr} Price Chart`,
    };
    Plotly.newPlot(divId, data, layout);
  }

  function getChartData(ohlcArray, keyArr){
    return keyArr.map(key=>getTrace(ohlcArray, key));
  }

  function getTraceColor(key){
    return {
      'open': '#1ABC9C',
      'close': '#A569BD',
      'high': '#17BECF',
      'low': '##7F7F7F'
    }[key];
  }

  function getTrace(ohlcArray, key){
    return {
      type: "scatter",
      mode: "lines",
      name: key,
      x: ohlcArray.map(day => day.time), //the dates
      y: ohlcArray.map(day => day[key]), //the bpi
      line: {color: getTraceColor(key)}
    }
  }

  function unixTSConvert(int){
    return new Date(int*1000);
  }
}
