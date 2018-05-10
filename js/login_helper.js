  globalCurrentUser = null;

  function initializeLoginEvent(){
    let loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", event => loginHandler(event));
  }

  function initializeLogoutEvent(){
    let logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", event => logoutHandler(event));    
  }

  function loginHandler (event) {
    let loginInput = document.getElementById("login-input");
    if (loginInput.value.length < 1) {
      alert("Please enter username.")
    }else { //login
        loginFetch(loginInput.value)
          .then(loginAttempt => { 
            if(loginAttempt === "Failiure"){
              resetLogin();
            }else{
              loginDOM(loginAttempt);
              initializeLogoutEvent();
            }
          })
    }
  }; // <-- end of loginHandler()

  function logoutHandler(event){
    globalCurrentUser = null;
    document.getElementById('welcome-msg').remove();
    switchButtons();
    let loginContainer = document.getElementById('login-container');
    loginContainer.innerHTML = '<input id="login-input" type="text">' +
                               loginContainer.innerHTML;
    initializeLoginEvent();
  }

  function resetLogin(){
    let loginInput = document.getElementById("login-input");
    loginInput.value = ""; 
    alert("Incorrect Login!");
    loginInput.focus();
  }

  function loginDOM(currentUser){
      globalCurrentUser = currentUser;
      switchButtons();
      addNameToDOM(currentUser);
  }


  function addNameToDOM(currentUser){
    let loginContainer = document.getElementById("login-container");
    let loginInput = document.getElementById("login-input");
    loginInput.remove();
    loginContainer.innerHTML = `<p id = "welcome-msg" style="display: inline-block">Welcome, ${currentUser.username} </p>` + 
                               loginContainer.innerHTML;
  }
  function switchButtons(){
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
  function loginFetch (username) {
    let apiUrl = "http://localhost:3000/signin";
    let fullApiUrl = apiUrl + "?username=" + username;
    return fetch(fullApiUrl, { method: "POST" })
      .then(response => {
        return response.status === 200? response.json() : "Failure";
      });
  }; // <-- end of loginFetch()







