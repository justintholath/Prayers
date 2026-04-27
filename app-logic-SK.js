
var displayLang = "";
var season = "";

function formatStr(inString) {
    var outString = formatCom(inString)
    var lineVersion = outString.substring(0,3)
    switch (displayLang) {
        case 'SE':
            if (["AE:","SE:","SA:"].includes(lineVersion)) {
                outString = outString.substring(3);
            } else if (["AM:","SM:","KM:","KE:","KA:"].includes(lineVersion)) {
                outString = "";
            };
            break;
        case 'SM':
            if (["AM:","SM:","SA:"].includes(lineVersion)) {
                outString = outString.substring(3);
            } else if (["AE:","SE:","KM:","KE:","KA:"].includes(lineVersion)) {
                outString = "";
            };
            break;
        case 'SP':
            if (["AE:","SE:","SA:"].includes(lineVersion)) {
                outString = outString.substring(3);
            } else if (["AM:","SM:"].includes(lineVersion)) {
                outString = '<span style="color: #800000;">' + outString.substring(3) + '</span>'
            } else if (["KM:","KE:","KA:"].includes(lineVersion)) {
                outString = "";
            };
            break;
        case 'KE':
            if (["AE:","KE:","KA:"].includes(lineVersion)) {
                outString = outString.substring(3);
            } else if (["AM:","KM:","SM:","SE:","SA:"].includes(lineVersion)) {
                outString = "";
            };
            break;
        case 'KM':
            if (["AM:","KM:","KA:"].includes(lineVersion)) {
                outString = outString.substring(3);
            } else if (["AE:","KE:","SM:","SE:","SA:"].includes(lineVersion)) {
                outString = "";
            };
            break;
        case 'KP':
            if (["AE:","KE:","KA:"].includes(lineVersion)) {
                outString = outString.substring(3);
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

