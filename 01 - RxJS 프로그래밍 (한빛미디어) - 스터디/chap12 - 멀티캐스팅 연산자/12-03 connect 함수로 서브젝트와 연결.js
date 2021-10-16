const { interval, Subject, connectable } = require("rxjs");
const { take } = require("rxjs/operators");

const source$ = interval(500).pipe(
  take(5),
);
const multi = connectable(source$);

multi.subscribe(value => console.log(`one: ${value}`));
multi.subscribe(value => console.log(`two: ${value}`));

multi.connect();

setTimeout(() => {
  multi.subscribe(value => console.log(`three: ${value}`));
}, 1000);
