const { from } = require("rxjs");
const { every } = require("rxjs/operators");

const obs$ = from([1, 3, 5, 7, 9]).pipe(
  every(value => value % 2 === 0),
);

obs$.subscribe(console.log);
