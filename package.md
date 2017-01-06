#bease

##Install

```sh
$ npm install bease
```

##Use

```js
import Ease from 'ease/source/BezierEase';
import Interval from 'ease/source/Interval';

const ease = Ease.EaseIn();

const y = ease.yOfX(0.5);


const interval = new Interval(0.0, 60.0, 0.0, 100.0, ease);
 
const n = interval.nOfT(30.0);
```
