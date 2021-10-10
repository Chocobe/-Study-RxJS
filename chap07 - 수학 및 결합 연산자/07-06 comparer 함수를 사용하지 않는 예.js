const { range } = require("rxjs");
const { max } = require("rxjs/operators");

range(1, 10).pipe(
  max(),
).subscribe(result => console.log(`max: ${result}`));
