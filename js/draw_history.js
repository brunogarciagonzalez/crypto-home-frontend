function drawHistory(coinStr, domId, ohlcArray){
	let title = coinStr;
	let divId = domId;
	let ohlcArr = ohlcArray;
	drawChart(ohlcArray);

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

	function getTraceColor(key){
    	return {
      		'open': '#1ABC9C',
      		'close': '#A569BD',
      		'high': '#17BECF',
      		'low': '##7F7F7F'
    	}[key];
  	}
}