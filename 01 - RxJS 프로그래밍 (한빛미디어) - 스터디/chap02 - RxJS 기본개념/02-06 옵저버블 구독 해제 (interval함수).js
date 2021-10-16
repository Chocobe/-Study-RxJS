const { interval } = require("rxjs");

const observable = interval(1000);

const subscription = observable.subscribe(value => {
  console.log(value);
});

setTimeout(() => {
  subscription.unsubscribe();
}, 3000);