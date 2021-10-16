const { range } = require("rxjs");
const { defaultIfEmpty } = require("rxjs/operators");

const getRangeObservable = count => range(1, count);

const subscribeWithDefaultIfEmpty = (count) => {
  return getRangeObservable(count).pipe(
    defaultIfEmpty("EMPTY"),
  ).subscribe(result => console.log(`개수: ${count}, 값: ${result}`));
};

subscribeWithDefaultIfEmpty(0);
subscribeWithDefaultIfEmpty(3);
