function generateGoogleDisplay () {
  // access the correct div
  let mainDisplayDiv = document.getElementById("mainDisplayDiv");
  // add Google form with image
  mainDisplayDiv.innerHTML = "<center><img align='center' src='https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'><form action='http://www.google.com/search' class='searchform' method='get' name='searchform' target='_blank'><input autocomplete='on' class='form-controls search' name='q' placeholder='Search via Google' required='required'  type='text'><button class='button' type='submit'>Search</button></form></center>";
};


function clearMainDisplayDiv() {
  // look through mainDisplayDiv's children and remove them using .remove()
    // mainDisplayDiv.children is an HTMLCollection so cannot use array iterators
  for (var i = 0; i < mainDisplayDiv.children.length; i++) {
    mainDisplayDiv.children[i].remove();
  }
}
