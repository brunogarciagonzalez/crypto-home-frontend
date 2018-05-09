// add event listener to login button
  let globalCurrentUser;
  let loginButton = document.getElementById("login-button");
  let logoutButton = document.getElementById("logout-button");
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
            let logoutButton = document.getElementById("logout-button");
            logoutButton.addEventListener("click", event => console.log("logout"));
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
      switchButtons();
      addNameToDOM(currentUser);
      //add event listener to logout button
  }

  function addNameToDOM(currentUser){
    let loginContainer = document.getElementById("login-container");
    let loginInput = document.getElementById("login-input");
    loginInput.remove();
    loginContainer.innerHTML = `<p style="display: inline-block">Welcome, ${currentUser.username} </p>` + 
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

