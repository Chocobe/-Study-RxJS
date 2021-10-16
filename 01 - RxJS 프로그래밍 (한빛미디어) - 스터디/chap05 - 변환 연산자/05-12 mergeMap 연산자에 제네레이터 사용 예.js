const { range } = require("rxjs");
const { mergeMap } = require("rxjs/operators");

range(0, 3).pipe(
  mergeMap(function*(i) {
    for(let value = 0; value <= i; value++) {
      yield value;
    }
  }),
).subscribe(value => console.log(`generator value: ${value}`));
