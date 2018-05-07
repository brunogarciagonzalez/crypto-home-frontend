function generateChart (coinStr) {
  let dictionary = {
    "bitcoin": "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=1000",
    "ethereum": "https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=1000"
  };

  let apiUrl = dictionary[coinStr]

  let ohlcArray = [];

  fetch(apiUrl)
  .then(response => response.json())
  .then(parsedJson => {
    for (var index in parsedJson.Data) {
      // debugger;
      let current = parsedJson.Data[index];
      let temp = {"time": current.time, "open": current.open, "high": current.high, "low": current.low, "close": current.close };
      ohlcArray.push(temp);
      // appendListItem(temp);
    };
    debugger;
    generateChart(bpiArray);
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


}
