# This script runs make whenever main.ts is saved.
while true; do
	inotifywait -e CLOSE_WRITE main.ts
	make
done; # https://www.grant-trebbin.com/2012/02/ide-for-asymptote-using-inotifywait.html https://www.youtube.com/watch?v=BaQaAGqahEc
