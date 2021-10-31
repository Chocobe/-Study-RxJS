const { timer } = require("rxjs");

const obs$ = timer(1000, 2000);
obs$.subscribe(result => console.log(`timer 값: ${result}`));
