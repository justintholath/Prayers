
var display_chapter = 1;

function formatCom(inString) {
    var outString = ''
    if (inString.substring(0, 2) == "- ") {
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
        const line = lines[line_i]; // The current line
        const hdr_chk = line.substring(0, 3);
        if (hdr_chk == "h1:") {
            h1_count += 1;
            hdr_name = line.substring(3);
            if (h1_count != 1) {toc += '<br>'};
            toc += '<span onclick="GoToChapter(' +  h1_count + ')" style="cursor: pointer; color: blue; text-decoration: none; font-size: 16px;">'
            toc += hdr_name + '</span><br>';
            h2_count = 0;
            continue;
        };
        if (hdr_chk == "h2:") {
            h2_count += 1;
            toc += '&emsp; &emsp; <span style="font-size: 14px;">' + line.substring(3) + '</span><br>';
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

    var col_lines = "";
    let table_found = 0;

    for (let line_i = 0; line_i < (lines.length - 1); line_i++) {
        const line = lines[line_i]; // The current line
        if (table_found > 0) {
            if (line.includes(" ||")) {
                table_found = 2
            } else {
                page_build += '</table>'
                table_found = 0
            };
        };
        const hdr_chk = line.substring(0, 3);
        if (hdr_chk == "h1:") {
            h1_count += 1;
            hdr_name = line.substring(3);
            page_build += '<h1 id="' + 'S' + h1_count + '">' + hdr_name + '</h1>';
            continue;
        };
        switch (hdr_chk) {
        case "===":
            break;
        case "ts:":
            page_build += '<table style="border: none; border-collapse: collapse;">';
            table_found = 1;
            break;
        case "te:":
            page_build += '</table>';
            table_found = 0;
            break;
        case "h2:":
            page_build += '<h2>' + line.substring(3) + '</h2>';
            break;
        case "h3:":
            page_build += '<h3>' + formatStr(line.substring(3)) + '</h3>'
            break;
        case "h4:":
            page_build += '<h4>' + formatStr(line.substring(3)) + '</h4>'
            break;
        case "h5:":
            page_build += '<h5>' + formatStr(line.substring(3)) + '</h5>'
            break;
        case "hr:":
            page_build += '<hr style="height: 1px; background-color: grey; border: none; margin-top: 0px; margin-bottom: 0px;">'
            break;
        case "ip:":
            page_build += '<p style="margin-left: 18px;";>' + formatStr(line.substring(3)) + '</p>'
            break;
        case "iq:":
            page_build += '<p style="margin-left: 36px;";>' + formatStr(line.substring(3)) + '</p>'
            break;
        default:
            if (line.trim() == '') {
                page_build += '<div style="height: 5px;"></div>';
            }
            else {
                if (line.includes(" ||")) {
                    col_lines = line.split(" ||");
                    page_build += '<tr>';
                    for (const each_col of col_lines){
                        page_build += '<td style="border: none">' + formatCom(each_col) + '</td>'
                    };
                    page_build += '</tr>'
                    continue;
                }
                else {
                    tmpStr = formatStr(line);
                    if (tmpStr != "") {
                    tmpStr = tmpStr + '<br>';
                    };
                    page_build += tmpStr;
                };
            };
        };
    };

    page_build += '<span onclick="window.scrollTo(0, 0)" style="cursor: pointer; color: blue; text-decoration: none; font-size: 18px; font-weight: bold;">[Back to Top]</span>';

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

function GoToChapter(inVal) {
    display_chapter = inVal;
    convertMarkdown()
    const verseElement = document.getElementById("S" + inVal);

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


