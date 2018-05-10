logger = new DoLogin();
document.addEventListener("DOMContentLoaded", ()=>{
	memo = {};
	initializeDom(memo);
	logger.initializeLoginEvent();
	initMessages();
	initializePostButton();
});
