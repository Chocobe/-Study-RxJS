const { Observable } = require("rxjs");

const observableCreated$ = Observable.create(observer => {
  const intervalID = setInterval(() => {
    observer.next("Hello World");
  }, 1000);

  // 반환하는 함수는 unsubscribe() 함수로 사용 됩니다.
  return () => {
    clearInterval(intervalID);
  };
});
