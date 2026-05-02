
var display_chapter = 1;

function formatCom(inString) {
    var outString = ''
    if (inString.slice(0, 2) == "- ") {
        outString = '&bull;' + inString.substring(1)
    }
    else {
        outString = inString
    };
    if (outString.includes("~a href") && outString.includes("~/a~")) {
        outString = outString.replace("~a href","<a href").replace("~",">").replace("~/a~","</a>")
    }
    while (outString.includes("~b~")) {
        outString = outString.replace("~b~","<b>")
        if (outString.includes("~b~")) {
            outString = outString.replace("~b~","</b>")
        } else {
            outString += "</b>"
        }
    };
    if (outString.includes("~r~")) {
        outString = outString.replace("~r~",'<span style="float: right;">')
        outString += "</span>"
    }
    if (outString.includes("~c~")) {
        outString = outString.replace("~c~",'<div style="text-align: center;">')
        outString += "</div>"
    }
    while (outString.includes("~i~")) {
        outString = outString.replace("~i~","<i>")
        if (outString.includes("~i~")) {
            outString = outString.replace("~i~","</i>")
        } else {
            outString += "</i>"
        }
    }
    while (outString.includes("~u~")) {
        outString = outString.replace("~u~","<u>")
        if (outString.includes("~u~")) {
            outString = outString.replace("~u~","</u>")
        } else {
            outString += "</u>"
        }
    }
    while (outString.includes("~m~")) {
        outString = outString.replace("~m~","<mark>")
        if (outString.includes("~m~")) {
            outString = outString.replace("~m~","</mark>")
        } else {
            outString += "</mark>"
        }
    }
    return outString
};


/**
 * Converts basic Markdown (headers, lists, and paragraphs) to HTML using pure JavaScript.
 * This function manually handles nested lists based on simple indentation (4 spaces).
 */
function markdown_2_toc(markdown) {
    const lines = (markdown + "\n").split('\n');
    let toc = ""
    toc += '<div class="container">';

    toc += '<br><div style="text-align: right;">';
    toc += '<span onclick="window.location.href=\'../index.html\';" style="cursor: pointer; color: blue; text-decoration: none; font-weight: bold;">';
    toc += "Go back to Home Page";
    toc += "</span></div>";

    toc += '<h1>' + document.title + " " + season + '</h1>';
    toc += '<h2>Table of Contents</h2>'

    let h1_count = 0;
    let h2_count = 0;

    for (let line_i = 0; line_i < (lines.length - 1); line_i++) {
        const line = lines[line_i].trim(); // The current line
        const hdr_chk = line.slice(0, 3);
        const remStr = line.slice(3);
        if (hdr_chk == "h1:") {
            h1_count += 1;
            if (h1_count != 1) {toc += '<br>'};
            chapStr = "S" + h1_count;
            toc += '<span onclick="GoToChapter(\'' +  chapStr + '\')" style="cursor: pointer; color: blue; text-decoration: none; font-size: 16px;">'
            toc += remStr + '</span><br>';
            continue;
        } else if (hdr_chk == "h2:") {
            h2_count += 1;
            chapStr = "S" + h1_count + "C" + h2_count;
            toc += '&emsp; &emsp;';
            toc += '<span onclick="GoToChapter(\'' +  chapStr + '\')" style="cursor: pointer; color: saddlebrown; text-decoration: none; font-size: 14px;">'
            toc += remStr + '</span><br>';
        };
    };
    toc += '</div>';
    return toc;
};

function markdown_2_page(markdown) {
    const lines = (markdown + "\n").split('\n');
    let html = '';
    let page_build = '';
    let tmpStr = '';

    let h1_count = 0;
    let h2_count = 0;

    var col_lines = "";
    let table_found = 0;

    for (let line_i = 0; line_i < (lines.length - 1); line_i++) {
        const line = lines[line_i].trim(); // The current line
        const hdr_chk = line.slice(0, 3);
        const remStr = line.slice(3);
        page_build += "\n"
        switch (hdr_chk) {
        case "===":
            break;
        case "h1:":
            h1_count += 1;
            if (h1_count != 1) {
                page_build += '<br><span onclick="window.scrollTo(0, 0)" style="cursor: pointer; color: blue; text-decoration: none; font-size: 16px; font-weight: bold;">[Back to Top]</span>';
            }
            page_build += '<h1 id="' + 'S' + h1_count + '">' + remStr + '</h1>';
            break;
        case "h2:":
            h2_count += 1;
            page_build += '<h2 id="' + 'S' + h1_count + 'C' + h2_count + '">' + remStr + '</h2>';
            break;
        case "h3:":
            var retStr = formatStr(remStr);
            if (retStr != "") {
                page_build += '<h3>' + retStr + '</h3>'
            };
            break;
        case "h4:":
            var retStr = formatStr(remStr);
            if (retStr != "") {
                page_build += '<h4>' + retStr + '</h4>'
            };
            break;
        case "h5:":
            var retStr = formatStr(remStr);
            if (retStr != "") {
                page_build += '<h5>' + retStr + '</h5>'
            };
            break;
        case "hr:":
            page_build += '<hr style="height: 1px; background-color: grey; border: none; margin-top: 0px; margin-bottom: 0px;">'
            break;
        case "ip:":
            var retStr = formatStr(remStr);
            if (retStr != "") {
                page_build += '<p style="margin-left: 18px;";>' + retStr + '</p>';
            };
            break;
        case "iq:":
            var retStr = formatStr(remStr);
            if (retStr != "") {
                page_build += '<p style="margin-left: 36px;";>' + retStr + '</p>';
            };
            break;
        default:
            var retStr = formatStr(line);
            // page_build += retStr;
            if (retStr == "*") {
                page_build += '<div style="height: 10px;"></div>';
            } else if (retStr != "") {
                page_build += formatStr(line) + '<br>';
            };
        };
    };

    page_build += '<br><span onclick="window.scrollTo(0, 0)" style="cursor: pointer; color: blue; text-decoration: none; font-size: 18px; font-weight: bold;">[Back to Top]</span>';

    page_build  += '<br><br>';
    page_build += '<span onclick="window.location.href=\'../index.html\';" style="cursor: pointer; color: blue; text-decoration: none; font-size: 18px; font-weight: bold;">';
    page_build += "[Go back to Home Page]";
    page_build += "</span><br><br><br><br>";

    html += '<div class="container">' + page_build + '</div>';
    return html;
};

const markdownInput = document.getElementById('markdown-input');
const html_toc = document.getElementById('html-toc');
const html_page = document.getElementById('html-page');

/**
 * Main function to trigger conversion on input.
 */
function convertMarkdown() {
    setLang();

    const markdownText = markdownInput.value;
    try {
        var html_ret = markdown_2_toc(markdownText);
        html_toc.innerHTML = html_ret;
    } catch (error) {
        html_toc.innerHTML = `<p>Error in Native Conversion:</p><pre>${error.message}</pre>`;
        console.error("Native Markdown conversion failed:", error);
    };
    try {
        var html_ret = markdown_2_page(markdownText);
        html_page.innerHTML = html_ret;
    } catch (error) {
        html_page.innerHTML = `<p>Error in Native Conversion:</p><pre>${error.message}</pre>`;
        console.error("Native Markdown conversion failed:", error);
    };
}

function GoToChapter(chapStr) {
    convertMarkdown()
    const verseElement = document.getElementById(chapStr);

    if (verseElement) {
        const elementPosition = verseElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth" // Optional: makes it slide nicely
        });
    }
};


// Run the conversion once on load to populate the initial example text
window.onload = convertMarkdown;
document.getElementById("html-toc").style.display = 'block';
document.getElementById("html-page").style.display = 'block';
markdownInput.style.display = 'none'


