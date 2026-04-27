
var displayLang = "P";
var season = "";

function formatStr(inString) {
    var outString = formatCom(inString)
    if (outString.substring(0,2) == "E:") {
        if (displayLang == 'M') {
            outString = ""
        } else {
            outString = outString.substring(2)
        }
    } else if (outString.substring(0,2) == "M:") {
        if (displayLang == 'E') {
            outString = ""
        } else if (displayLang == 'P') {
            outString = '<span style="color: #800000;">' + outString.substring(2) + '</span>'
        } else {
            outString = outString.substring(2)
        };
    };
    return outString
};



function setLang() {
    // Get the query string from the URL
    const urlParams = new URLSearchParams(window.location.search);

    // Retrieve the specific variable (e.g., 'mode')
    const myMode = urlParams.get('mode');

    displayLang = 'P';
    if (myMode === 'E') {
        displayLang = 'E';
    } else if (myMode === 'M') {
        displayLang = 'M';
    };
};

