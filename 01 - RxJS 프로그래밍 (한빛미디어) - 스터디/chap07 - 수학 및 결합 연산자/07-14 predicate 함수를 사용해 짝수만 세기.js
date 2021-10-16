const { range } = require("rxjs");
const { count } = require("rxjs/operators");

range(1, 7).pipe(
  count(value => value % 2 === 0),
).subscribe(result => console.log(`짝수 개수: ${result}`));
