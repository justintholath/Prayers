
var displayLang = "";
var season = "";

function formatStr(inString) {
    var outString = formatCom(inString)
    if (outString == "") {
        return "";
    };
    var lineVersion = outString.slice(0,3);
    var remLang = outString.slice(3);
    switch (displayLang) {
        case 'AE':
            if (["AE:","AA:"].includes(lineVersion)) {
                if (remLang == "") {
                    return "*"
                } else {
                    outString = remLang;
                };
            } else if (["AM:"].includes(lineVersion)) {
                outString = "";
            };
            break;
        case 'AM':
            if (["AM:","AA:"].includes(lineVersion)) {
                if (remLang == "") {
                    return "*"
                } else {
                    outString = remLang;
                };
            } else if (["AE:"].includes(lineVersion)) {
                outString = "";
            };
            break;
        case 'AP':
            if (["AE:","AA:"].includes(lineVersion)) {
                if (remLang == "") {
                    return "*"
                } else {
                    outString = remLang;
                };
            } else if (["AM:"].includes(lineVersion)) {
                outString = '<span style="color: #800000;">' + remLang + '</span>'
            };
            break;
        case 'SE':
            if (["AE:","SE:","SA:","AA:"].includes(lineVersion)) {
                if (remLang == "") {
                    return "*"
                } else {
                    outString = remLang;
                };
            } else if (["AM:","SM:","KM:","KE:","KA:"].includes(lineVersion)) {
                outString = "";
            };
            break;
        case 'SM':
            if (["AM:","SM:","SA:","AA:"].includes(lineVersion)) {
                if (remLang == "") {
                    return "*"
                } else {
                    outString = remLang;
                };
            } else if (["AE:","SE:","KM:","KE:","KA:"].includes(lineVersion)) {
                outString = "";
            };
            break;
        case 'SP':
            if (["AE:","SE:","SA:","AA:"].includes(lineVersion)) {
                if (remLang == "") {
                    return "*"
                } else {
                    outString = remLang;
                };
            } else if (["AM:","SM:"].includes(lineVersion)) {
                outString = '<span style="color: #800000;">' + remLang + '</span>'
            } else if (["KM:","KE:","KA:"].includes(lineVersion)) {
                outString = "";
            };
            break;
        case 'KE':
            if (["AE:","KE:","KA:","AA:"].includes(lineVersion)) {
                if (remLang == "") {
                    return "*"
                } else {
                    outString = remLang;
                };
            } else if (["AM:","KM:","SM:","SE:","SA:"].includes(lineVersion)) {
                outString = "";
            };
            break;
        case 'KM':
            if (["AM:","KM:","KA:","AA:"].includes(lineVersion)) {
                if (remLang == "") {
                    return "*"
                } else {
                    outString = remLang;
                };
            } else if (["AE:","KE:","SM:","SE:","SA:"].includes(lineVersion)) {
                outString = "";
            };
            break;
        case 'KP':
            if (["AE:","KE:","KA:","AA:"].includes(lineVersion)) {
                if (remLang == "") {
                    return "*"
                } else {
                    outString = remLang;
                };
            } else if (["AM:","KM:"].includes(lineVersion)) {
                outString = '<span style="color: #800000;">' + outString.substring(3) + '</span>'
            } else if (["SM:","SE:","SA:"].includes(lineVersion)) {
                outString = "";
            };
            break;
    };
    return outString
};



function setLang() {
    // Get the query string from the URL
    const urlParams = new URLSearchParams(window.location.search);

    // Retrieve the specific variable (e.g., 'mode')
    const myMode = urlParams.get('mode');

    switch (myMode) {
    case 'AE':
        displayLang = 'AE';
        season = ""
        break;
    case 'AM':
        displayLang = 'AM';
        season = ""
        break;
    case 'AP':
        displayLang = 'AP';
        season = ""
        break;
    case 'SE':
        displayLang = 'SE';
        season = "Sleeba"
        break;
    case 'SM':
        displayLang = 'SM';
        season = "Sleeba"
        break;
    case 'SP':
        displayLang = 'SP';
        season = "Sleeba"
        break;
    case 'KE':
        displayLang = 'KE';
        season = "Kymtha"
        break;
    case 'KM':
        displayLang = 'KM';
        season = "Kymtha"
        break;
    case 'KP':
        displayLang = 'KP';
        season = "Kymtha"
        break;
    default:
        alert("unknown mode" + urlParams)
    };
};

