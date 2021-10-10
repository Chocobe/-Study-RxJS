const { range } = require("rxjs");
const { isEmpty } = require("rxjs/operators");

const getRangeObservable = count => range(1, count);

const subscribeWithIsEmpty = count => getRangeObservable(count).pipe(
  isEmpty(),
).subscribe(result => console.log(`개수: ${count}, 값: ${result}`));

subscribeWithIsEmpty(0);
subscribeWithIsEmpty(3);
