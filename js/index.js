document.addEventListener("DOMContentLoaded", ()=>{
	memo = {};
	initializeDom(memo);
	let logger = new DoLogin();
	logger.initializeLoginEvent();
	initMessages();
	initMessageForm();
});