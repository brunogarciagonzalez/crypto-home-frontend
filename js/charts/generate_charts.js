function generateCharts (coinStr, historyId, volumeId) {
  let title = coinStr;
  let historyDiv = historyId;
  let volumeDiv = volumeId;
  let ohlcArray = [];
  let adapter = new APIAdapter(coinStr);

  adapter.fetchJson()
    .then(parsedJson => {
      parsedJson.Data.forEach((day)=>{
      let temp = new Ohlc(title, day.time, day.open,
                          day.high, day.low, day.close,
                          day.volumefrom, day.volumeto);
        ohlcArray.push(temp);
      })
      return parsedJson;
    })
    .then(response =>{
      drawHistory(title, historyDiv, ohlcArray);
      drawVolume(title, volumeDiv, ohlcArray);
      return response;
    })
    .then(response => {
      // add nav event listeners
      let nav = document.getElementById("nav");
      nav.addEventListener("click", e=>handleNavEvents(e));
    });

}
