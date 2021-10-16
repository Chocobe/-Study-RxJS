const { range } = require("rxjs");
const { min } = require("rxjs/operators");

range(1, 10).pipe(
  min(),
).subscribe(result => console.log(`min: ${result}`));
