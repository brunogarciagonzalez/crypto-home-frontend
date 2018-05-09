// add event listener to login button
(function () {
  let globalCurrentUser;
  let loginButton = document.getElementById("login-button");
  loginButton.addEventListener("click", event => loginHandler(event));
  
  function loginHandler (event) {
    // get input field
    let loginInput = document.getElementById("login-input");
    // errors: empty?
    if (loginInput.value.length < 1) {
      alert("Please enter username.")
    }else { //login
        loginFetch(loginInput.value)
          .then(loginAttempt => {
            loginAttempt === "Failure"? resetLogin() : loginDOM(loginAttempt);
          })
          // global 'currentUserId' = id of user
            // whose username was in input field
          // add 'welcome <user>' in place of input field
            // and logout button
    }
    // errors: valid username?

  }; // <-- end of loginHandler()

  function resetLogin(){
    let loginInput = document.getElementById("login-input");
    loginInput.value = ""; 
    alert("Incorrect Login!");
    loginInput.focus();
  }

  function loginDOM(currentUser){
      globalCurrentUser = currentUser;
      let loginButton = document.getElementById("login-button");
      loginButton.id = "logout-button";
      loginButton.innerHTML = "LOGOUT";
      debugger;
      alert(JSON.stringify(currentUser));
  }

  

  function loginFetch (username) {
    let apiUrl = "http://localhost:3000/signin";
    let fullApiUrl = apiUrl + "?username=" + username;
    return fetch(fullApiUrl, { method: "POST" })
      .then(response => {
        return response.status === 200? response.json() : "Failure";
      });
  }; // <-- end of loginFetch()

})()
