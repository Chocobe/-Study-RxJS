const { NEVER } = require("rxjs");

console.log("before subscribe()");

NEVER.subscribe({
  next: value => console.log(`NEVER next: ${value}`),
  error: error => console.log(`NEVER error: ${error.message}`),
  complete: () => console.log("NEVER complete"),
});

console.log("after subscribe()");