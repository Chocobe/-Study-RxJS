const { generate } = require("rxjs");

const obs$ = generate({
  initialState: 0,
  condition: value => value < 10,
  iterate: value => ++value,
});

obs$.subscribe(result => console.log(`결과: ${result}`));
