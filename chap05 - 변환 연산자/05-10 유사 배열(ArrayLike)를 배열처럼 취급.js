const { range } = require("rxjs");
const { mergeMap } = require("rxjs/operators");

range(0, 3).pipe(
  mergeMap(i => {
    const nextArrayLike = {
      length: 4,
      0: i + 1,
      1: i + 2,
      2: i + 3,
      3: i + 4,
    };

    console.log(`typeof nextArrayLike: ${typeof nextArrayLike}`);
    return nextArrayLike;
  }),
).subscribe(value => console.log(`current value: ${value}`));
