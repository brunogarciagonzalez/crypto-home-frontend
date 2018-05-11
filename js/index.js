logger = new DoLogin();
document.addEventListener("DOMContentLoaded", ()=>{
	memo = {};
	initializeDom(memo);
	logger.initializeLoginEvent();
	initMessages();
	initializePostButton();
	initializeUTC();

	window.App = {}
	window.App.cable = ActionCable.createConsumer("ws://localhost:3000/cable");
	window.App.messages = App.cable.subscriptions.create('MessagesChannel', {  
	  received: function(data) {
		   	console.log(data);
		   	writeMessages([data]);
		  // $("#messages").removeClass('hidden')
		  // return $('#messages').append(this.renderMessage(data));
	  },
	});

	let msgQueue = [];
	msgQueue.push = function(){
		if (this.length >= 5) {
	        this.shift();
	    }
	    return Array.prototype.push.apply(this,arguments);
	}
	let once = new DoOnce();
	var currentPrice = {};
	var socket = io.connect('https://streamer.cryptocompare.com/');
	//Format: {SubscriptionId}~{ExchangeName}~{FromSymbol}~{ToSymbol}
	//Use SubscriptionId 0 for TRADE, 2 for CURRENT, 5 for CURRENTAGG eg use key '5~CCCAGG~BTC~USD' to get aggregated data from the CCCAGG exchange 
	//Full Volume Format: 11~{FromSymbol} eg use '11~BTC' to get the full volume of BTC against all coin pairs
	//For aggregate quote updates use CCCAGG ags market
	var subscription = ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD'];
	socket.emit('SubAdd', { subs: subscription });
	socket.on("m", function(message) {
		var messageType = message.substring(0, message.indexOf("~"));
		if(messageType == 5){
			let msgArr = message.split('~');
			let msgObj = parsePrice(message);
			if(msgArr[5].length < 8){
				msgQueue.push(msgObj);
				
			}
		}

		setInterval(function(){
			clearTicker();
			addTicker(msgQueue);
		}, 30000)
		
		if(msgQueue.length === 5){
			once.initializeTicker(msgQueue);
		}
	});

});

class DoOnce{
	constructor(){
		this.done = false;
	}
	initializeTicker(msgQueue){
		if(!this.done){
			addTicker(msgQueue);
			this.done = true;
		}
	}
}

/*
'{SubscriptionId}~{ExchangeName}~{FromCurrency}~{ToCurrency}~{Flag}~{Price}~{LastUpdate}~{LastVolume}~{LastVolumeTo}~{LastTradeId}~{Volume24h}~{Volume24hTo}~{LastMarket}'
*/

/*.  0      1.       2       3    4
	["5", "CCCAGG", "BTC", "USD", "4",
	   5           6             7          8              9
	 "8607.61", "1526051894", "0.00001", "0.0859297", "3667912148", 
	   10                         11                  12                   13                14
	 "98505.91618294138", "867214308.9973913", "131351.29187644852", "1169070555.3277729", "9032.22", 
	   15        16           17         18        19
	 "9032.27", "8519.79", "9339.62", "9376.9", "8513.03",
	    20       21 
	 "Gemini", "7ffe9"]
*/

function parsePrice(message){
	let msgArr = message.split('~');
	let coin = msgArr[2];
	let lastPrice = msgArr[5];
	let lastVolume = msgArr[7];
	
	let last24Vol = msgArr[10];
	let lastMktPrice = msgArr[14];

	let tradeStr = `${coin}: ${lastVolume} at $${lastPrice}`;
	let volStr = `${coin} 24H Agg.Vol: ${last24Vol}`;
	return {tradeStr: tradeStr, volStr:volStr};
}


function addTicker(msgQueue){
	msgQueue.forEach(element => {
		let tickerContainer=document.querySelector('.ticker')
		let tradeStr = `<div class='ticker__item'>${element.tradeStr}</div>`
		let volStr = `<div class='ticker__item'>${element.volStr}</div>`
		tickerContainer.innerHTML += tradeStr;
		tickerContainer.innerHTML += volStr;
	})
}

function clearTicker(){
	let tickerContainer = document.querySelector('.ticker');
	tickerContainer.innerHTML = "";
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


