function initMessages(){
	console.log("Hello");
	
	fetchMessages()
		.then(json=> {
			//get last 10
			writeMessages(json.slice(-10));
		})
}

function writeMessages(messageArr){
	let chatBox = document.getElementById('chat-box');
	messageArr.forEach(message=>{
		let date = parseDate(new Date(message.created_at));
		let user = message.user.username; 
		let content = message.content;
		let messageStr = '<li><span class="msg"><span class = "date">'+
						 `${date}` + ',</span> <span class="user">' + 
						 `${user}` + '</span>:</span>' + 
						 `${content}` + '</li><br>';
		chatBox.innerHTML += messageStr;
	})
}

function fetchMessages(){
	return fetch("http://localhost:3000/messages")
		.then(response=> response.json());
}

function parseDate(date){
  let monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();
  let time = date.toLocaleTimeString();
  return day + ' ' + monthNames[monthIndex] + ' ' + year + ', ' + time;
}

function initMessageForm(){
	let messageButton = document.getElementById('message-button');
	messageButton.addEventListener("click", e=>sendMessageHandler(e));
}

function sendMessageHandler(e){
	let input = document.getElementById('message-input');
	debugger;
}



