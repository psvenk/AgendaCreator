/*
Copyright 2019 psvenk
This file is part of AgendaCreator.

AgendaCreator is free/libre and open-source software: you can redistribute it
and/or modify it under the terms of the Mozilla Public License, Version 2.0 or
any later version. See file `COPYING` for more details.

Unless otherwise specified, all parts of this file carry the same license as
the license for the entire file.

SPDX-License-Identifier: MPL-2.0+
*/

"use strict";

interface Date {
	addDays(days: number): Date;
	getMonthString(): string;
}

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
 * CC-BY-SA-licensed snippet in my MPL-licensed code. However, if you take this
 * code, modify it to make it something more than a short snippet, and use it in
 * your own project, it will carry the CC-BY-SA 3.0 license as it will be a
 * derivative work of this code snippet.
 */
function decodeEntities(encodedString: string): string {
	var textArea: HTMLTextAreaElement = document.createElement('textarea');
	textArea.innerHTML = encodedString;
	return textArea.value;
}

/**
 * Returns a Date object from an ISO date string (no time).
 * See <https://stackoverflow.com/a/23641753>.
 * 
 * @author psvenk
 * @license MPL-2.0+
 */
function parseDate(dateString: string): Date {
	let parts: string[] = dateString.split(/\D/);
	if (parts.length !== 3) return undefined;
	return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1,
	                parseInt(parts[2]));
}

/**
 * Adds a set number of days to a Date, and returns the modified Date object.
 * This method does not modify the original Date object.
 * 
 * @param {number} days: The number of days to add
 * 
 * @author Anthony W. Jones at <https://stackoverflow.com/a/563442>
 * 		modified slightly by psvenk to include TypeScript type annotations
 * @license CC-BY-SA-3.0
 * 
 * The license note for decodeEntities() applies to this function too.
 */
Date.prototype.addDays = function(days: number): Date {
	let date: Date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

/**
 * Performs a shallow clone of an array.
 * 
 * @param {any[]} arr: The array to clone
 * @return {any[]} A clone of `arr`
 * 
 * @author psvenk
 * @license CC0-1.0 OR MPL-2.0+ OR Apache-2.0+
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
 * @license MPL-2.0+ OR Apache-2.0+
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
 * This function compares two string arrays. This function could be used
 * to perform a shallow comparison of any two arrays, but I only need to compare
 * string arrays (for now) in AgendaCreator.
 * 
 * @param {string[]} arr1: The first array to compare
 * @param {string[]} arr2: The second array to compare
 * 
 * @return true if equal, false if not equal
 * 
 * @author psvenk
 * @license MPL-2.0+ OR Apache-2.0+
 */
function arrayEquals (arr1: string[], arr2: string[]): boolean {
	if (arr1.length !== arr2.length) return false;
	for (let i: number = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
}
