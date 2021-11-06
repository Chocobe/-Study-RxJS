const { interval, iif, of } = require("rxjs");

const obs$ = interval(500);

obs$.subscribe(value => {
  iif(() => value % 2 === 0, of("짝수"), of("홀수"))
    .subscribe(console.log);
});
