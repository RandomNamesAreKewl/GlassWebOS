// Adapted from top answer of https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour "0" should be "12"
    minutes = ("0" + minutes).slice(-2);
    var strTime = hours + ":" + minutes + ":" + ("0" + seconds).slice(-2) + " " + ampm;
    return strTime;
}

var clock = document.getElementById("topbar").appendChild(document.createElement("span"));

setInterval(() => {
    clock.innerText = formatAMPM(new Date());
}, 1000);
clock.innerText = formatAMPM(new Date());