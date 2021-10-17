const { from } = require("rxjs");

const obs$ = from([1, 2, 3, 4, 5]);
obs$.subscribe(value => console.log(`from에서 받은 값: ${value}`));