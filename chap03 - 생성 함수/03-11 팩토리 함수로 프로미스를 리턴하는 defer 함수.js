const { defer } = require("rxjs");

const source1$ = defer(() => new Promise((resolve, reject) => {
  console.log("promise1 function begin");
  
  setTimeout(() => resolve("promise1 resolve"), 700);

  console.log("promise1 function end");
}));

console.log("source1$ created");

const source2$ = defer(() => new Promise((resolve, reject) => {
  console.log("promise2 function begin");

  setTimeout(() => reject(new Error("promise2 reject")), 1200);

  console.log("promise2 function end");
}));

console.log("source2$ created");

console.log("before source1$.subscribe()");

source1$.subscribe({
  next: value => console.log(`[1] next: ${value}`),
  error: error => console.log(`[1] error: ${error.message}`),
  complete: () => console.log("[1] complete"),
});

console.log("after source1$.subscribe()");

console.log("before source2$.subscribe()");

source2$.subscribe({
  next: value => console.log(`[2] next: ${value}`),
  error: error => console.log(`[2] error: ${error.message}`),
  complete: () => console.log("[2] complete"),
});

console.log("after source2$.subscribe()");