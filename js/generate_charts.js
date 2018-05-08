function generateCharts (coinStr, historyId, volumeId) {
  let title = coinStr;
  let historyDiv = historyId;
  let volumeDiv = volumeId;
  Plotly.purge(historyId);
  let ohlcArray = [];
  let adapter = new APIAdapter(coinStr);

  fetch(adapter.url)
    .then(response => response.json())
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

  function handleNavEvents(event) {
    // make sure clicked on a nav item via ".nav-item"
    // use nav item id to conclude which item clicked on
    if (event.target.classList.contains("nav-item")) {
      if (event.target.id != "Google"){
        generateCharts(event.target.id, historyDiv);
      }
    }
  }

}
