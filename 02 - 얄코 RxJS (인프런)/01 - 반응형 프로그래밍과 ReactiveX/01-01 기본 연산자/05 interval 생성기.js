const { interval } = require("rxjs");

const obs$ = interval(1000);
obs$.subscribe(result => console.log(`interval 값: ${result}`));
