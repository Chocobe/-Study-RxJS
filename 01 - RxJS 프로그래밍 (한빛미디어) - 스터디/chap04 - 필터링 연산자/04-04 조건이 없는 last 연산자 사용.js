const { range } = require("rxjs");
const { last } = require("rxjs/operators");

range(1, 10).pipe(
  last(),
).subscribe(value => console.log(`result: ${value}`));
