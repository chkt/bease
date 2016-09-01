'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BezierEase = require('./BezierEase');

var _BezierEase2 = _interopRequireDefault(_BezierEase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Transformation interval
 */
var Interval = function () {
	_createClass(Interval, null, [{
		key: 'Define',


		/**
   * Returns a defined instance
   * @constructor
   * @param {number} t0 - The first interval offset
   * @param {number} tDelta - The interval duration
   * @param {number} n0 - The first interval state
   * @param {number} nDelta - The interval magnitude
   * @param {BezierEase} [ease] - The interval easing
   * @param {Interval} [target] - The target instance
   * @returns {Interval}
   */
		value: function Define(t0, tDelta, n0, nDelta, ease, target) {
			if (target === undefined) return new this(t0, tDelta, n0, nDelta, ease);else return this.call(target, t0, tDelta, n0, nDelta, ease);
		}

		/**
   * Returns an instance from interval extremes
   * @constructor
   * @param {number} t0 - The first interval offset
   * @param {number} tN - The last interval offset
   * @param {number} n0 - The first interval state
   * @param {number} nN - The last interval state
   * @param {BezierEase} [ease] - The interval easing
   * @param {Interval} [target] - The target instance
   * @returns {Interval}
   */

	}, {
		key: 'Extremes',
		value: function Extremes(t0, tN, n0, nN, ease, target) {
			return this.Define(t0, tN - t0, n0, nN - n0, ease, target);
		}

		/**
   * Creates a new instance
   * @param {number} t0 - The first interval offset
   * @param {number} tDelta - The interval duration
   * @param {number} n0 - The first interval state
   * @param {number} nDelta - The interval magnitude
   * @param {BezierEase} ease - The interval easing
   */

	}]);

	function Interval(t0, tDelta, n0, nDelta, ease) {
		_classCallCheck(this, Interval);

		/**
   * The first interval state
   * @type {number}
   */
		this.t0 = t0;
		/**
   * The interval duration
   * @type {number}
   */
		this.tDelta = tDelta;
		/**
   * The first interval state
   * @type {number}
   */
		this.n0 = n0;
		/**
   * The interval magnitude
   * @type {number}
   */
		this.nDelta = nDelta;
		/**
   * The interval easing
   * @type {BezierEase}
   */
		this.ease = ease !== undefined ? ease : _BezierEase2.default.Linear();
	}

	/**
  * Redefines the instance
  * @param {number} t0 - The first interval offset
  * @param {number} tDelta - The interval duration
  * @param {number} n0 - The first interval state
  * @param {number} nDelta - The interval magnitude
  * @param {BezierEase} ease - The interval easing
  * @returns {Interval}
  */


	_createClass(Interval, [{
		key: 'define',
		value: function define(t0, tDelta, n0, nDelta, ease) {
			this.constructor.call(t0, tDelta, n0, nDelta, ease);

			return this;
		}

		/**
   * The last interval offset
   * @type {number}
   */

	}, {
		key: 'fOfT',


		/**
   * Returns the unclamped interval duration fraction
   * @param {number} t - The time
   * @returns {number}
   */
		value: function fOfT(t) {
			return (t - this.t0) / this.tDelta;
		}

		/**
   * Returns the clamped interval state
   * @param {number} t - The time
   * @returns {number}
   */

	}, {
		key: 'nOfT',
		value: function nOfT(t) {
			var f = (t - this.t0) / this.tDelta;

			f = f < 0.0 ? 0.0 : f > 1.0 ? 1.0 : f;

			return this.n0 + this.nDelta * this.ease.yOfT(this.ease.tOfX(f));
		}

		/**
   * Returns the unclamped interval state
   * @param {number} f - The interval duration fraction
   * @returns {number}
   */

	}, {
		key: 'nOfF',
		value: function nOfF(f) {
			return this.n0 + this.nDelta * this.ease.yOfT(this.ease.tOfX(f));
		}

		/**
   * Returns a string representation of the instance
   * @param {int} [digits=3] - The representation digits
   * @returns {string}
   */

	}, {
		key: 'toString',
		value: function toString() {
			var digits = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];

			return '[Interval]' + '\t' + this.t0.toFixed(digits) + ' ' + this.tDelta.toFixed(digits) + '\t' + this.n0.toFixed(digits) + ' ' + this.nDelta.toFixed(digits);
		}
	}, {
		key: 'tN',
		get: function get() {
			return this.t0 + this.tDelta;
		},
		set: function set(t) {
			this.tDelta = t - this.t0;
		}

		/**
   * The last interval state
   * @type {number}
   */

	}, {
		key: 'nN',
		get: function get() {
			return this.n0 + this.nDelta;
		},
		set: function set(n) {
			this.nDelta = n - this.n0;
		}
	}]);

	return Interval;
}();

exports.default = Interval;