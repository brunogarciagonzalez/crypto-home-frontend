function generateCharts (coinStr, historyId, volumeId, memo) {
  let title = coinStr;
  let historyDiv = historyId;
  let volumeDiv = volumeId;
  let ohlcArray = [];
  let adapter = new APIAdapter(coinStr);
  if(coinStr in memo){
    drawHistory(title, historyDiv, memo[coinStr]);
    drawVolume(title, volumeDiv, memo[coinStr]);
  }else{
    adapter.fetchJson()
      .then(parsedJson => {
        parsedJson.Data.forEach((day)=>{
        let temp = new Ohlc(title, day.time, day.open,
                            day.high, day.low, day.close,
                            day.volumefrom, day.volumeto);
          ohlcArray.push(temp);
        })
        memo[ohlcArray[0].coinStr] = ohlcArray
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
        nav.addEventListener("click", e=>handleNavEvents(e, memo));
      });
  }


}
