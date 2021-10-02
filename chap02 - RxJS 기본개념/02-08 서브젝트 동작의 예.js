const { Subject } = require("rxjs");

const subject = new Subject();

subject.subscribe({
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

subject.subscribe({
  next: value => {
    console.log(`observerB: ${value}`);
  },

  error: error => {
    console.log(`observerB: ${error}`);
  },

  complete: () => {
    console.log("observerB: complete");
  },
});

subject.next(1);
subject.next(2);
subject.complete();