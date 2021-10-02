const { interval } = require("rxjs");

// 지정한 시간 간격으로 0부터 1씩 커지는 정수를 발행하는 Observable
const observable = interval(1000);

// observable 구독 객체
const subscription = observable.subscribe(value => {
  console.log(value);
});

setTimeout(() => {
  subscription.unsubscribe();
}, 5000);