const { of } = require("rxjs");
const { distinctUntilChanged } = require("rxjs/operators");

const obj = [
  { objKey: { a: 1, b: 20 }},
  { objKey: { a: 1, b: 20 }},
  { objKey: { a: 2, b: 40 }},
  { objKey: { a: 3, b: 70 }},
  { objKey: { a: 3, b: 70 }},
  { objKey: { a: 2, b: 40 }},
];

of(...obj).pipe(
  distinctUntilChanged(
    (lhs, rhs) => lhs.a === rhs.a && lhs.b === rhs.b,
    obj => obj.objKey,
  ),
).subscribe(obj => console.log(`result: ${JSON.stringify(obj)}`));
