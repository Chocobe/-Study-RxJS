/**
 * @description
 * - observableCreated$ 를 구독하면, 1 ~ 10 까지 값을 받을 수 있습니다.
 * - 각 값은 (i * 300)ms 마다 받습니다.
 * 
 * - observerA 는 처음부터 구독
 * - observerB 는 1350ms 후 구독
 */

const { Observable } = require("rxjs");

const observableCreated$ = Observable.create(observer => {
  for(let i = 1; i <= 10; i++) {
    setTimeout(() => {
      observer.next(i);

      if(i === 10) {
        observer.complete();
      }
    }, 300 * i);
  }
});

// observerA
observableCreated$.subscribe(
  item => {
    console.log(`observerA: ${item}`);
  },

  error => {
    console.log(`observerA: ${error}`);
  },

  () => {
    console.log("observerA: complete");
  },
);

// observerB
setTimeout(() => {
  observableCreated$.subscribe(
    item => {
      console.log(`observerB: ${item}`);
    },

    error => {
      console.log(`observerB: ${error}`);
    },

    () => {
      console.log(`observerB: complete`);
    },
  );
}, 1350);
