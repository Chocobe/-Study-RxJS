const { timer, merge } = require("rxjs");
const { map, take } = require("rxjs/operators");

const req01$ = timer(0, 200).pipe(
  take(6),
  map(value => `req01: ${value}`),
);

const req02$ = timer(0, 500).pipe(
  take(11),
  map(value => `req02: ${value}`),
);

const req03$ = timer(0, 300).pipe(
  take(7),
  map(value => `req03: ${value}`),
);

const req04$ = timer(0, 500).pipe(
  take(9),
  map(value => `req04: ${value}`),
);

const req05$ = timer(0, 100).pipe(
  take(8),
  map(value => `req05: ${value}`),
);

const req06$ = timer(0, 700).pipe(
  take(4),
  map(value => `req06: ${value}`),
);

const concurrent = 1;

merge(req01$, req02$, req03$, req04$, req05$, req06$, concurrent)
  .subscribe(req => console.log(`결과: ${req}`));
