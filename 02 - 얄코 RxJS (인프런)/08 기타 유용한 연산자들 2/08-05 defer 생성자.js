const { interval, defer, of } = require("rxjs");

const obs$ = interval(500);

obs$.subscribe(value => {
  const isOdd$ = value % 2 === 0
    ? defer(() => of("짝수"))
    : defer(() => of("홀수"));

  isOdd$.subscribe(console.log);
});
