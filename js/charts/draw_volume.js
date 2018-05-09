function drawVolume(coinStr, domId, ohlcArray){
  let charter = new ChartHelper(coinStr, domId, ohlcArray);
  charter.drawChart(['volumefrom']);
}