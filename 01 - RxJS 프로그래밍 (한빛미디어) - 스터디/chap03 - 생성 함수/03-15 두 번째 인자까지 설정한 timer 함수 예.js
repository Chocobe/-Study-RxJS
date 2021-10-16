const { timer } = require("rxjs");

timer(1000, 500)
  .subscribe({
    next: value => console.log(`timer(1000, 500) next: ${value}`),
    error: error => console.log(`timer(1000, 500) error: ${error.message}`),
    complete: () => console.log("timer(1000, 500) complete"),
  });