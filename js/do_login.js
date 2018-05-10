class DoLogin{
	constructor(){
		this.currentUser = null;
	}

	initializeLoginEvent(){
	    let loginButton = document.getElementById("login-button");
	    loginButton.addEventListener("click", event => this.loginHandler(event));
	}

    initializeLogoutEvent(){
	    let logoutButton = document.getElementById("logout-button");
	    logoutButton.addEventListener("click", event => this.logoutHandler(event));    
    }

    loginHandler (event) {
	    let loginInput = document.getElementById("login-input");
	    if (loginInput.value.length < 1) {
	      alert("Please enter username.")
		}else { //login
		    this.loginFetch(loginInput.value)
		        .then(loginAttempt => { 
	            if(loginAttempt === "Failure"){
	              this.resetLogin();
	            }else{
	              this.loginDOM(loginAttempt);
	              this.initializeLogoutEvent();
	            }
	        })
	    }
    }; // <-- end of loginHandler()

    logoutHandler(event){
	    this.currentUser = null;
	    document.getElementById('welcome-msg').remove();
	    this.switchButtons();
	    let loginContainer = document.getElementById('login-container');
	    loginContainer.innerHTML = '<input id="login-input" type="text">' +
	                               loginContainer.innerHTML;
	    this.initializeLoginEvent();
	}

	resetLogin(){
	    let loginInput = document.getElementById("login-input");
	    loginInput.value = ""; 
	    alert("Incorrect Login!");
	    loginInput.focus();
	}

	loginDOM(currentUser){
	  this.currentUser = currentUser;
      this.switchButtons();
      this.addNameToDOM(currentUser);
	}


	addNameToDOM(currentUser){
	    let loginContainer = document.getElementById("login-container");
	    let loginInput = document.getElementById("login-input");
	    loginInput.remove();
	    loginContainer.innerHTML = `<p id = "welcome-msg" style="display: inline-block">Welcome, ${currentUser.username} </p>` + 
                               loginContainer.innerHTML;
  	}

    switchButtons(){
		let loginButton = document.getElementById("login-button");
		let logoutButton = document.getElementById('logout-button');
		if(loginButton.classList.contains("invisible")){
		  loginButton.classList.remove("invisible");
		  logoutButton.classList.add("invisible");
		}else{
		  logoutButton.classList.remove("invisible");
		  loginButton.classList.add("invisible");
		}
    }

	loginFetch (username) {
	let apiUrl = "http://localhost:3000/signin";
	let fullApiUrl = apiUrl + "?username=" + username;
	return fetch(fullApiUrl, { method: "POST" })
			  .then(response => {
			   return response.status === 200? response.json() : "Failure";
	});
  }; // <-- end of loginFetch()

}
