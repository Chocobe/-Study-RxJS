##### top
# RxJS 스터디

# 목록

* [01. 기본 연산자](#01)

* [02. 변환(transformation) 연산자](#02)

* [03. ``take`` 와 ``skip`` 관련 연산자](#03)



<br/><hr/><br/>



##### 01
# 01. 기본 연산자

## 01-01. ``of`` 생성기

``of`` 는 인자로 넘겨준 값을 그대로 발행하는 Observable 입니다.

```javascript
const { of } = require("rxjs");

const obs$ = of(1, 2, 3, 4, 5);
obs$.subscribe(value => console.log(`of로 받은 값: ${value}`));
```



<br/><br/>



## 01-02. ``from`` 생성기

``from`` 은 인자로 배열을 받으며, 요소 각각을 발행 합니다.

```javascript
const { from } = require("rxjs");

const obs$ = from([1, 2, 3, 4, 5]);
obs$.subscribe(value => console.log(`from 에서 받은 값: ${value}`));
```



<br/><br/>



## 01-03 ``range`` 생성기

``range`` 는 시작 정수값 부터 1씩 증가하는 값을 특정 개수만큼 순서대로 발행 합니다.

```javascript
// range(시작정수, 발행개수): number

const { range } = require("rxjs");

const obs$ = range(11, 5);
obs$.subscribe(value => console.log(`range 에서 받은 값: ${value}`));
```



<br/><br/>



## 01-04 ``generate`` 생성기

``for 문`` 과 유사한 반복 루프를 생성할 수 있습니다.

``range 생성기`` 는 시작값과 개수만 정할 수 있었기 때문에, 1씩 증가하는 값만 생성 할 수 있었던 반면, ``generate`` 는 증감값도 정할 수 있습니다.

```javascript
const { generate } = require("rxjs");

const obs$ = generate({
  initialState: 0,
  condition: i => i < 10,
  iterate: i => ++i,
});

obs$.subscribe(i => console.log(`i: ${i}`));
```



<br/><br/>



## 01-05. ``interval`` 생성기

인자로 넘겨준 ms값만큼 간격을 두고, 0부턴 정수값을 발행 합니다.

```javascript
const { interval } = require("rxjs");

const obs$ = interval(1000);
obs$.subscribe(result => console.log(`interval 값: ${result}`));
```



<br/><br/>



## 01-06. ``timer`` 생성기

``interval`` 과 유사하지만, 첫 값을 발행할 때 대기 ms도 설정할 수 있습니다.

```javascript
const { timer } = require("rxjs");

const obs$ = timer(500, 1000);
obs$.subscribe(result => console.log(`timer 값: ${result}`));
```



<br/><br/>



## 01-07. ``fromEvent`` 생성기

DOM 요소에 Event Handler를 다를 수 있습니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RxJS - fromEvent</title>

    <script src="https://unpkg.com/@reactivex/rxjs/dist/global/rxjs.umd.js"></script>
  </head>

  <body>
    <h1>RxJS - fromEvent()</h1>

    <input type="text" class="myInput">

    <script>
      const myInput = document.querySelector(".myInput");

      const clickObs$ = rxjs.fromEvent(document, "click")
        .subscribe(() => console.log("🐫 클릭!!"));

      const inputObs$ = rxjs.fromEvent(myInput, "input")
        .subscribe(value => console.log(`입력값: ${value.target.value}`));
    </script>
  </body>
</html>
```



<br/>

[🔺 Top](#top)

<hr/><br/>



##### 02
# 02. 변환(transformation) 연산자

## 02-01. ``map`` 연산자

옵저버블에서 발행된 값을 변환하기 위한 연산자 입니다.

```javascript
const { from } = require("rxjs");
const { map } = require("rxjs/operators");

const obs$ = from(1, 2, 3, 4, 5);
obs$.pipe(
  map(value => Math.pow(value, 2)),
).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 02-02. ``pluck`` 연산자

옵저버블에서 발행된 값이 객체일 때, 해당 객체의 특정 Property를 추출할 때 사용합니다.

```javascript
const { from } = require("rxjs");
const { pluck, concatMap } = require("rxjs/operators");
const axios = require("axios");

const obs$ = from(axios.get("http://api.github.com/search/users?q=user:mojombo"));
obs$.pipe(
  pluck("data", "items"),
  concatMap(items => from(items).pipe(
    pluck("html_url"),
  )),
).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 02-03. ``toArray`` 연산자

발행된 값들을 배열로 묶어서 발행 합니다.

```javascript
const { range } = require("rxjs");
const { filter, toArray } = require("rxjs/operators");

const obs$ = range(1, 50);
obs$.pipe(
  filter(value => value % 3 === 0),
  filter(value => value % 2 === 1),
  toArray(),
).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 02-04. ``scan`` 연산자

``reduce`` 와 유사한 동작으로, 발행된 값들을 누적하는 동작을 합니다.

``reduce``는 누적된 결과만 발행하지만, ``scan``은 각 누적과정의 값을 매번 발행 합니다.

```javascript
const { of } = require("rxjs");
const { scan } = require("rxjs/operators");

const obs$ = of(1, 2, 3, 4, 5);
obs$.pipe(
  scan((acc, value) => acc + value),
).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 02-05. ``zip`` 생성기

``zip`` 생성기는 복수의 옵저버블을 묶어서 발행하는 옵저버블을 생성 합니다.

값을 발행할 때, 인자로 넘겨준 각 옵저버블의 발행값들이 하나의 짝을 이룰 때, 해당 값들을 배열로 만들어 발행 합니다.

```javascript
const { zip, from, of } = require("rxjs");

const obs1$ = from([1, 2, 3, 4, 5]);
const obs2$ = of("a", "b", "c", "d", "e");
const obs3$ = from([true, false, "Z", [31, 32, 33], { name: "zip" }])

zip(obs1$, obs2$, obs3$).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



##### 03
# 03. ``take`` 와 ``skip`` 관련 연산자

## 03-01. ``take`` 연산자

``take`` 연산자는 발행되는 값의 개수를 지정할 수 있습니다.

지정한 개수가 되면, 옵저버블은 ``complete()`` 을 호출합니다.

```javascript
const { range } = require("rxjs");
const { filter, take } = require("rxjs/operators");

const obs$ = range(1, 50);
obs$.pipe(
  filter(value => value % 2 === 0),
  take(5),
).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 03-02. ``takeLast`` 연산자

``takeLast`` 연산자는 발행된 값들 중, 마지막에서 부터 지정한 개수만큼 발행 합니다.

특징은 옵저버블이 ``complete()`` 되어야 값을 발행 합니다.

```javascript
const { range } = require("rxjs");
const { takeLast } = require("rxjs/operators");

const obs$ = range(1, 20);
obs$.pipe(
  takeLast(5),
).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 03-03 ``takeWhile`` 연산자

인자로 넘겨준 callback 이 ``true`` 일 때 값을 발행하며, ``false`` 가 되면 옵저버블을 ``complete()`` 시킵니다.

```javascript
const { interval } = require("rxjs");
const { takeWhile } = require("rxjs/operators");

const obs$ = interval(500);
obs$.pipe(
  takeWhile(value => value < 10),
).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 03-04. ``takeUntil`` 연산자

인자로 옵저버블을 넘겨주며, 넘겨준 옵저버블에서 값이 발행될때 까지만 값을 발행 합니다.

```javascript
const { interval, from } = require("rxjs");
const { pluck, concatMap, tap } = require("rxjs/operators");
const axios = require("axios");

const url = "http://api.github.com/search/users?q=user:mojombo";

const obs$ = interval(50);
obs$.pipe(
  takeUntil(from(axios.get(url)).pipe(
    pluck("data", "items"),
    concatMap(item => item),
    pluck("html_url"),
    tap(console.log),
  )),
).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 03-05. ``skip`` 연산자

옵저버블에서 발행된 값을 특정 개수만큼 건너뜁니다.

```javascript
const { interval } = require("rxjs");
const { skip } = require("rxjs/operators");

const obs$ = interval(500);
obs$.pipe(
  skip(5),
).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 03-06 ``skipLast`` 연산자

발행된 값 중, 인저로 넘겨준 개수만큼 마지막 값을 건너뜁니다.

만약, ``interval`` 과 같이, ``complete()`` 없이 값이 계속 발행되는 경우에는, 지정한 개수만큼 값이 밀려서 발행되는 동작을 합니다.

(지정한 개수만큼 값이 밀려서 발행되므로, 의도한 동작을 만들기 어렵기 때문에, ``complete()`` 가 호출되는 옵저버블에 사용하는 것이 좋아 보입니다.)

```javascript
const { interval } = require("rxjs");
const { skipLast } = require("rxjs/operators");

const obs$ = interval(500);
obs$.pipe(
  skipLast(5),
).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 03-07. ``skipWhile`` 연산자

callback의 조건식을 만족할 때까지, 옵저버블에서 발행된 값을 건너뜁니다.

조건이 false가 되면, 그 이후로는 조건값이 바뀌어도 반영되지 않는 특징이 있습니다. (``filter`` 와 차이점)

```javascript
const { interval } = require("rxjs");
const { skipWhile, map } = require("rxjs/operators");

const obs$ = interval(500);
obs$.pipe(
  map(value => value % 10),
  skipWhile(value => value < 5),
).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 03-08 ``skipUntil`` 연산자

인자로 넘겨준 옵저버블에서 값이 발행될 때까지, 원래의 옵저버블의 발행 값을 건너뜁니다.

```javascript
const { interval, timer } = require("rxjs");
const { skipUntil } = require("rxjs/operators");

const skipTimer$ = timer(2000);
const obs$ = interval(500);

obs$.pipe(
  skipUntil(skipTimer),
).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



