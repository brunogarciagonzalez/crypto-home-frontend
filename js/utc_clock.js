function initializeUTC () {

  window.setInterval(function(){
    let time = moment.utc().format();
    // => "2018-05-10T22:06:29Z"
    let timeArr = time.split("-");
    let monthNum = timeArr[1];

    let hour = time.split("T")[1].split(":")[0];
    let minute = time.split("T")[1].split(":")[1];
    let seconds = time.split("T")[1].split(":")[2].slice(0, -1);
    let day = timeArr[2].split("T")[0];
    let month = monthDict(monthNum)
    let year = timeArr[0];

    let timeString = `${day} ${month} ${year}  <strong id="pipe" class="colory">|</strong>  ${hour} : ${minute} : ${seconds}`
    setClockTime(timeString);
    colory();
  }, 1000);

}

function currentSecond () {
  let time = moment.utc().format();
  return time.split("T")[1].split(":")[2].slice(0, -1);
}

function setClockTime(str) {
  let clock = document.getElementById("utc-clock");
  clock.innerHTML = `<p class="utc-p colory" id="utc-word">UTC</p> <p class="utc-p">${str}</p>`;
  // vertical alignment of poth paragraphs
}

function monthDict (monthNum) {
  return {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  }[monthNum]
}

function colory() {
  let arr = document.querySelectorAll(".colory");

  let color = "#AEC3B0";

  if (currentSecond() == 0) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].style.color = color;
    }
  } else {
    for (var i = 0; i < arr.length; i++) {
      arr[i].style.color = white;
    }
  }

}
