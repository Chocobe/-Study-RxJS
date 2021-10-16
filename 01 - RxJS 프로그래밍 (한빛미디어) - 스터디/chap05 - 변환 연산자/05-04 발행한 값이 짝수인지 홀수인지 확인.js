const { range } = require("rxjs");
const { map } = require("rxjs/operators");

const source$ = range(0, 5).pipe(
  map(value => ({ value, isEven: value % 2 === 0 })),
);

source$.subscribe(obj => console.log(`${obj.value} 은(는) ${obj.isEven ? "짝수" : "홀수" } 입니다.`));
