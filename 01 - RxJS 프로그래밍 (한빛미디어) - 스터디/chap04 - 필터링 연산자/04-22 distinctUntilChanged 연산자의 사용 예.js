const { of } = require("rxjs");
const { distinctUntilChanged } = require("rxjs/operators");

of(1, 6, 7, 7, 2, 5, 5, 2, 6).pipe(
  distinctUntilChanged(),
).subscribe(value => console.log(`result: ${value}`));
