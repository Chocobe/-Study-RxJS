const { of } = require("rxjs");
const { distinctUntilChanged } = require("rxjs/operators");

const obj = [
  { a: 1, b: 20 },
  { a: 1, b: 20 },
  { a: 2, b: 40 },
  { a: 3, b: 70 },
  { a: 3, b: 70 },
  { a: 2, b: 40 },
];

of(...obj).pipe(
  distinctUntilChanged(
    null,
    obj => obj.a,
  ),
).subscribe(obj => console.log(`result: ${JSON.stringify(obj)}`));
