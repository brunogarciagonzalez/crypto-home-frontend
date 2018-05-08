function drawVolume(coinStr, domId, ohlcArray){
	let title = coinStr;
	let divId = domId;
	let ohlcArr = ohlcArray;

  let charter = new ChartHelper(coinStr, domId, ohlcArray);
  charter.drawChart(['volumefrom']);
}