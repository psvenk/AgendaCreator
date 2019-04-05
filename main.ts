/*
Copyright 2019 psvenk
This file is part of AgendaCreator.

AgendaCreator is free/libre and open-source software: you can redistribute it
and/or modify it under the terms of the Apache License, Version 2.0 or any
later version, or the Mozilla Public License, Version 2.0 or any later version.
See file `COPYING` for more details.

SPDX-License-Identifier: Apache-2.0+ OR MPL-2.0+
*/

"use strict";

/**
 * Converts a string with HTML entities to a string with Unicode characters.
 * e.g. "&amp;" -> "&"
 * 
 * @param encodedString: The string with HTML entities
 * 
 * @author lucascaro at <https://stackoverflow.com/a/1395954/>
*/
function decodeEntities(encodedString: string): string {
	var textArea: HTMLTextAreaElement = document.createElement('textarea');
	textArea.innerHTML = encodedString;
	return textArea.value;
}

var InputOrOutput = {"input": true, "output": false};

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
 */
function drawTable(daysInWeek: string[], table: HTMLTableElement,
		inputOrOutput: boolean, classes: string[] = [],
		numClasses: number = 4): void {
	
	table.innerHTML = "";
	// Clear table
	
	var thead: HTMLTableSectionElement = document.createElement("thead");
	var theadTr: HTMLTableRowElement = document.createElement("tr");
	var tbody: HTMLTableSectionElement = document.createElement("tbody");
	// Create <thead> and <tbody>, and the <tr> that will be placed in <thead>
	
	table.appendChild(thead);
	thead.appendChild(theadTr);
	table.appendChild(tbody);
	
	theadTr.appendChild(document.createElement("td"));
	// Add a blank cell to the leftmost position
	
	for (var col: number = 1; col <= daysInWeek.length; col++) (function() {
		/* IIFE (http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
		   to limit scope */

		var currentTh: HTMLTableHeaderCellElement =
				document.createElement("th");
		currentTh.innerHTML = daysInWeek[col - 1];
		theadTr.appendChild(currentTh);
	})();
	// Populate header
	(function(): void {
		
		if (inputOrOutput === InputOrOutput.output)
		for (var row: number = 1; row <= classes.length; row++) {
			var tr: HTMLTableRowElement = document.createElement("tr");
			tbody.appendChild(tr);
			// Create a row and add it to the <tbody>
			
			tr.appendChild(document.createElement("td")).innerHTML =
					classes[row - 1];
			// Add the name of the current class in the leftmost position
			
			for (var col: number = 1; col <= daysInWeek.length; col++) {
				tr.appendChild(document.createElement("td"));
			}
			// Create remaining cells
		}
		
		else // if (inputOrOutput === InputOrOutput.input)
		for (var row: number = 1, maxRows: number = numClasses + 1;
				row <= maxRows; row++) {
			var tr: HTMLTableRowElement = document.createElement("tr");
			tbody.appendChild(tr);
			// Create a row and add it to the <tbody>
			
			if (row != maxRows) {
				var input: HTMLInputElement = document.createElement("input");
				
				if (typeof classes[row - 1] !== "undefined" && classes.length > 0)
					input.value = classes[row - 1];
				
				tr.appendChild(document.createElement("td")).appendChild(input);
				// Add a cell with an <input> in the leftmost position
			} else {
				// If last row

				var button: HTMLInputElement = document.createElement("input");
				button.type = "button";
				button.value = decodeEntities("Add more&hellip;");
				button.id = "addMore";
				/* Create an <input> and set it to be a button with the text
				   "Add more..." */

				tr.appendChild(document.createElement("td"))
						.appendChild(button);
				// Add the button in the leftmost position
				
				button.addEventListener("click", function(): void {
					var numRowsToAdd: number = parseInt(
						prompt("How many rows would you like to add?"));
					var numRowsExisting: number =
						inputTable.getElementsByTagName("tr").length - 2;
					/* Get number of rows already in table, subtract two to
					   exclude header row and "Add more..." button */
					var totalRows: number = numRowsExisting + numRowsToAdd;
					
					drawTable(daysInWeek, inputTable, InputOrOutput.input,
							  readClasses(), totalRows);
				});
				// Add event listener for "Add more..." button
			}
			
			for (var col: number = 1; col <= daysInWeek.length; col++) {
				tr.appendChild(document.createElement("td"));
			}
			// Create remaining cells
		}
	})();
	// Create more rows and populate them
}

var daysInWeek: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday",
		"Friday"];

var inputTable: HTMLTableElement = document.getElementById("inputTable") as
		HTMLTableElement;
// Get reference to <table> and store it in variable `table`

drawTable(daysInWeek, inputTable, InputOrOutput.input);

var outputTable: HTMLTableElement = document.getElementById("outputTable") as
		HTMLTableElement;

document.getElementById("daysInWeek").addEventListener("click",
		function(): void {
	switch ((this as HTMLInputElement).value) {
	case "5": {
		daysInWeek = ["Monday", "Tuesday", "Wednesday", "Thursday",
				"Friday"];
		drawTable(daysInWeek, inputTable, InputOrOutput.input, readClasses(),
				inputTable.getElementsByTagName("tr").length - 2);
				/* Get number of rows already in table, subtract two to exclude
				   header row and "Add more..." button */
		break;
	}
	case "7": {
		daysInWeek = ["Monday", "Tuesday", "Wednesday", "Thursday",
				"Friday", "Saturday", "Sunday"];
		drawTable(daysInWeek, inputTable, InputOrOutput.input, readClasses(),
				inputTable.getElementsByTagName("tr").length - 2);
		break;
	}
	default: {
		var daysRaw: string = prompt("List the days in the week that " +
				"you want to include (put commas between the days, and " +
				"type \"\\,\" without the quotation marks to insert a " +
				"literal comma): ");
		
		var days: string[] = daysRaw.match(/(\\.|[^,])+/g);
		/*
			Split daysRaw into strings, with the comma as a delimiter,
			but does not split when "\," is encountered
			https://stackoverflow.com/questions/14333706/how-can-i-use-javascript-split-method-using-escape-character
		*/
		for (var i = 0; i < days.length; i++) {
			days[i] = days[i].replace(/^\s+|\s+$/gm,"")
						.replace(/\\,/g, ",");
			/*
			First line: Trim leading and trailing whitespace so that
			"a,b" and "a, b" are treated the same way
			
			Equivalent to days[i].trim(), but with better browser support
			https://www.w3schools.com/jsref/jsref_trim_string.asp
			
			Second line: Replace all occurences of "\," with ","
			*/
		}
		
		daysInWeek = days;
		
		drawTable(daysInWeek, inputTable, InputOrOutput.input, readClasses(),
				inputTable.getElementsByTagName("tr").length - 2);
		
		break;
	}
	}
});

/**
 * Reads the names of classes entered into the <input> fields in the input
 * table, and returns them in an array.
 * 
 * @return {string[]} An array consisting of all of the values in the input
 * 		fields
 * 
 * @author psvenk
 */
function readClasses(): string[] {
	var classes: string[] = new Array();
	var rows: HTMLCollectionOf<HTMLTableRowElement> =
			inputTable.getElementsByTagName("tr");
	for (var i = 1; i < rows.length - 1; i++) {
		var input: HTMLInputElement = rows[i].getElementsByTagName("td")[0]
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
 */
function trimArray(arr: string[]): string[] {
	for (var i = 0; i < arr.length; i++) {
		if (typeof arr[i] === "undefined" || arr[i] === "") {
			arr.splice(i, 1);
			i--;
		}
		/* If an element in array is blank or undefined, remove it and
		go back in case there are consecutive blank elements */
	}
	return arr;
}

document.getElementById("generate").addEventListener("click",
		function(): void {
	var classes: string[] = readClasses();
	trimArray(classes);
	
	if (typeof classes !== "undefined" && classes.length > 0)
		drawTable(daysInWeek, outputTable, InputOrOutput.output, classes);
	else
		outputTable.innerHTML = "";
});
