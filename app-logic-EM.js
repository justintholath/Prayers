
var displayLang = "P";
var season = "";

function formatStr(inString) {
    var outString = formatCom(inString)
    if (outString == "") {
        return "*";
    };
    var langInd = outString.slice(0,2);
    var remLang = outString.slice(2);
    switch (displayLang) {
        case 'M':
            if (langInd == "E:") {
                return ""
            } else if (langInd == "M:") {
                return remLang;
            } else {
                return outString;
            };
            break;
        case 'E':
            if (langInd == "M:") {
                return ""
            } else if (langInd == "E:") {
                return remLang;
            } else {
                return outString;
            };
            break;
        default:
            if (langInd == "E:") {
                return remLang;
            } else if (langInd == "M:") {
                return '<span style="color: #800000;">' + remLang + '</span>';
            } else {
                return outString;
            };
    };
    return outString + "????"
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

