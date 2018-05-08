class Ohlc{
	constructor(coinStr, time, open, high,
				low, close, volumefrom, volumeto){
		this.coinStr = coinStr;								
		this.time = unixTSConvert(time);					
		this.open = open;					
		this.high = high;					
		this.low = low;		
		this.close = close;
		this.volumefrom = volumefrom;
		this.volumeto = volumeto;

	}
}

function unixTSConvert(int){
	return new Date(int*1000);
}