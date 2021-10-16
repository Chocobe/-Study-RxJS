const { interval } = require("rxjs");
const { windowCount, take, map, tap, concatMap, filter, scan, last } = require("rxjs/operators");

const message = "안녕하세요. RxJS 테스트 입니다";

interval(90).pipe(
  take(message.length),
  map(index => message.charAt(index)),
  tap(curChar => console.log(curChar)),
  windowCount(5),
  concatMap(windowObservable => {
    console.log("windowObservable 넘어옴");

    return windowObservable.pipe(
      filter(curChar => curChar !== ""),
      take(3),
      scan((acc, curr) => acc.concat(curr), ""),
      last(),
    );
  }),
).subscribe(result => console.log(`result: ${result}`));
