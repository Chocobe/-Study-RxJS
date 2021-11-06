##### top
# RxJS 스터디

# 목록

* [01. 기본 연산자](#01)

* [02. 변환(transformation) 연산자](#02)

* [03. ``take`` 와 ``skip`` 관련 연산자](#03)

* [04. 시간을 다루는 연산자 1](#04)

* [05. 시간을 다루는 연산자 2](#05)

* [06. 스트림을 결합하는 생성자 및 연산자](#06)



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



##### 04
# 04. 시간을 다루는 연산자 1

## 04-01. ``delay`` 연산자

옵저버블에서 값이 발행된 시점부터, 지정한 시간만큼 지연시킨 후, 값을 발행 합니다.

발행된 값 각각에 대해 지연시킨다는 것이 특징 입니다.

```javascript
const { interval } = require("rxjs");
const { take, delay, tap } = require("rxjs/operators");

const obs$ = interval(1000);
obs$.pipe(
  take(5),
  delay(5001),
  tap(value => console.log(`지연 후, 발행시작: ${value}`)),
).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 04-02. ``timestamp`` 연산자

옵저버블에서 값이 발행된 시점의 시간값을 발행된 값에 mapping 하여, 발행합니다.

``timestamp()`` 를 사용하면, 옵저버블에서 발행한 값을 ``value`` Property에 넣고, 발행시간 값을 ``timestamp`` Property 에 넣은 Object 형태로 값을 발행 합니다.

```javascript
const { interval } = require("rxjs");
const { timestamp, pluck, map } = require("rxjs/operators");

const obs$ = interval(1000);
obs$.pipe(
  timestamp(),
  pluck("timestamp"),
  map(time => moment(time)),
  map(timeMoment => timeMoment.format("YYYY년 MM월 DD일 HH:mm:ss")),
).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 04-03. ``timeInterval`` 연산자

옵저버블에서 값이 발행된 후 다음 발행까지 걸린 시간을 각 발행값에 mapping 하여 발행 합니다.

옵저버블에서 발행된 값은 ``value`` Property 에 넣고, 걸린 시간값은 ``interval`` Property 에 넣어서, Object로 값을 발행 합니다.

```javascript
const { interval } = require("rxjs");
const { timeInterval, pluck, map } = require("rxjs/operators");

const obs$ = interval(1500);
obs$.pipe(
  timeInterval(),
  pluck("interval"),
  map(milliseconds => milliseconds / 1000),
).subscribe(seconds => console.log(`경과시간: ${seconds}초`));
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 04-04. ``timeout`` 연산자

인자로 지정한 시간내에, 옵저버블에서 값이 발행되지 않으면, ``throwError()`` 를 호출하는 연산자 입니다.

```javascript
const { of } = require("rxjs");
const { timeout, delay } = require("rxjs/operators");

const obs$ = of(1, 2, 3, 4, 5);
obs$.pipe(
  delay(3000),
  timeout(2000),
).subscribe({
  next: console.log,
  error: console.log,
  complete: () => console.log("complete() 호출"),
});
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 04-05 ``timeoutWith`` 연산자 (deprecated)

``timeout`` 과 동일한 동작을 하지만, 지정한 시간을 초과하게 될 경우, 두번째 인자로 넘겨준 ``옵저버블을 구독``하게 합니다.

```javascript
const { of, interval } = require("rxjs");
const { timeoutWith, delay, scan, map } = require("rxjs/operators");

const obs$ = of(10, 20, 30, 40, 50);
obs$.pipe(
  delay(3000),
  timeoutWith(2000, () => interval(1000).pipe(
    scan(acc => ++acc, 1000),
    map(value => console.log(`timeout됨: ${value}`)),
  )),
).subscribe(console.log);
```

<br/>

``timeoutWith`` 는 ``v8`` 부터 삭제될 함수이기 때문에, ``timeout`` 으로 사용하는 것을 권장 합니다.

``timeout`` 에 넘겨주는 인자를 객체형식으로 넘겨주면, ``timeoutWith``와 동일한 동작을 하게 됩니다.

``timeout`` 에 인자로 넘겨주는 객체는 ``TimeoutConfig`` 타입이며, 다음과 같은 Property 를 가집니다.

* ``each``: timeout 값
* ``with``: timeout 될 경우, 새로 구독할 옵저버블을 반활하는 callback 함수

```javascript
const { of, interval } = require("rxjs");
const { timeout, delay, scan, map } = require("rxjs/operators");

const obs$ = of(10, 20, 30, 40, 50);
obs$.pipe(
  delay(3000),
  timeout({ each: 2000, with: () => interval(1000).pipe(
    scan(acc => ++acc, 1000),
    map(value => `timeout 됨: ${value}`),
  )}),
).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



##### 05
# 05. 시간을 다루는 연산자 2

## 05-01. ``debounceTime`` 연산자

옵저버블에서 값을 발행하는 간격이, ``debounceTime`` 에 지정한 시간보다 길어야 값을 발행 합니다.

즉, 지정한 시간보다 짧은 간격으로 값이 발행되면, ``debounceTime``은 값을 발행하지 않고 대기합니다.

``debounceTime`` 에 만족할 경우, 마지막으로 발행된 값을 발행 합니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>debounceTime 연산자</title>

    <script src="https://unpkg.com/@reactivex/rxjs/dist/global/rxjs.umd.js"></script>
  </head>
  
  <body>
    <h1>debounceTime 연산자</h1>

    <div>
      <div>마지막 입력 후 1초가 지나면, 화면에 적용 됩니다.</div>
      <label for="myInput">입력</label>
      <input type="text" id="myInput">

      <h3>결과: <span class="result" /></h3>
    </div>

    <script>
      const { fromEvent } = rxjs;
      const { debounceTime, tap, pluck } = rxjs.operators;

      const $myInput = document.querySelector("#myInput");
      const $result = document.querySelector(".result");

      const init = () => {
        fromEvent($myInput, "input").pipe(
          debounceTime(1000),
          tap(console.log),
          pluck("target", "value"),
        ).subscribe(value => $result.innerHTML = value);
      };

      init();
    </script>
  </body>
</html>
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 05-02. ``auditTime`` 연산자

옵저버블에서 첫번째 값이 발행되면, ``auditTime`` 에 지정한 시간 이후, 최신값을 발행 합니다.

그리고, 옵저버블에 ``complete()`` 가 호출되면, 마지막 대기중인 값은 발행하지 않습니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>auditTime 연산자</title>

    <script src="https://unpkg.com/@reactivex/rxjs/dist/global/rxjs.umd.js"></script>
  </head>

  <body>
    <h1>auditTime 연산자</h1>

    <div>
      <div>첫 입력으로 부터 1초 후, 값을 발행 합니다. (그 사이 최신값)</div>
      <label for="myInput">입력</label>
      <input type="text" id="myInput">

      <h3>결과: <span class="result" /></h3>
    </div>

    <script>
      const { fromEvent } = rxjs;
      const { auditTime, pluck } = rxjs.operators;

      const $myInput = document.querySelector("#myInput");
      const $result = document.querySelector(".result");

      const init = () => {
        fromEvent($myInput, "input").pipe(
          auditTime(1000),
          pluck("target", "value"),
        ).subscribe(value => $result.innerHTML = value);
      };

      init();
    </script>
  </body>
</html>
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 05-03. ``sampleTime`` 연산자

지정한 시간 간격마다 값을 발행 합니다.

다만, 옵저버블에서 발행한 값이 없으면, 발행하지 않습니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>sampleTime 연산자</title>

    <script src="https://unpkg.com/@reactivex/rxjs/dist/global/rxjs.umd.js"></script>
  </head>

  <body>
    <h1>sampleTime 연산자</h1>

    <div>
      <div>지정한 시간마다 값을 발행합니다. (지정한 시간내에 발행값이 없으면, 값을 발행하지 않습니다.)</div>

      <label for="myInput">입력</label>
      <input type="text" id="myInput">

      <h3>결과: <span class="result" /></h3>
    </div>

    <script>
      const { fromEvent } = rxjs;
      const { sampleTime, timeInterval, tap } = rxjs.operators;

      const $myInput = document.querySelector("#myInput");
      const $result = document.querySelector(".result");

      const init = () => {
        fromEvent($myInput, "input").pipe(
          sampleTime(1000),
          timeInterval(),
          tap(({ value, interval }) => `[시간간격: ${interval}] - 값: ${value.target.value}`),
        ).subscribe(value => $result.innerHTML = value);
      };

      init();
    </script>
  </body>
</html>
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 05-04 ``throttleTime`` 연산자

첫번째 값을 발행하고 지정한 시간만큼 대기하거나, 지정한 시간만큼 대기한 후 마지막 값을 발행 할 수 있습니다.

3번째 인지아니 ``throttleConfig`` 객체를 사용하여, 동작을 설정 할 수 있습니다.

(2번째 인자는 스케줄러로, 기본값인 ``asyncScheduler`` 를 사용)

```typescript
interface throttleConfig {
  // leading: true 일 경우, 첫번째 값을 발행 (기본값: true)
  leading: boolean,
  // trailing: true 일 경우, 마지막 값을 발행 (기본값: false)
  trailing: boolean,

  // 둘 다 true 로 사용 가능
}
```

<br/>

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>throttleTime 연산자</title>

    <script src="https://unpkg.com/@reactivex/rxjs/dist/global/rxjs.umd.js"></script>
  </head>
  
  <body>
    <h1>throttleTime 연산자</h1>

    <div>
      <div>lead: true 설정 시, 첫번째 값을 발행하고, 지정한 시간동안 값을 발행하지 않습니다.</div>

      <label for="myInput">입력: </label>
      <input type="text" id="myInput">

      <h3>결과: <span class="result" /></h3>
    </div>

    <script>
      const { fromEvent, asyncScheduler } = rxjs;
      const { throttleTime, pluck } = rxjs.operators;

      const $myInput = document.querySelector("#myInput");
      const $result = document.querySelector(".result");

      const throttleForFirst = () => {
        fromEvent($myInput, "input").pipe(
          throttleTime(1000, asyncScheduler, { leading: true, trailing: false }),
          pluck("target", "value"),
        ).subscribe(value => $result.innerHTML = value);
      };

      // throttleForFirst()

      const throttleForLast = () => {
        fromEvent($myInput, "input").pipe(
          throttle(1000, asyncScheduler, { leading: false, trailing: true }),
          pluck("target", "value"),
        ).subscribe(value => $result.innerHTML = value);
      };

      // throttleForLast()

      const throttleForBoth = () => {
        fromEvent($myInput, "input").pipe(
          throttle(1000, asyncScheduler, { leading: true, trailing: true }),
          pluck("target", "value"),
        ).subscribe(value => $result.innerHTML = value);
      };

      // throttleForBoth();
    </script>
  </body>
</html>
```



<br/>

[🔺 Top](#top)

<hr/><br/>



##### 06
# 06. 스트림을 결합하는 생성자 및 연산자

## 06-01. ``merge`` 생성자

인자로 복수의 ``Observable`` 을 전달하고, 전달받은 모든 ``Observable`` 을 하나로 합쳐진 ``Observable`` 을 생성 합니다.

인자의 마지막에 ``Number`` 를 입력하게 되면, 한번에 병합할 개수를 지정하게 됩니다.

병합개수를 지정하게 되면, 기존의 ``Observable`` 이 ``complete()`` 되어야, 다음 ``Observable`` 이 병합됩니다.

```javascript
const { interval, merge } = require("rxjs");
const { take, map } = require("rxjs/operators");

const obs1$ = interval(1000).pipe(
  take(5),
  map(() => "* interval 1"),
);

const obs2$ = interval(1000).pipe(
  take(5),
  map(() => "** interval 2"),
);

const obs3$ = interval(1000).pipe(
  take(5),
  map(() => "*** interval 3"),
);

const obs4$ = interval(1000).pipe(
  take(5),
  map(() => "**** interval 4"),
);

const obs5$ = interval(1000).pipe(
  take(5),
  map(() => "***** interval 5"),
);

merge(
  obs1$,
  obs2$,
  obs3$,
  obs4$,
  obs5$,
  3
).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 06-02. ``concat`` 생성자

``concat`` 생성자는 ``merge`` 생성자에 병합개수를 ``1개``로 지정한 것과 같은 동작을 합니다.

즉, 현재 ``Observable`` 이 ``complete()`` 되어야, 다음 ``Observable`` 을 구독하는 방식 입니다.

```javascript
const { interval, concat } = require("rxjs");
const { take, map } = require("rxjs/operators");

const obs1 = interval(1000).pipe(
  take(5),
  map(() => "* interval 1"),
);

const obs2 = interval(1000).pipe(
  take(5),
  map(() => "* interval 2"),
);

const obs3 = interval(1000).pipe(
  take(5),
  map(() => "* interval 3"),
);

const obs4 = interval(1000).pipe(
  take(5),
  map(() => "* interval 4"),
);

const obs5 = interval(1000).pipe(
  take(5),
  map(() => "* interval 5"),
);

concat(
  obs1$,
  obs2$,
  obs3$,
  obs4$,
  obs5$,
).subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 06-03. ``mergeAll`` 연산자

``Observable`` 의 ``pipe`` 내에서 ``Observable`` 객체를 발행하는 경우, 모든 ``Observable``을 병합하여, 하나의 ``Observable``로 만들고 구독하게 됩니다.

```javascript
const { interval } = require("rxjs");
const { take, map, mergeAll } = require("rxjs/operators");

const obs$ = interval(1000).pipe(
  take(3),
  map(i => interval(Math.floor(Math.random() * 1000)).pipe(
    take(3),
    map(j => `[${i}-${j}]`),
  )),
  mergeAll(),
)

obs$.subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 06-04. ``mergeMap`` 연산자

``map()`` 연산자와 ``mergeAll()`` 연산자를 혼합한 형식의 연산자 입니다.

``mergeMap`` 에서 반환하는 ``Observable``들을 하나의 ``Observable``로 병합하여 구독하게 해줍니다.

```javascript
const { interval } = require("rxjs");
const { take, mergeMap, map } = require("rxjs/operators");

const obs$ = interval(1000).pipe(
  take(3),
  mergeMap(i => interval(Math.floor(Math.random() * 1000)).pipe(
    take(3),
    map(j => `[${i}-${j}]`),
  )),
);

obs$.subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 06-05. ``concatMap`` 연산자

``concatMap()`` 연산자에서 반환하는 ``Observable`` 들을 순서대로 구독 합니다.

현재 구독중인 ``Observable`` 이 ``complete()`` 되어야, 다음 ``Observable`` 을 구독합니다.

```javascript
const { interval } = require("rxjs");
const { take, concatMap, map } = require("rxjs/operators");

const obs$ = interval(1000).pipe(
  take(3),
  concatMap(i => interval(Math.floor(Math.random() * 1000)).pipe(
    take(3),
    map(j => `[${i}-${j}]`),
  )),
);

obs$.subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 06-06. ``switchMap`` 연산자

``switchMap`` 에서 반환하는 ``Observable`` 들을 순서대로 구독 합니다.

특징은, 현재 구독중인 ``Observable`` 에서 값을 발행 하다가, 다음 ``Observable`` 에서 값을 발행하게 되면, 현재 구독중인 ``Observable`` 을 구독해제 하고, 다음 ``Observable`` 의 값을 발행하게 됩니다.

결과적으로, 최신 ``Observable``의 값만 발행하는 형식 입니다.

```javascript
const { interval } = require("rxjs");
const { take, switchMap, map } = require("rxjs/operators");

const obs$ = interval(1000).pipe(
  take(3),
  switchMap(i => interval(Math.floor(Math.random() * 1000)).pipe(
    take(3),
    map(j => `[${i}-${j}]`),
  )),
);

obs$.subscribe(console.log);
```



<br/>

[🔺 Top](#top)

<hr/><br/>
