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
function decodeEntities(encodedString: string): string {
	var textArea: HTMLTextAreaElement = document.createElement('textarea');
	textArea.innerHTML = encodedString;
	return textArea.value;
}

const InputOrOutput: any = {"input": true, "output": false};

const DaysInWeek: any = {
	"5": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
	"7": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
	      "Sunday"]
};

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
 * @param {string[]} [classes]: An array containing the row headers for the
 * 		table, if inputOrOutput == InputOrOutput.output, or the default values of
 * 		the <input> tags in the table, if inputOrOutput == InputOrOutput.input.
 * @param {number} [numClasses=4]: The number of <input>s to include, if
 * 		inputOrOutput == InputOrOutput.input.
 * @param {string[]} [dayDescs]: An array containing descriptions for each day,
 * 		to be included below the days of the week. The indices of this array
 * 		correspond to the indices in daysInWeek.
 * 
 * precondition: `table` is in the DOM
 * 
 * postcondition: the contents of `table` will be erased before the new
 * 		data are added
 * 
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+ OR MIT
 */
function drawTable(daysInWeek: string[], table: HTMLTableElement,
				   inputOrOutput: boolean, classes: string[] = [],
				   numClasses: number = 4, dayDescs: string[] = []): void {
	
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
	
	for (let col: number = 1; col <= daysInWeek.length; col++) (function() {
		var currentTh: HTMLTableHeaderCellElement =
			document.createElement("th");
		currentTh.textContent = daysInWeek[col - 1];
		theadTr.appendChild(currentTh);
	})();
	// Populate header
	
	(function(): void {
		// TODO: don't create tHeadTr2 for output if dayDescs is empty
		if (inputOrOutput == InputOrOutput.output) {
			if (typeof dayDescs != "undefined" &&
			    trimArray(cloneArray(dayDescs)).length > 0) {
				let theadTr2: HTMLTableRowElement = document.createElement("tr");
				thead.appendChild(theadTr2);
				theadTr2.appendChild(document.createElement("td"));
				// Add a blank cell to the leftmost position
				
				for (let col: number = 1; col <= daysInWeek.length; col++) {
					theadTr2.appendChild(document.createElement("th")).
						textContent = dayDescs[col - 1];
				}
			}

			for (let row: number = 1; row <= classes.length; row++) {
				let tr: HTMLTableRowElement = document.createElement("tr");
				tbody.appendChild(tr);
				// Create a row and add it to the <tbody>
				
				tr.appendChild(document.createElement("td")).textContent =
					classes[row - 1];
				// Add the name of the current class in the leftmost position
				
				for (let col: number = 1; col <= daysInWeek.length; col++) {
					tr.appendChild(document.createElement("td"));
				}
				// Create remaining cells
			}
		}
		else { // if (inputOrOutput == InputOrOutput.input)
			let theadTr2: HTMLTableRowElement = document.createElement("tr");
			thead.appendChild(theadTr2);
			theadTr2.appendChild(document.createElement("td"));
			// Add a blank cell to the leftmost position
			
			for (let col: number = 1; col <= daysInWeek.length; col++)
				(function() {
					let input: HTMLInputElement =
						document.createElement("input");

					if (typeof dayDescs[col - 1] != "undefined" &&
						dayDescs.length > 0)
						input.value = dayDescs[col - 1];

					theadTr2.appendChild(document.createElement("th")).
						appendChild(input);
				})();
			for (let row: number = 1, maxRows: number = numClasses + 1;
				 row <= maxRows; row++) {
				let tr: HTMLTableRowElement = document.createElement("tr");
				tbody.appendChild(tr);
				// Create a row and add it to the <tbody>
				
				if (row != maxRows) {
					let input: HTMLInputElement =
						document.createElement("input");
					
					if (typeof classes[row - 1] != "undefined" &&
						classes.length > 0)
						input.value = classes[row - 1];
					
					tr.appendChild(document.createElement("td")).appendChild(
						input
					);
					// Add a cell with an <input> in the leftmost position
				} else {
					// If last row

					let button: HTMLInputElement =
						document.createElement("input");
					button.type = "button";
					button.value = decodeEntities("Add more&hellip;");
					button.id = "addMore";
					/* Create an <input> and set it to be a button with the text
					   "Add more..." */

					tr.appendChild(document.createElement("td"))
						.appendChild(button);
					// Add the button in the leftmost position
					
					button.addEventListener("click", function(): void {
						let numRowsToAdd: number = parseInt(
							prompt("How many rows would you like to add?"));
						let numRowsExisting: number =
							inputTable.getElementsByTagName("tr").length - 2;
						/* Get number of rows already in table, subtract two to
						   exclude header row and "Add more..." button */
						let totalRows: number = numRowsExisting + numRowsToAdd;
						
						drawTable(daysInWeek, inputTable, InputOrOutput.input,
								  readClasses(), totalRows, readDayDescs());
					});
					// Add event listener for "Add more..." button
				}
				
				for (let col: number = 1; col <= daysInWeek.length; col++) {
					tr.appendChild(document.createElement("td"));
				}
				// Create remaining cells
			}
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

/**
 * This method takes a comma-delimited list in a string (with "\," for a literal
 * comma) and sets the days of the week to the days given in the list.
 * 
 * @param {string} daysRaw: The comma-delimited list to parse
 * 
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+ OR MIT
 */
function setCustomDays(daysRaw: string): void {
	var days: string[] = daysRaw.match(/(\\.|[^,])+/g);
	/*
	  Split daysRaw into strings, with the comma as a delimiter,
	  but does not split when "\," is encountered
	  https://stackoverflow.com/questions/14333706/how-can-i-use-javascript-split-method-using-escape-character
	*/
	for (let i = 0; i < days.length; i++) {
		days[i] = days[i].replace(/^\s+|\s+$/gm,"")
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
	drawTable(daysInWeek, inputTable, InputOrOutput.input,
	          readClasses(), inputTable.getElementsByTagName("tr").length - 3,
	          readDayDescs());
	(document.getElementById("customDays") as HTMLInputElement).value =
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
function getCustomDays(days ?: string[]): string {
	if (typeof days == "undefined" || days.length == 0) days = daysInWeek;
	var output: string = "";
	for (let i = 0; i < days.length; i++) {
		output += days[i].replace(/,/g, "\\,");
		if (i != days.length - 1) output += ", ";
	}
	return output;
}

/**
 * This is the event listener for the dropdown to choose the days in the week.
 * 
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+
 */
document.getElementById("daysInWeek").addEventListener(
	"click", function(): void {
		switch ((this as HTMLInputElement).value) {
			case "5": {
				daysInWeek = ["Monday", "Tuesday", "Wednesday", "Thursday",
							  "Friday"];
				drawTable(daysInWeek, inputTable, InputOrOutput.input,
						  readClasses(),
						  inputTable.getElementsByTagName("tr").length - 3,
				          readDayDescs());
				/* Get number of rows already in table, subtract three to exclude
				   header rows and "Add more..." button */
				document.getElementById("customDays_more").style.display =
					"none";
				break;
			}
			case "7": {
				daysInWeek = ["Monday", "Tuesday", "Wednesday", "Thursday",
							  "Friday", "Saturday", "Sunday"];
				drawTable(daysInWeek, inputTable, InputOrOutput.input,
						  readClasses(),
						  inputTable.getElementsByTagName("tr").length - 3,
				          readDayDescs());
				document.getElementById("customDays_more").style.display =
					"none";
				break;
			}
			default: {
				setCustomDays(prompt(
					"List the days in the week that you want to include (put " +
						"commas between the days, and type \"\\,\" without " +
						"the quotation marks to insert a literal comma): "));
				document.getElementById("customDays_more").style.display =
					"inline-block";
				break;
			}
		}
	}
);

document.getElementById("setCustomDays").addEventListener(
	"click", function(): void {
		setCustomDays((document.getElementById("customDays") as
		               HTMLInputElement).value);
	}
);

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
function readClasses(): string[] {
	var classes: string[] = new Array();
	var rows: HTMLCollectionOf<HTMLTableRowElement> =
		inputTable.getElementsByTagName("tr");
	for (let i = 2; i < rows.length - 1; i++) {
		var input: HTMLInputElement = rows[i].getElementsByTagName("td")[0]
			.getElementsByTagName("input")[0];
		classes.push(input.value);
	}
	// i is initially 1 so that the header row is ignored, and stops
	// at the penultimate row so that the "Add more..." button is ignored.
	
	return classes;
}

/**
 * Reads the day descriptions below the days of the week entered into the <input>
 * fields in the input table, and returns them in an array.
 * 
 * @return {string[]} An array consisting of all of the values in the input
 * 		fields
 * 
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+
 */
function readDayDescs(): string[] {
	var dayDescs: string[] = new Array();
	var inputs: HTMLCollectionOf<HTMLInputElement> =
		inputTable.getElementsByTagName("tr")[1].getElementsByTagName("input");
	for (let i: number = 0; i < inputs.length; i++) {
		let input: HTMLInputElement = inputs[i];
		dayDescs.push(input.value);
	}
	return dayDescs;
}

/**
 * Performs a shallow clone of an array.
 * 
 * @param {any[]} arr: The array to clone
 * @return {any[]} A clone of `arr`
 * 
 * @author psvenk
 * @license CC0-1.0 OR Apache-2.0+ OR MPL-2.0+
 */
function cloneArray(arr: any[]): any[] {
	var len: number = arr.length;
	var output: any[] = new Array(len);
	for (let i: number = 0; i < len; i++) {
		output[i] = arr[i];
	}
	return output;
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
function trimArray(arr: string[]): string[] {
	for (let i = 0; i < arr.length; i++) {
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
 * @license Apache-2.0+ OR MPL-2.0+
 */
document.getElementById("generate").addEventListener(
	"click", function(): void {
		document.getElementById("generate_more").style.display = "block";
		
		var classes: string[] = trimArray(readClasses());
		
		if (typeof classes != "undefined" && classes.length > 0) {
			drawTable(daysInWeek, outputTable, InputOrOutput.output, classes,
			          classes.length, readDayDescs());
		}
		else {
			outputTable.innerHTML = "";
		}
	}
);

/**
 * This is the event listener for the "Print" button.
 * 
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+
 */
/*document.getElementById("print").addEventListener("click", function(): void {
	let printWindow: Window = window.open("./index.html", "printwindow");
	printWindow.document.write();
	let rootEl: HTMLHtmlElement = printWindow.document.createElement("html");
	
	let head: HTMLHeadElement = printWindow.document.createElement("head");
	rootEl.appendChild(head);
	let cssLink: HTMLLinkElement = printWindow.document.createElement("link");
	cssLink.rel = "stylesheet";
	cssLink.type = "text/css";
	
	let body: HTMLBodyElement = printWindow.document.createElement("body");
	rootEl.appendChild(body);
	let table: HTMLTableElement = printWindow.document.createElement("table");
	table.innerHTML = outputTable.innerHTML;
	body.appendChild(table);
	
	//printWindow.document.close();
	printWindow.focus();
	printWindow.print();
	// printWindow.close();
	// https://stackoverflow.com/a/20101483/
	// https://stackoverflow.com/a/6040795/
});*/

document.getElementById("print").addEventListener("click", function(): void {
	window.print();
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
function serialize(): string {
	var obj: any = {};
	obj.version = "VERSION";
	// The Node.js build script will change "VERSION" to the current version
	obj.classes = readClasses();
	obj.daysInWeek = daysInWeek;
	obj.dayDescs = readDayDescs();
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
function deserialize(JsonInput: string): void {
	var obj: any = JSON.parse(JsonInput);
	daysInWeek = obj.daysInWeek;
	drawTable(daysInWeek, inputTable, InputOrOutput.input, obj.classes,
	          obj.classes.length, obj.dayDescs);
	if (obj.daysInWeek === ["Monday", "Tuesday", "Wednesday", "Thursday",
	                        "Friday"]) {
		(document.getElementById("daysInWeek") as HTMLInputElement).value = "5";
		document.getElementById("customDays_more").style.display = "none";
	}
	else if (obj.daysInWeek === ["Monday", "Tuesday", "Wednesday", "Thursday",
	                             "Friday", "Saturday", "Sunday"]) {
		(document.getElementById("daysInWeek") as HTMLInputElement).value = "7";
		document.getElementById("customDays_more").style.display = "none";
	}
	else {
		(document.getElementById("daysInWeek") as HTMLInputElement).value =
			"custom";
		document.getElementById("customDays_more").style.display =
			"inline-block";
		(document.getElementById("customDays") as HTMLInputElement).value =
			getCustomDays();
	}
}

/**
 * This is the event listener for the "Export JSON" button.
 * 
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+
 */
document.getElementById("export").addEventListener(
	"click", function(): void {
		var export_more: HTMLElement = document.getElementById("export_more");
		export_more.style.display =
			export_more.style.display == "none" ? "block" : "none";
		(document.getElementById("export_output") as HTMLTextAreaElement).value = serialize();
	}
);

/**
 * This is the event listener for the "Download JSON" button (only visible after
 * "Export JSON" is clicked).
 * 
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+
 */
document.getElementById("export_download").addEventListener(
	"click", function(): void {
		var blob = new Blob([serialize()],
							{type: "application/json;charset=utf-8"});
		saveAs(blob, "agenda.json");
	}
);

/**
 * This is the event listener for the "Import JSON" button.
 * 
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+
 */
document.getElementById("import").addEventListener(
	"click", function(): void {
		var import_more: HTMLElement = document.getElementById("import_more");
		import_more.style.display =
			import_more.style.display == "none" ? "inline" : "none";
	}
);

/**
 * This is the event listener for the "Import" button beside the textarea
 * visible after "Import JSON" is clicked.
 * 
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+
 */
document.getElementById("import_submit").addEventListener(
	"click", function(): void {
		deserialize((document.getElementById("import_input") as
		             HTMLTextAreaElement).value);
	}
);

/**
 * This is the event listener for the "Upload" button (only visible after
 * "Import JSON" is clicked).
 * 
 * @author psvenk
 * @license Apache-2.0+ OR MPL-2.0+
 */
document.getElementById("import_upload").addEventListener(
	"click", function(): void {
		var file: File = (document.getElementById("import_filepicker") as
		                  HTMLInputElement).files[0];
		var reader: FileReader = new FileReader();
		reader.readAsText(file);
		reader.addEventListener("load", function(): void {
			deserialize(reader.result as string);
		});
	}
);
