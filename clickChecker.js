// Common part
var date = new Date();
// For jira only
var jiraRegex = /[a-zA-Z]+-[0-9]+/;
var totalHourDaily = 6;

window.addEventListener('load', ready);
window.addEventListener('DOMNodeInserted', ready);

function ready() {
    if(document.getElementById("action_id_4") != null) {
        document.getElementById("action_id_4").onclick = function() { // will be replaced onclick method on release version.
            startTimerWithID(getTicketID(document.URL))
        };
    }
    if(document.getElementById("action_id_301") != null) { //change with [action_id_301, edit-issue-submit] on release version.
        document.getElementById("action_id_301").onclick = function() { //....
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
    if (getCookie(ticketID) != '') {
        alert('This ticket progress already started.');
    } else {
        setCookie(ticketID, timeNow, { secure: true, 'max-age': 2629800000 }); // exactly one month, therefore think of scrum lengths.
        setCookie('TotalHour', totalHourDaily, { secure: true, 'max-age': 2629800000 }); // set total working hour.
        alert('Timer is started: ' + ticketID + " Current Local time: " + new Date().toLocaleTimeString());
    }
}

function stopTimerWithID(ticketID) {
    var start = parseInt(getCookie(ticketID), 10);  
    var raw = new Date().getTime() - start;
    var elapsedTime = msToTime(raw);
    var leftTime = parseFloat(parseInt(getCookie('TotalHour'), 10) - elapsedTime).toFixed(2);
    setCookie('TotalHour', leftTime, { secure: true, 'max-age': 2629800000 }); // update total working hour.
    alert('start : ' + start + ' Passed Time: ' + elapsedTime + ' Left Time: ' + leftTime);
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
    for (let i = 0; i < ca.length; i++) {
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
