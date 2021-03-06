const { interval } = require("rxjs");
const { skip, take } = require("rxjs/operators");

interval(300).pipe(
  skip(3),
  take(2),
).subscribe(value => console.log(`result: ${value}`));
