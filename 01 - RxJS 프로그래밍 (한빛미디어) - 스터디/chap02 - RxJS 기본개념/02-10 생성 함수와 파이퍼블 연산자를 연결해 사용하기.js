const { range } = require("rxjs");
const { filter, map } = require("rxjs/operators");

range(1, 10).pipe(
  filter(value => value % 2 === 0),
  map(value => ++value),
).subscribe({
  next: value => {
    console.log(`observerA: ${value}`);
  },

  error: error => {
    console.log(`observerA: ${error}`);
  },

  complete: () => {
    console.log("observerA: complete");
  },
});