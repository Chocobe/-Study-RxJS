const { of } = require("rxjs");

const obs$ = of(1, 2, 3, 4, 5);
obs$.subscribe(value => console.log(`of로 받은 값: ${value}`));