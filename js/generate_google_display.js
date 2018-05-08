function generateGoogleDisplay () {
  // access the correct div
  let mainDiv = document.getElementById("mainDiv");
  // add Google form with image
  mainDiv.innerHTML =  "<center id='googleCenter'><img src='https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'><form action='http://www.google.com/search' class='searchform' method='get' name='searchform' target='_blank'><input autocomplete='on' class='form-controls search' name='q' placeholder='Search via Google' required='required'  type='text'><button class='button' type='submit'>Search</button></form></center>"

};

function clearMainDiv() {
  mainDiv.innerHTML = "<div id='historyDiv' style='float: center; display: inline-block;width:900px;height:375px;'></div>" +
  "<div id='volumeDiv' style='float: center; display: inline-block;width:900px;height:375px;'></div>";
}
