# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project partially adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.2.1 - 2019-04-16

- `[+]` Table now fills page when printing
- `[+]` AgendaCreator is now valid XHTML 1.0 Transitional
- `[+]` Added heading when printing

## 0.2.0 - 2019-04-13

- `[+]` Added support for day descriptions (adding the name of some holiday or event below the name of a day of the week)
- `[+]` Added printing support
- `[*]` Changed `var` to `let` or `const` in some places in the TypeScript code to limit scope (this does not transfer to the compiled JavaScript, so compatibility with older browsers is not broken because of this)

## 0.1.4 - 2019-04-12

- `[*]` Changed changelog formatting

## 0.1.3 - 2019-04-12

- `[+]` Added changelog
- `[+]` Added a text field for quickly editing custom days of the week
- `[*]` Refactored some code for setting custom days of the week
- `[*]` Changed triple equals to double equals where appropriate in TypeScript
source code
- `[+]` Improved documentation of functions in TypeScript source code

## 0.1.2 - 2019-04-12

- `[+]` Added language and charset information to HTML

## 0.1.1 - 2019-04-12

- `[+]` Added link to GitHub repository

## 0.1.0 - 2019-04-12

- `[+]` Added import (deserialization) code
- `[*]` Imporved export (serialization) code
- `[*]` Changed some indentation
- `[*]` AgendaCreator has been taken out of alpha and put into beta
