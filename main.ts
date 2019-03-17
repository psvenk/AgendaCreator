/*
Copyright 2019 psvenk
This file is part of AgendaCreator.

AgendaCreator is free/libre software: you can redistribute it and/or modify it
under the terms of the MIT/Expat License.

You should have received a copy of the MIT/Expat License
along with AgendaCreator. If not, see <https://opensource.org/licenses/MIT>.
*/

"use strict";

function decodeEntities(encodedString: string): string {
	var textArea: HTMLTextAreaElement = document.createElement('textarea');
	textArea.innerHTML = encodedString;
	return textArea.value;
}
/* Convert HTML-encoded string to string with Unicode characters,
   e.g. "&amp;" -> "&"
   https://stackoverflow.com/a/1395954/
*/

function drawTable(daysInWeek: string[], table: HTMLTableElement) {
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

		var currentTh: HTMLTableHeaderCellElement = document.createElement("th");
		currentTh.innerHTML = daysInWeek[col - 1];
		theadTr.appendChild(currentTh);
	})();
	// Populate header
	(function() {
		var maxRows: number = 5;
		for (var row: number = 1; row <= maxRows; row++) {
			var tr: HTMLTableRowElement = document.createElement("tr");
			tbody.appendChild(tr);
			// Create a row and add it to the <tbody>

			if (row != maxRows) {
				tr.appendChild(document.createElement("td")).appendChild(document.createElement("input"));
				// Add a cell with an <input> in the leftmost position
				// TODO store the <input>s in an array so that their values can be used
			} else {
				// If last row

				var button: HTMLInputElement = document.createElement("input");
				button.type = "button";
				button.value = decodeEntities("Add more&hellip;");
				button.id = "addMore";
				/* Create an <input> and set it to be a button with the text
				   "Add more..." */

				tr.appendChild(document.createElement("td")).appendChild(button);
				// Add the button in the leftmost position
			}

			for (var col: number = 1; col <= daysInWeek.length; col++) {
				tr.appendChild(document.createElement("td"));
			}
			// Create remaining cells
		}
	})();
	// Create more rows and populate them
}

var daysInWeek: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

var table: HTMLTableElement = document.getElementsByTagName("table")[0];
// Get reference to <table> and store it in variable `table`

drawTable(daysInWeek, table);

/*
daysInWeek.forEach(function(day) {
	console.log(day);
});
*/

document.getElementById("daysInWeek").addEventListener("click", function() {
	switch ((this as HTMLInputElement).value) {
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
			prompt("List the days in the week that you want to include (put commas between the days, and type \"\,\" without the quotation marks to insert a literal comma): ");
		}
	}
});
