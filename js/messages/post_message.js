// add event listener to msg button
// if logged in fetch
//logged in check requires access to global variable

//else alert



// initializePostButton
  // find the dom element that is that button
  // add an event listener to that button
    // fetch
    // otherwise alert please log in
    // let logged in = (globalvariable.currentUser)


function initializePostButton() {
  let messageButton = document.getElementById("message-button");
  messageButton.addEventListener("click", event => messagePostHandler(event));
}

function messagePostHandler(event) {
  if (logger.currentUser) {
    let messageContent = document.getElementById("message-input").value;

    if (messageContent.length > 1) {

      fetch("http://localhost:3000/messages", {
        headers: {"Content-type": "application/json"},
        method: "POST",
        body: JSON.stringify({"message":{"content": messageContent, "username": logger.currentUser.username}})
      });

      document.getElementById("message-input").value = "";

    } else {
      alert("Empty message!")
    }
  } else {
    alert("Please log in to message!");
  }
}
