/*
  Copyright 2019 psvenk
  This file is part of AgendaCreator.

  AgendaCreator is free/libre and open-source software: you can redistribute it
  and/or modify it under the terms of the Apache License, Version 2.0 or any
  later version, or the Mozilla Public License, Version 2.0 or any later version.
  See file `COPYING` for more details.

  Unless otherwise specified, all parts of this file carry the same license as
  the license for the entire file.

  SPDX-License-Identifier: Apache-2.0+ OR MPL-2.0+
*/
"use strict";
/**
 * Converts a string with HTML entities to a string with Unicode characters.
 * e.g. "&amp;" -> "&"
 *
 * @param {string} encodedString: The string with HTML entities
 *
 * @author Mark Amery at <https://stackoverflow.com/a/1395954/>
 * 		modified slightly by psvenk to include TypeScript type annotations
 * @license CC-BY-SA-3.0
 *
 * License note: See <https://legalict.com/?p=1209> and
 * <https://meta.stackexchange.com/a/12528> for explanations of how it is known
 * that this code is under this license. I believe that the inclusion of this
 * short snippet does not make AgendaCreator a derivative work of this snippet
 * of code, so I feel that I am within my legal rights to include this
 * CC-BY-SA-licensed snippet in my Apache- and MPL-licensed code. However, if
 * you take this code, modify it to make it something more than a short snippet,
 * and use it in your own project, it will carry the CC-BY-SA 3.0 license as it
 * will be a derivative work of this code snippet.
 */
function decodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
}
var InputOrOutput = { "input": true, "output": false };
/**
 * Draws a table with the elements of `daysInWeek` as column headers and
 * the elements of `classes` as row headers.
 *
 * @param {string[]} daysInWeek: An array containing the column headers for
 * 		the table
 * @param {HTMLTableElement} table: The table element to write to (this can
 * 		be obtained from document.getElementById(...),
 * 		document.getElementsByTagName(...), etc.)
 * @param {boolean} inputOrOutput: Either InputOrOutput.input or
 * 		InputOrOutput.output, depending on whether `table` is the input table
 * 		or the output table.
 * @param {string[]} classes: An array containing the row headers for the table,
 * 		if inputOrOutput == InputOrOutput.output, or the default values of the
 * 		<input> tags in the table, if inputOrOutput == InputOrOutput.input.
 * @param {number} numClasses: The number of <input>s to include, if
 * 		inputOrOutput == InputOrOutput.input.
 *
 * precondition: `table` is in the DOM
 *
 * postcondition: the contents of `table` will be erased before the new
 * 		data are added
 *
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+ OR MIT
 */
function drawTable(daysInWeek, table, inputOrOutput, classes, numClasses) {
    if (classes === void 0) { classes = []; }
    if (numClasses === void 0) { numClasses = 4; }
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
            currentTh.textContent = daysInWeek[col - 1];
            theadTr.appendChild(currentTh);
        })();
    // Populate header
    (function () {
        if (inputOrOutput == InputOrOutput.output)
            for (var row = 1; row <= classes.length; row++) {
                var tr = document.createElement("tr");
                tbody.appendChild(tr);
                // Create a row and add it to the <tbody>
                tr.appendChild(document.createElement("td")).textContent =
                    classes[row - 1];
                // Add the name of the current class in the leftmost position
                for (var col = 1; col <= daysInWeek.length; col++) {
                    tr.appendChild(document.createElement("td"));
                }
                // Create remaining cells
            }
        else // if (inputOrOutput == InputOrOutput.input)
            for (var row = 1, maxRows = numClasses + 1; row <= maxRows; row++) {
                var tr = document.createElement("tr");
                tbody.appendChild(tr);
                // Create a row and add it to the <tbody>
                if (row != maxRows) {
                    var input = document.createElement("input");
                    if (typeof classes[row - 1] != "undefined" &&
                        classes.length > 0)
                        input.value = classes[row - 1];
                    tr.appendChild(document.createElement("td")).appendChild(input);
                    // Add a cell with an <input> in the leftmost position
                }
                else {
                    // If last row
                    var button = document.createElement("input");
                    button.type = "button";
                    button.value = decodeEntities("Add more&hellip;");
                    button.id = "addMore";
                    /* Create an <input> and set it to be a button with the text
                       "Add more..." */
                    tr.appendChild(document.createElement("td"))
                        .appendChild(button);
                    // Add the button in the leftmost position
                    button.addEventListener("click", function () {
                        var numRowsToAdd = parseInt(prompt("How many rows would you like to add?"));
                        var numRowsExisting = inputTable.getElementsByTagName("tr").length - 2;
                        /* Get number of rows already in table, subtract two to
                           exclude header row and "Add more..." button */
                        var totalRows = numRowsExisting + numRowsToAdd;
                        drawTable(daysInWeek, inputTable, InputOrOutput.input, readClasses(), totalRows);
                    });
                    // Add event listener for "Add more..." button
                }
                for (var col = 1; col <= daysInWeek.length; col++) {
                    tr.appendChild(document.createElement("td"));
                }
                // Create remaining cells
            }
    })();
    // Create more rows and populate them
}
var daysInWeek = ["Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday"];
var inputTable = document.getElementById("inputTable");
// Get reference to <table> and store it in variable `table`
drawTable(daysInWeek, inputTable, InputOrOutput.input);
var outputTable = document.getElementById("outputTable");
/**
 * This method takes a comma-delimited list in a string (with "\," for a literal
 * comma) and sets the days of the week to the days given in the list.
 *
 * @param {string} daysRaw: The comma-delimited list to parse
 *
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+ OR MIT
 */
function setCustomDays(daysRaw) {
    var days = daysRaw.match(/(\\.|[^,])+/g);
    /*
      Split daysRaw into strings, with the comma as a delimiter,
      but does not split when "\," is encountered
      https://stackoverflow.com/questions/14333706/how-can-i-use-javascript-split-method-using-escape-character
    */
    for (var i = 0; i < days.length; i++) {
        days[i] = days[i].replace(/^\s+|\s+$/gm, "")
            .replace(/\\,/g, ",");
        /*
          First line: Trim leading and trailing whitespace so that
          "a,b" and "a, b" are treated the same way
          
          Equivalent to days[i].trim(), but with better browser
          support
          
          https://www.w3schools.com/jsref/jsref_trim_string.asp
          
          Second line: Replace all occurences of "\," with ","
        */
    }
    daysInWeek = days;
    drawTable(daysInWeek, inputTable, InputOrOutput.input, readClasses(), inputTable.getElementsByTagName("tr").length - 2);
    document.getElementById("customDays").value =
        daysRaw;
}
/**
 * This function converts a string array into a comma-delimited list in a string
 * (with "\," for a literal comma), optionally using the days of the week
 * currently displayed. The output of this function should be suitable input
 * for setCustomDays().
 *
 * @param {string[]} days: The string array to use. If none is given, the global
 * 		variable `daysInWeek` is used.
 *
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+
 */
function getCustomDays(days) {
    if (typeof days == "undefined" || days.length == 0)
        days = daysInWeek;
    var output = "";
    for (var i = 0; i < days.length; i++) {
        output += days[i].replace(/,/g, "\\,");
        if (i != days.length - 1)
            output += ", ";
    }
    return output;
}
/**
 * This is the event listener for the dropdown to choose the days in the week.
 *
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+
 */
document.getElementById("daysInWeek").addEventListener("click", function () {
    switch (this.value) {
        case "5": {
            daysInWeek = ["Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday"];
            drawTable(daysInWeek, inputTable, InputOrOutput.input, readClasses(), inputTable.getElementsByTagName("tr").length - 2);
            /* Get number of rows already in table, subtract two to exclude
               header row and "Add more..." button */
            document.getElementById("customDays_more").style.display =
                "none";
            break;
        }
        case "7": {
            daysInWeek = ["Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday", "Sunday"];
            drawTable(daysInWeek, inputTable, InputOrOutput.input, readClasses(), inputTable.getElementsByTagName("tr").length - 2);
            document.getElementById("customDays_more").style.display =
                "none";
            break;
        }
        default: {
            setCustomDays(prompt("List the days in the week that you want to include (put " +
                "commas between the days, and type \"\\,\" without " +
                "the quotation marks to insert a literal comma): "));
            document.getElementById("customDays_more").style.display =
                "inline-block";
            break;
        }
    }
});
document.getElementById("setCustomDays").addEventListener("click", function () {
    setCustomDays(document.getElementById("customDays").value);
});
/**
 * Reads the names of classes entered into the <input> fields in the input
 * table, and returns them in an array.
 *
 * @return {string[]} An array consisting of all of the values in the input
 * 		fields
 *
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+ OR MIT
 */
function readClasses() {
    var classes = new Array();
    var rows = inputTable.getElementsByTagName("tr");
    for (var i = 1; i < rows.length - 1; i++) {
        var input = rows[i].getElementsByTagName("td")[0]
            .getElementsByTagName("input")[0];
        classes.push(input.value);
    }
    // i is initially 1 so that the header row is ignored, and stops
    // at the penultimate row so that the "Add more..." button is ignored.
    return classes;
}
/**
 * Removes all blank and undefined elements from a string array. This function
 * acts on the array passed as an argument, so clone your array if you would
 * like to keep the original.
 *
 * @param {string[]} arr: The array to modify
 * @return {string[]} The modified array
 *
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+ OR MIT
 */
function trimArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (typeof arr[i] == "undefined" || arr[i] == "") {
            arr.splice(i, 1);
            i--;
        }
        /* If an element in array is blank or undefined, remove it and
           go back in case there are consecutive blank elements */
    }
    return arr;
}
/**
 * This is the event listener for the "Generate output" button.
 *
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+ OR MIT
 */
document.getElementById("generate").addEventListener("click", function () {
    var classes = readClasses();
    trimArray(classes);
    if (typeof classes != "undefined" && classes.length > 0)
        drawTable(daysInWeek, outputTable, InputOrOutput.output, classes);
    else
        outputTable.innerHTML = "";
});
/**
 * This method stores in a JSON string the data that the user entered into
 * AgendaCreator, so that the data can be exported as a JSON file.
 *
 * @return {string} The serialized JSON string
 *
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+
 */
function serialize() {
    var obj = {};
    obj.version = "0.1.3";
    // The Node.js build script will change "0.1.3" to the current version
    obj.classes = readClasses();
    obj.daysInWeek = daysInWeek;
    return JSON.stringify(obj); // TODO: Add JSON polyfill
}
// TODO: document this method (JSDoc)
// TODO: check if object contains all required elements
/**
 * This method reads from a JSON string and applies the user settings defined
 * in the JSON.
 *
 * @param {string} JsonInput: The string to read from
 *
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+
 */
function deserialize(JsonInput) {
    var obj = JSON.parse(JsonInput);
    daysInWeek = obj.daysInWeek;
    drawTable(daysInWeek, inputTable, InputOrOutput.input, obj.classes, obj.classes.length);
    if (obj.daysInWeek === ["Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday"]) {
        document.getElementById("daysInWeek").value = "5";
        document.getElementById("customDays_more").style.display = "none";
    }
    else if (obj.daysInWeek === ["Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday"]) {
        document.getElementById("daysInWeek").value = "7";
        document.getElementById("customDays_more").style.display = "none";
    }
    else {
        document.getElementById("daysInWeek").value =
            "custom";
        document.getElementById("customDays_more").style.display =
            "inline-block";
        document.getElementById("customDays").value =
            getCustomDays();
    }
}
/**
 * This is the event listener for the "Export JSON" button.
 *
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+
 */
document.getElementById("export").addEventListener("click", function () {
    var export_more = document.getElementById("export_more");
    export_more.style.display =
        export_more.style.display == "none" ? "block" : "none";
    document.getElementById("export_output").value = serialize();
});
/**
 * This is the event listener for the "Download JSON" button (only visible after
 * "Export JSON" is clicked).
 *
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+
 */
document.getElementById("export_download").addEventListener("click", function () {
    var blob = new Blob([serialize()], { type: "application/json;charset=utf-8" });
    saveAs(blob, "agenda.json");
});
/**
 * This is the event listener for the "Import JSON" button.
 *
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+
 */
document.getElementById("import").addEventListener("click", function () {
    var import_more = document.getElementById("import_more");
    import_more.style.display =
        import_more.style.display == "none" ? "inline" : "none";
});
/**
 * This is the event listener for the "Import" button beside the textarea
 * visible after "Import JSON" is clicked.
 *
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+
 */
document.getElementById("import_submit").addEventListener("click", function () {
    deserialize(document.getElementById("import_input").value);
});
/**
 * This is the event listener for the "Upload" button (only visible after
 * "Import JSON" is clicked).
 *
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+
 */
document.getElementById("import_upload").addEventListener("click", function () {
    var file = document.getElementById("import_filepicker").files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.addEventListener("load", function () {
        deserialize(reader.result);
        // TODO: change to "load" event, see FileReader on MDN
    });
});
