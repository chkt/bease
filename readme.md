#ease

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
<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [xOfT](#xoft)
-   [BezierEase](#bezierease)
    -   [constructor](#constructor)
    -   [define](#define)
    -   [x1](#x1)
    -   [y1](#y1)
    -   [x2](#x2)
    -   [y2](#y2)
    -   [xOfT](#xoft-1)
    -   [yOfT](#yoft)
    -   [tOfX](#tofx)
    -   [tOfY](#tofy)
    -   [xOfY](#xofy)
    -   [yOfX](#yofx)
    -   [toString](#tostring)
    -   [Define](#define-1)
    -   [Linear](#linear)
    -   [Ease](#ease)
    -   [EaseIn](#easein)
    -   [EaseOut](#easeout)
    -   [EaseInOut](#easeinout)
    -   [isEQ](#iseq)
-   [Interval](#interval)
    -   [constructor](#constructor-1)
    -   [t0](#t0)
    -   [tDelta](#tdelta)
    -   [n0](#n0)
    -   [nDelta](#ndelta)
    -   [ease](#ease-1)
    -   [define](#define-2)
    -   [tN](#tn)
    -   [nN](#nn)
    -   [fOfT](#foft)
    -   [nOfT](#noft)
    -   [nOfF](#noff)
    -   [toString](#tostring-1)
    -   [Define](#define-3)
    -   [Extremes](#extremes)

## xOfT

p(t) = (1-t)³p0 + 3t(1-t)²p1 + 3t²(1-t)p2 + t³p3

**Parameters**

-   `t`  

## BezierEase

Bezier easing curve

### constructor

Creates a new instance

**Parameters**

-   `x0` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The x coordinate of the second control point
-   `y0` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The y coordinate of the second control point
-   `x1` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The x coordinate of the third control point
-   `y1` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The y coordinate of the third control point

### define

Redefines the instance

**Parameters**

-   `x1` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The x coordinate of the second control point
-   `y1` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The y coordinate of the second control point
-   `x2` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The x coordinate of the third control point
-   `y2` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The y coordinate of the third control point

Returns **[BezierEase](#bezierease)** 

### x1

The x coordinate of the second control point

### y1

The y coordinate of the second control point

### x2

The x coordinate of the third control point

### y2

The y coordinate of the third control point

### xOfT

Returns the x of t
p(t) = (1-t)³p0 + 3t(1-t)²p1 + 3t²(1-t)p2 + t³p3 =>
3t(1-t)²p1 + 3t²(1-t)p2 + t³  &lt;=> (1-3p2+3p1)t³ + (3p2-6p1)t² + (3p1)t =>
at³ + bt² + ct

**Parameters**

-   `t` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The time

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### yOfT

Returns the y of t
p(t) = (1-t)³p0 + 3t(1-t)²p1 + 3t²(1-t)p2 + t³p3 =>
3t(1-t)²p1 + 3t²(1-t)p2 + t³ &lt;=> (1-3p2+3p1)t³ + (3p2-6p1)t² + (3p1)t =>
at³ + bt² + ct

**Parameters**

-   `t` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The time

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### tOfX

Returns the t of x

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The x coordinate

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### tOfY

Returns the t of y

**Parameters**

-   `y` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The y coordinate

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### xOfY

Returns the x of y

**Parameters**

-   `y` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The y coordinate

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### yOfX

Returns the y of x

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The x coordinate

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### toString

Returns a string representation of the instance

**Parameters**

-   `digits`  

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### Define

Returns a defined instance

**Parameters**

-   `x1` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The x coordinate of the second control point
-   `y1` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The y coordinate of the second control point
-   `x2` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The x coordinate of the third control point
-   `y2` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The y coordinate of the third control point
-   `target` **[BezierEase](#bezierease)?** The target instance

Returns **[BezierEase](#bezierease)** 

### Linear

Returns a instance representing the (0.0,0.0,1.0,1.0) bezier curve

**Parameters**

-   `target` **[BezierEase](#bezierease)?** The target instance

Returns **[BezierEase](#bezierease)** 

### Ease

Returns a instance representing the (0.25,0.1,0.25,1.0) bezier curve

**Parameters**

-   `target` **[BezierEase](#bezierease)?** The target instance

Returns **[BezierEase](#bezierease)** 

### EaseIn

Returns a instance representing the (0.42,0.0,1.0,1.0) bezier curve

**Parameters**

-   `target` **[BezierEase](#bezierease)?** The target instance

Returns **[BezierEase](#bezierease)** 

### EaseOut

Returns a instance representing the (0.0,0.0,0.58,1.0) bezier curve

**Parameters**

-   `target` **[BezierEase](#bezierease)?** The target instance

Returns **[BezierEase](#bezierease)** 

### EaseInOut

Returns a instance representing the (0.42,0.0,0.58,1.0) bezier curve

**Parameters**

-   `target` **[BezierEase](#bezierease)?** The target instance

Returns **[BezierEase](#bezierease)** 

### isEQ

Returns true if a == b, false otherwise

**Parameters**

-   `a` **[BezierEase](#bezierease)** The protagonist
-   `b` **[BezierEase](#bezierease)** The antagonist

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## Interval

Transformation interval

### constructor

Creates a new instance

**Parameters**

-   `t0` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The first interval offset
-   `tDelta` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The interval duration
-   `n0` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The first interval state
-   `nDelta` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The interval magnitude
-   `ease` **[BezierEase](#bezierease)** The interval easing

### t0

The first interval state

### tDelta

The interval duration

### n0

The first interval state

### nDelta

The interval magnitude

### ease

The interval easing

### define

Redefines the instance

**Parameters**

-   `t0` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The first interval offset
-   `tDelta` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The interval duration
-   `n0` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The first interval state
-   `nDelta` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The interval magnitude
-   `ease` **[BezierEase](#bezierease)** The interval easing

Returns **[Interval](#interval)** 

### tN

The last interval offset

### nN

The last interval state

### fOfT

Returns the unclamped interval duration fraction

**Parameters**

-   `t` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The time

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### nOfT

Returns the clamped interval state

**Parameters**

-   `t` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The time

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### nOfF

Returns the unclamped interval state

**Parameters**

-   `f` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The interval duration fraction

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### toString

Returns a string representation of the instance

**Parameters**

-   `digits` **int?** The representation digits (optional, default `3`)

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### Define

Returns a defined instance

**Parameters**

-   `t0` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The first interval offset
-   `tDelta` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The interval duration
-   `n0` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The first interval state
-   `nDelta` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The interval magnitude
-   `ease` **[BezierEase](#bezierease)?** The interval easing
-   `target` **[Interval](#interval)?** The target instance

Returns **[Interval](#interval)** 

### Extremes

Returns an instance from interval extremes

**Parameters**

-   `t0` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The first interval offset
-   `tN` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The last interval offset
-   `n0` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The first interval state
-   `nN` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The last interval state
-   `ease` **[BezierEase](#bezierease)?** The interval easing
-   `target` **[Interval](#interval)?** The target instance

Returns **[Interval](#interval)** 
