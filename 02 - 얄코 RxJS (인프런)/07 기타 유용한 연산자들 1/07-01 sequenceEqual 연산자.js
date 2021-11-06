const { from } = require("rxjs");
const { sequenceEqual } = require("rxjs/operators");

const source$ = from([0, 3, 2, 1]);

const obs$ = from([0, 3, 2, 1]).pipe(
  sequenceEqual(source$),
);

obs$.subscribe(isEqual => console.log(`같은 값을 같은 순서로 발행 하는가: [${isEqual}]`));
