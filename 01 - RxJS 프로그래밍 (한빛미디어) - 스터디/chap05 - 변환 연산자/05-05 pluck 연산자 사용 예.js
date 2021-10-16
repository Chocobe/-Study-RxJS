const { range } = require("rxjs");
const { pluck, map } = require("rxjs/operators");

const source$ = range(0, 5).pipe(
  map(value => ({ value, isEven: value % 2 === 0 })),
);

source$.pipe(
  pluck("isEven"),
).subscribe(isEven => console.log(`${isEven ? "짝수" : "홀수"} 입니다.`));

source$.pipe(
  pluck("value"),
).subscribe(value => console.log(`${value} 입니다.`));
