const { interval } = require("rxjs");
const { windowCount, take, map, tap, mergeMap, defaultIfEmpty, filter, scan, last } = require("rxjs/operators");

const message = "간장공장공장장은강공장장이고공공장공장장은장공장장이다";
const targetWord = "공장장";

interval(10).pipe(
  take(message.length),
  map(index => message.charAt(index)),
  tap(curChar => console.log(curChar)),
  windowCount(targetWord.length, 1),
  mergeMap(windowObservable => {
    console.log("windowObservable 넘어옴");

    return windowObservable.pipe(
      defaultIfEmpty({ empty: true }),
      scan((accString, current) => current.empty 
        ? current 
        : accString.concat(current), ""),
      last(),
    );
  }),
  filter(word => {
    if(typeof word === "string") {
      console.log(`현재단어: ${word}`);
      return word === targetWord;
    }

    return false;
  })
).subscribe(result => console.log(`result: ${result}`));
