const { from } = require("rxjs");

function* forLoopGen(start, end, increment) {
  for(let value = start; value <= end; value += increment) {
    yield value;
  }
}

from(forLoopGen(1, 15, 2))
  .subscribe({
    next: value => console.log(`next: ${value}`),
    error: error => console.log(`error: ${error}`),
    complete: () => console.log("completed"),
  });
