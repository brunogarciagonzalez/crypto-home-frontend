function generateChart (coinStr, domId) {
  let title = coinStr;
  let divId = domId;
  Plotly.purge(domId);
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
      drawHistory(title, divId, ohlcArray);
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
        generateChart(event.target.id, divId);
      }
    }
  }

}
