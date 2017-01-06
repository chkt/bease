"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _x = new WeakMap();
var _y = new WeakMap();
var _abcx = new WeakMap();
var _abcy = new WeakMap();
var _tx = new WeakMap();
var _ty = new WeakMap();

/**
 * Builds and returns the values of terms a,b,c associated with n1,n2 for nn
 * @private
 * @param {WeakMap} abcn - The term map
 * @param {WeakMap} nn - The coordinate map
 * @returns {number[]}
 */
function _buildABCN(abcn, nn) {
	var _nn$get = nn.get(this);

	var _nn$get2 = _slicedToArray(_nn$get, 2);

	var n0 = _nn$get2[0];
	var n1 = _nn$get2[1];


	var abc = [1.0 - 3.0 * n1 + 3.0 * n0, 3.0 * n1 - 6.0 * n0, 3.0 * n0];

	abcn.set(this, abc);

	return abc;
}

/**
 * Builds and returns the lookup table for abc
 * @private
 * @param {WeakMap} tn - The lookup table map
 * @param {number[]} abc - The terms
 * @returns {number[]}
 */
function _buildTN(tn, abc) {
	var t = [];

	for (var i = 0; i < 11; i += 1) {
		var f = 0.1 * i;

		t[i] = ((abc[0] * f + abc[1]) * f + abc[2]) * f;
	}

	tn.set(this, t);

	return t;
}

/**
 * Returns the t of n
 * Using Newton-Raphson iteration
 * @private
 * @param {number} n - The n coordinate
 * @param {number} t - The lookup table approximation of t(n)
 * @param {number} d - The first derivate of t(n)
 * @param {number} a - The value of term a of n
 * @param {number} b - The value of term b of n
 * @param {number} c - The value of term c of n
 * @returns {number}
 */
function _subdivideNewton(n, t, d, a, b, c) {
	for (var i = 0; i < 4; i += 1) {
		t -= (((a * t + b) * t + c) * t - n) / d;
		d = (3.0 * a * t + 2.0 * b) * t + c;

		if (d === 0.0) break;
	}

	return t;
}

/**
 * Returns the t of n
 * Using binary subdivision
 * @private
 * @param {number} n - The n coordinate
 * @param {number} a - The first interval limit
 * @param {number} b - The second interval limit
 * @param {number} an - The value of term a of n
 * @param {number} bn - The value of term b of n
 * @param {number} cn - The value of term c of n
 * @returns {number}
 */
function _subdivideN(n, a, b, an, bn, cn) {
	var t = void 0;

	for (var i = 0; i < 10; i += 1) {
		t = a + (b - a) * 0.5;

		var c = ((an * t + bn) * t + cn) * t - n;

		if (c > 1.0e-8) b = t;else if (c < -1.0e-8) a = t;else break;
	}

	return t;
}

/**
 * Returns the t of n
 * Using Newton-Raphson iteration when suitable, binary subdivision otherwise
 * p(n+1) = pn - f(pn) / f'(pn)
 * @private
 * @param {WeakMap} _abcn - The term map
 * @param {WeakMap} _tn - The lookup table map
 * @param {WeakMap} _n - The coordinate map
 * @param {number} n - The x coordinate
 * @returns {number}
 */
function _tOfN(_abcn, _tn, _n, n) {
	var tn = _tn.get(this),
	    abcn = _abcn.get(this);

	if (tn === undefined) {
		if (abcn === undefined) abcn = _buildABCN.call(this, _abcn, _n);

		tn = _buildTN.call(this, _tn, abcn);
	}

	var _abcn2 = abcn;

	var _abcn3 = _slicedToArray(_abcn2, 3);

	var a = _abcn3[0];
	var b = _abcn3[1];
	var c = _abcn3[2];

	var i = void 0;

	for (i = 0; i < 10; i += 1) {
		if (tn[i] > n) break;
	}

	i -= 1;

	var ti = i * 0.1;
	var t = ti + (n - tn[i]) / (tn[i + 1] - tn[i]) * 0.1;
	var d = (3.0 * a * t + 2.0 * b) * t + c;

	if (d > 0.2) return _subdivideNewton(n, t, d, a, b, c);else if (d === 0.0) return t;else return _subdivideN(n, ti, ti + 0.1, a, b, c);
}

/**
 * Bezier easing curve
 */

var BezierEase = function () {
	_createClass(BezierEase, null, [{
		key: "Define",


		/**
   * Returns a defined instance
   * @constructor
   * @param {number} x1 - The x coordinate of the second control point
   * @param {number} y1 - The y coordinate of the second control point
   * @param {number} x2 - The x coordinate of the third control point
   * @param {number} y2 - The y coordinate of the third control point
   * @param {BezierEase} [target] - The target instance
   * @returns {BezierEase}
   */
		value: function Define(x1, y1, x2, y2, target) {
			if (target === undefined) target = new this(x1, y1, x2, y2);else this.call(target, x1, y1, x2, y2);

			return target;
		}

		/**
   * Returns a instance representing the (0.0,0.0,1.0,1.0) bezier curve
   * @param {BezierEase} [target] - The target instance
   * @returns {BezierEase}
   */

	}, {
		key: "Linear",
		value: function Linear(target) {
			return this.Define(0.0, 0.0, 1.0, 1.0, target);
		}

		/**
   * Returns a instance representing the (0.25,0.1,0.25,1.0) bezier curve
   * @param {BezierEase} [target] - The target instance
   * @returns {BezierEase}
   */

	}, {
		key: "Ease",
		value: function Ease(target) {
			return this.Define(0.25, 0.1, 0.25, 1.0, target);
		}

		/**
   * Returns a instance representing the (0.42,0.0,1.0,1.0) bezier curve
   * @param {BezierEase} [target] - The target instance
   * @returns {BezierEase}
   */

	}, {
		key: "EaseIn",
		value: function EaseIn(target) {
			return this.Define(0.42, 0.0, 1.0, 1.0, target);
		}

		/**
   * Returns a instance representing the (0.0,0.0,0.58,1.0) bezier curve
   * @param {BezierEase} [target] - The target instance
   * @returns {BezierEase}
   */

	}, {
		key: "EaseOut",
		value: function EaseOut(target) {
			return this.Define(0.0, 0.0, 0.58, 1.0, target);
		}

		/**
   * Returns a instance representing the (0.42,0.0,0.58,1.0) bezier curve
   * @param {BezierEase} [target] - The target instance
   * @returns {BezierEase}
   */

	}, {
		key: "EaseInOut",
		value: function EaseInOut(target) {
			return this.Define(0.42, 0.0, 0.58, 1.0, target);
		}

		/**
   * Returns true if a == b, false otherwise
   * @param {BezierEase} a - The protagonist
   * @param {BezierEase} b - The antagonist
   * @returns {boolean}
   */

	}, {
		key: "isEQ",
		value: function isEQ(a, b) {
			if (a === b) return true;

			var _x$get = _x.get(a);

			var _x$get2 = _slicedToArray(_x$get, 2);

			var ax1 = _x$get2[0];
			var ax2 = _x$get2[1];
			var _y$get = _y.get(a);

			var _y$get2 = _slicedToArray(_y$get, 2);

			var ay1 = _y$get2[0];
			var ay2 = _y$get2[1];

			var _x$get3 = _x.get(b);

			var _x$get4 = _slicedToArray(_x$get3, 2);

			var bx1 = _x$get4[0];
			var bx2 = _x$get4[1];
			var _y$get3 = _y.get(b);

			var _y$get4 = _slicedToArray(_y$get3, 2);

			var by1 = _y$get4[0];
			var by2 = _y$get4[1];


			return ax1 === bx1 && ax2 === bx2 && ay1 === by1 && ay2 === by2;
		}

		/**
   * Creates a new instance
   * @param {number} x0 - The x coordinate of the second control point
   * @param {number} y0 - The y coordinate of the second control point
   * @param {number} x1 - The x coordinate of the third control point
   * @param {number} y1 - The y coordinate of the third control point
   */

	}]);

	function BezierEase(x0, y0, x1, y1) {
		_classCallCheck(this, BezierEase);

		_x.set(this, [x0, x1]);
		_y.set(this, [y0, y1]);

		_abcx.delete(this);
		_abcy.delete(this);
		_tx.delete(this);
		_ty.delete(this);
	}

	/**
  * Redefines the instance
  * @param {number} x1 - The x coordinate of the second control point
  * @param {number} y1 - The y coordinate of the second control point
  * @param {number} x2 - The x coordinate of the third control point
  * @param {number} y2 - The y coordinate of the third control point
  * @returns {BezierEase}
  */


	_createClass(BezierEase, [{
		key: "define",
		value: function define(x1, y1, x2, y2) {
			this.constructor.call(x1, y1, x2, y2);

			return this;
		}

		/**
   * The x coordinate of the second control point
   * @type number
   */

	}, {
		key: "xOfT",


		/**
   * Returns the x of t
   * p(t) = (1-t)³p0 + 3t(1-t)²p1 + 3t²(1-t)p2 + t³p3 =>
   * 3t(1-t)²p1 + 3t²(1-t)p2 + t³  <=> (1-3p2+3p1)t³ + (3p2-6p1)t² + (3p1)t =>
   * at³ + bt² + ct
   * @param {number} t - The time
   * @returns {number}
   */
		value: function xOfT(t) {
			var abc = _abcx.get(this);

			if (abc === undefined) abc = _buildABCN.call(this, _abcx, _x);

			return ((abc[0] * t + abc[1]) * t + abc[2]) * t;
		}

		/**
   * Returns the y of t
   * p(t) = (1-t)³p0 + 3t(1-t)²p1 + 3t²(1-t)p2 + t³p3 =>
   * 3t(1-t)²p1 + 3t²(1-t)p2 + t³ <=> (1-3p2+3p1)t³ + (3p2-6p1)t² + (3p1)t =>
   * at³ + bt² + ct
   * @param {number} t - The time
   * @returns {number}
   */

	}, {
		key: "yOfT",
		value: function yOfT(t) {
			var abc = _abcy.get(this);

			if (abc === undefined) abc = _buildABCN.call(this, _abcy, _y);

			return ((abc[0] * t + abc[1]) * t + abc[2]) * t;
		}

		/**
   * Returns the t of x
   * @param {number} x - The x coordinate
   * @returns {number}
   */

	}, {
		key: "tOfX",
		value: function tOfX(x) {
			return _tOfN.call(this, _abcx, _tx, _x, x);
		}

		/**
   * Returns the t of y
   * @param {number} y - The y coordinate
   * @returns {number}
   */

	}, {
		key: "tOfY",
		value: function tOfY(y) {
			return _tOfN.call(this, _abcy, _ty, _y, y);
		}

		/**
   * Returns the x of y
   * @param {number} y - The y coordinate
   * @returns {number}
   */

	}, {
		key: "xOfY",
		value: function xOfY(y) {
			return this.xOfT(this.tOfY(y));
		}

		/**
   * Returns the y of x
   * @param {number} x - The x coordinate
   * @returns {number}
   */

	}, {
		key: "yOfX",
		value: function yOfX(x) {
			return this.yOfT(this.tOfX(x));
		}

		/**
   * Returns a string representation of the instance
   * @returns {string}
   */

	}, {
		key: "toString",
		value: function toString() {
			var digits = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];

			var x = _x.get(this),
			    y = _y.get(this);

			return "[BezierEase](" + x[0] + " " + y[0] + ")(" + x[1] + " " + y[1] + ")";
		}
	}, {
		key: "x1",
		get: function get() {
			return _x.get(this)[0];
		},
		set: function set(x) {
			var cx = _x.get(this);

			if (cx[0] === x) return;

			cx[0] = x;

			_abcx.delete(this);
			_tx.delete(this);
		}

		/**
   * The y coordinate of the second control point
   * @type number
   */

	}, {
		key: "y1",
		get: function get() {
			return _y.get(this)[0];
		},
		set: function set(y) {
			var cy = _y.get(this);

			if (cy[0] === y) return;

			cy[0] = y;

			_abcy.delete(this);
			_ty.delete(this);
		}

		/**
   * The x coordinate of the third control point
   * @type number
   */

	}, {
		key: "x2",
		get: function get() {
			return _x.get(this)[1];
		},
		set: function set(x) {
			var cx = _x.get(this);

			if (cx[1] === x) return;

			cx[1] = x;

			_abcx.delete(this);
			_tx.delete(this);
		}

		/**
   * The y coordinate of the third control point
   * @type number
   */

	}, {
		key: "y2",
		get: function get() {
			return _y.get(this)[1];
		},
		set: function set(y) {
			var cy = _y.get(this);

			if (cy[1] === y) return;

			cy[1] = y;

			_abcy.delete(this);
			_ty.delete(this);
		}
	}]);

	return BezierEase;
}();

exports.default = BezierEase;