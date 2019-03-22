########## Dependencies ##########
# TypeScript: npm install typescript

default: build

build: main.ts
	tsc main.ts

clean:
	rm main.js
