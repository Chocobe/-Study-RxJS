const { range } = require("rxjs");
const { count } = require("rxjs/operators");

range(1, 20).pipe(
  count(),
).subscribe(result => console.log(`count: ${result}`));
