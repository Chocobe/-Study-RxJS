const { range } = require("rxjs");

const obs$ = range(11, 5)
obs$.subscribe(value => console.log(`range 에서 받은 값: ${value}`));
