class APIAdapter{
	constructor(coinStr, type = 'historical'){
		this.url = APIAdapter.getApiUrl(coinStr);	
	}
	fetchJson(){
		return fetch(this.url)
			   	.then(response => response.json());
	}
	static getApiUrl(coinStr){
		return {
			"Bitcoin": "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=1000" ,
			"Ethereum": "https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=1000",
			"Ripple": "https://min-api.cryptocompare.com/data/histoday?fsym=XRP&tsym=USD&limit=200"
		}[coinStr];
	}
}