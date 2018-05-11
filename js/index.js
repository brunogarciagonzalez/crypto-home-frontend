logger = new DoLogin();
document.addEventListener("DOMContentLoaded", ()=>{
	memo = {};
	initializeDom(memo);
	logger.initializeLoginEvent();
	initMessages();
	initializePostButton();
	initializeUTC();
	initializeCustomGraphOptions();
	
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

});
