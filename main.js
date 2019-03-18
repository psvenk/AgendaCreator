/*
Copyright 2019 psvenk
This file is part of AgendaCreator.

AgendaCreator is free/libre software: you can redistribute it and/or modify it
under the terms of the MIT/Expat License.

You should have received a copy of the MIT/Expat License
along with AgendaCreator. If not, see <https://opensource.org/licenses/MIT>.
*/
"use strict";
function decodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
}
/* Convert HTML-encoded string to string with Unicode characters,
   e.g. "&amp;" -> "&"
   https://stackoverflow.com/a/1395954/
*/
function drawTable(daysInWeek, table) {
    table.innerHTML = "";
    // Clear table
    var thead = document.createElement("thead");
    var theadTr = document.createElement("tr");
    var tbody = document.createElement("tbody");
    // Create <thead> and <tbody>, and the <tr> that will be placed in <thead>
    table.appendChild(thead);
    thead.appendChild(theadTr);
    table.appendChild(tbody);
    theadTr.appendChild(document.createElement("td"));
    // Add a blank cell to the leftmost position
    for (var col = 1; col <= daysInWeek.length; col++)
        (function () {
            /* IIFE (http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
               to limit scope */
            var currentTh = document.createElement("th");
            currentTh.innerHTML = daysInWeek[col - 1];
            theadTr.appendChild(currentTh);
        })();
    // Populate header
    (function () {
        var maxRows = 5;
        for (var row = 1; row <= maxRows; row++) {
            var tr = document.createElement("tr");
            tbody.appendChild(tr);
            // Create a row and add it to the <tbody>
            if (row != maxRows) {
                tr.appendChild(document.createElement("td")).appendChild(document.createElement("input"));
                // Add a cell with an <input> in the leftmost position
                // TODO store the <input>s in an array so that their values can be used
            }
            else {
                // If last row
                var button = document.createElement("input");
                button.type = "button";
                button.value = decodeEntities("Add more&hellip;");
                button.id = "addMore";
                /* Create an <input> and set it to be a button with the text
                   "Add more..." */
                tr.appendChild(document.createElement("td")).appendChild(button);
                // Add the button in the leftmost position
            }
            for (var col = 1; col <= daysInWeek.length; col++) {
                tr.appendChild(document.createElement("td"));
            }
            // Create remaining cells
        }
    })();
    // Create more rows and populate them
}
var daysInWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
var table = document.getElementsByTagName("table")[0];
// Get reference to <table> and store it in variable `table`
drawTable(daysInWeek, table);
document.getElementById("daysInWeek").addEventListener("click", function () {
    switch (this.value) {
        case "5": {
            daysInWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            drawTable(daysInWeek, table);
            break;
        }
        case "7": {
            daysInWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            drawTable(daysInWeek, table);
            break;
        }
        default: {
            var daysRaw = prompt("List the days in the week that you want to include (put commas between the days, and type \"\\,\" without the quotation marks to insert a literal comma): ");
            var days = daysRaw.match(/(\\.|[^,])+/g);
            // Split daysRaw into strings, with the comma as a delimiter, but does not split when it encounters "\,"
            // https://stackoverflow.com/questions/14333706/how-can-i-use-javascript-split-method-using-escape-character
            for (var i = 0; i < days.length; i++) {
                days[i] = days[i].replace(/^\s+|\s+$/gm, "").replace(/\\,/g, ",");
                //                Trim leading and trailing whitespace so that "a,b" and "a, b" are treated the same way
                //                Equivalent to days[i].trim(), but with better browser support
                //                https://www.w3schools.com/jsref/jsref_trim_string.asp
                //
                //                                          Replace all occurences of "\," with ","
            }
            daysInWeek = days;
            drawTable(daysInWeek, table);
            break;
        }
    }
});
