const { range } = require("rxjs");
const { mergeMap } = require("rxjs/operators");

range(0, 3).pipe(
  mergeMap(i => [i + 1, i + 2, i + 3, i + 4]),
).subscribe(value => console.log(`current value: ${value}`));
