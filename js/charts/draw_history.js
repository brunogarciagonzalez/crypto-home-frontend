function drawHistory(coinStr, domId, ohlcArray){
  let charter = new ChartHelper(coinStr, domId, ohlcArray);
  charter.drawChart(['open', 'close', 'high', 'low']) 
}