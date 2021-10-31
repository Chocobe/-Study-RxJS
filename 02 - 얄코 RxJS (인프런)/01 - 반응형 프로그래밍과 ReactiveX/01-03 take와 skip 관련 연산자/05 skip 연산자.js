const { interval } = require("rxjs");
const { skip } = require("rxjs/operators");

const obs$ = interval(500);
obs$.pipe(
  skip(5),
).subscribe(console.log);
