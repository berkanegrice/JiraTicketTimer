// Common part
var webSiteURL = document.URL.toString();
var date = new Date();
var isStarted = false;

// For jira only
var jiraPrefix = "jira.broadangle.com";
var webPrefix = "https://jira.broadangle.com/projects/"
var jiraRegex = /[a-zA-Z]+-[0-9]+/;

document.addEventListener('DOMNodeInserted', domChangedCallback);

function isOnJIRA(openedWebSite) {
    return openedWebSite.includes(jiraPrefix);
}

function getTicketID(openedWebSite) {
    var nameWithId = openedWebSite.match(jiraRegex)[0];
    return nameWithId.split('-')[1];
}

function startTimerWithID(ticketID) {
    var timeNow = date.getTime();
    alert('Timer is started: ' + ticketID + ' time: ' + timeNow);
    setCookie(ticketID, timeNow, { secure: true, 'max-age': 3600 });
}

function stopTimerWithID(ticketID) {
    var start = parseInt(getCookie(ticketID), 10);  
    var dateNow = new Date();
    var elapsedTime = msToTime(dateNow.getTime() - start);
    alert('start : ' + typeof(start) + ' Passed Time: ' + elapsedTime.toString());  
}

function domChangedCallback() {
    var URL = document.URL; 
    if (isOnJIRA(URL)) {        
        var ticketID = getTicketID(URL);
        if(document.getElementById("action_id_4") != null && !isStarted) {
            var startProgressButton = document.getElementById("action_id_4");
            startProgressButton = startProgressButton.addEventListener("click", () =>
                startTimerWithID(ticketID), false); isStarted = true;
        }
        if(document.getElementById("action_id_301") != null && isStarted) {
            var closeProgressButton = document.getElementById("action_id_301");    
            closeProgressButton.addEventListener("click", () =>
                stopTimerWithID(ticketID), false);  isStarted = false;
        }
    }
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