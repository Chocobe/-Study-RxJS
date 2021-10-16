const { timer } = require("rxjs");

timer(1000)
  .subscribe({
    next: value => console.log(`timer(1000) next: ${value}`),
    error: error => console.log(`timer(1000) error: ${error.message}`),
    complete: () => console.log("timer(1000) complete"),
  });