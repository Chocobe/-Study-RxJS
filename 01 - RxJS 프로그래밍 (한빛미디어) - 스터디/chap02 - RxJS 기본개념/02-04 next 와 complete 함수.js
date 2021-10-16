const { Observable } = require("rxjs");

Observable.create(observer => {
  console.log("BEGIN observable");

  observer.next(1);
  observer.next(2);

  observer.complete();

  observer.next(3);
})
  .subscribe(
    item => {
      console.log(item);
    },

    error => {
      console.log(error);
    },

    () => {
      console.log("complete");
    },
  );