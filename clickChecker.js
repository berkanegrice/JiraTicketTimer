// For jira only
var jiraRegex = /[a-zA-Z]+-[0-9]+/;


window.addEventListener('load', ready);
window.addEventListener('DOMNodeInserted', ready);

function ready() {
    if(document.getElementById("action_id_4") != null) {
        document.getElementById("action_id_4").onmouseover = function() {
            startTimerWithID(getTicketID(document.URL))
        };
    }
    if(document.getElementById("edit-issue-submit") != null) { //change with action_id_301 on release version.
        document.getElementById("edit-issue-submit").onmouseover = function() { //....
            stopTimerWithID(getTicketID(document.URL))
        };
    }
}

function getTicketID(openedWebSite) {
    var nameWithId = openedWebSite.match(jiraRegex)[0];
    return nameWithId.split('-')[1];
}

function startTimerWithID(ticketID) {
    var timeNow = new Date().getTime();
    // ONLY FOR DEBUG: Start Progress is already started.
    if (getCookie(ticketID) != '') {
        alert('This ticket progress already started.');
    } else {
        setCookie(ticketID, timeNow, { secure: true, 'max-age': 3600 });
        alert('Timer is started: ' + ticketID + ' time: ' + timeNow);
    }
}

function stopTimerWithID(ticketID) {
    var start = parseInt(getCookie(ticketID), 10);  
    var raw = new Date().getTime() - start;
    var elapsedTime = msToTime(raw);
    alert('start : ' + start + ' Passed Time: ' + elapsedTime + ' As a ms: ' + raw);  
}

function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        ...options
    };
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function msToTime (ms) {
    var seconds = (ms/1000);
    var minutes = parseInt(seconds/60, 10);
    seconds = seconds%60;
    var hours = parseInt(minutes/60, 10);
    minutes = minutes%60;
    return hours;
}