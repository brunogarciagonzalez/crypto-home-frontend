class ChartHelper{
	constructor(coinStr, domId, ohlcArray){
		this.coinStr = coinStr;		
		this.domId = domId;		
		this.ohlcArray = ohlcArray;
	}
	drawChart(keyArr){
		let data = this.getChartData(keyArr);
	    let layout = {
	      title: `${this.coinStr} ${keyArr.includes('volumefrom')? 'Volume' : 'Price'} Chart`,
	    };
	    Plotly.newPlot(this.domId, data, layout);
	}
	getChartData(keyArr){
	    return keyArr.map(key=>this.getTrace(key));
	}
  	getTrace(key){
		return {
	  		type: "scatter",
	  		mode: "lines",
	  		name: `${key === 'volumefrom'? 'volume' : key}`,
	  		x: this.ohlcArray.map(day => day.time), //the dates
	  		y: this.ohlcArray.map(day => day[key]), //the key
	  		line: {color: this.getTraceColor(key)}
		}
	}
	getTraceColor(key){
    	return {
      		'open': '#1ABC9C',
      		'close': '#A569BD',
      		'high': '#17BECF',
      		'low': '#7F7F7F',
      		'volumefrom': '#25D33C'
    	}[key];
  	}

}