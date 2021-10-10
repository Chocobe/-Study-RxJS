const { range } = require("rxjs");
const { tap, map } = require("rxjs/operators");

range(1, 8).pipe(
  map(value => value === 8 ? value.test() : value + 1),
  tap({
    next: value => console.log(`tap next: ${value}`),
    error: error => console.log(`tap ERROR: ${error}`),
  }),
).subscribe({
  next: result => console.log(`result: ${result}`),
  error: error => console.log(`subscribe ERROR: ${error}`),
});
