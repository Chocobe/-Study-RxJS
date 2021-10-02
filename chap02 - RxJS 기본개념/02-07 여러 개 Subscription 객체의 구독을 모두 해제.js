const { interval } = require("rxjs");

const observable1 = interval(400);
const observable2 = interval(300);

// 부모 Subscription
const subscription = observable1.subscribe(value => {
  console.log(`first: ${value}`);
});

// 자식 Subscription
const childSubscription = observable2.subscribe(value => {
  console.log(`second: ${value}`);
});

// 자식 => 부모 Subscription 구독
subscription.add(childSubscription);

setTimeout(() => {
  // 부모 Subscription 구독해제 시, 자식 Subscription 도 구독해제 됩니다..
  subscription.unsubscribe();
}, 2000);