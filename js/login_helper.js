// add event listener to login button
(function () {
  let loginButton = document.getElementById("login-button");
  function login (username) {
    let toReturn;
    // fetch
    let apiUrl = "http://localhost:3000/signin";
    let fullApiUrl = apiUrl + "?username=" + username;
    fetch(fullApiUrl, { method: "POST" })
    .then(response => {
      console.log("in .then #1, initial response:", response);
      return response.json()
    })
    .then(parsedJson => {
      console.log("in .then #2, parsed json:", parsedJson);
      console.log("toReturn1:", toReturn);
      toReturn = parsedJson;
      console.log("toReturn2:", toReturn);
    });
    // should return a promise
  }; // <-- end of login()

  function loginHandler (event) {
    // get input field
    let loginInput = document.getElementById("login-input");
    // errors: empty?
    if (loginInput.value.length < 1) {
      // will need to produce an alert
      alert("Please enter username.")
    } else {
      // login
      let a = login(loginInput.value);
      debugger;
      // global 'currentUserId' = id of user
        // whose username was in input field
      // add 'welcome <user>' in place of input field
        // and logout button
    }
    // errors: valid username?

  }; // <-- end of loginHandler()

  loginButton.addEventListener("click", event => loginHandler(event));
})()
