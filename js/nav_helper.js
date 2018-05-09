function handleNavEvents(event, memo) {
    event.stopPropagation();
    // make sure clicked on a nav item via ".nav-item"
    // use nav item id to conclude which item clicked on
    if (event.target.classList.contains("nav-item")) {
      clearMainDiv();
      let loadId = event.target.id;
      setTimeout(loadDirector.bind(null, loadId, historyDiv, volumeDiv, memo), 100);
    }
}
function loadDirector(loadId, historyDiv, volumeDiv){
      if(loadId === "Google"){
        generateGoogleDisplay();
      }else{
        setTimeout(generateCharts.bind(null, loadId, historyDiv, volumeDiv, memo), 100);
      }
}