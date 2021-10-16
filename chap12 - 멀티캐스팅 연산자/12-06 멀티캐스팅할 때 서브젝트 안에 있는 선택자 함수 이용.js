const { interval, Subject, zip } = require("rxjs");
const { take, tap, multicast } = require("rxjs/operators");

interval(1500).pipe(
  take(5),
).subscribe(result => console.log(`${(result + 1) * 1500}ms elapsed`));

const multi = interval(1500).pipe(
  take(5),
  tap(value => console.log(`tap: ${value}`)),
  multicast(
    new Subject(),
    subject => zip(
      subject,
      subject,
      (a, b) => `(${a}, ${b})`,
    ),
  ),
);

multi.subscribe(result => console.log(`result: ${result} val`));
