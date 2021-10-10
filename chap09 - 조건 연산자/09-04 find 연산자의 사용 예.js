const { range } = require("rxjs");
const { find, tap } = require("rxjs/operators");

const getRangeObservable = count => range(1, count);

const subscribeWithFindGreaterThan3 = count => getRangeObservable(count).pipe(
  tap(value => console.log(`tap: ${value}`)),
  find(value => value > 3),
).subscribe(result => console.log(`개수: ${count}, 값: ${result}`));

subscribeWithFindGreaterThan3(1);
subscribeWithFindGreaterThan3(5);
