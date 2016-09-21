import BezierEase from './BezierEase';



/**
 * Transformation interval
 */
export default class Interval {

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
	static Define(t0, tDelta, n0, nDelta, ease, target) {
		if (target === undefined) target = new this(t0, tDelta, n0, nDelta, ease);
		else this.call(target, t0, tDelta, n0, nDelta, ease);

		return target;
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
	static Extremes(t0, tN, n0, nN, ease, target) {
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
	constructor(t0, tDelta, n0, nDelta, ease) {
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
		this.ease = ease !== undefined ? ease : BezierEase.Linear();
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
	define(t0, tDelta, n0, nDelta, ease) {
		this.constructor.call(t0, tDelta, n0, nDelta, ease);

		return this;
	}


	/**
	 * The last interval offset
	 * @type {number}
	 */
	get tN() {
		return this.t0 + this.tDelta;
	}

	set tN(t) {
		this.tDelta = t - this.t0;
	}


	/**
	 * The last interval state
	 * @type {number}
	 */
	get nN() {
		return this.n0 + this.nDelta;
	}

	set nN(n) {
		this.nDelta = n - this.n0;
	}


	/**
	 * Returns the unclamped interval duration fraction
	 * @param {number} t - The time
	 * @returns {number}
	 */
	fOfT(t) {
		return (t - this.t0) / this.tDelta;
	}

	/**
	 * Returns the clamped interval state
	 * @param {number} t - The time
	 * @returns {number}
	 */
	nOfT(t) {
		let f = (t - this.t0) / this.tDelta;

		if (f <= 0.0) return this.n0;
		else if (f >= 1.0) return this.n0 + this.nDelta;
		else return this.n0 + this.nDelta * this.ease.yOfT(this.ease.tOfX(f));
	}

	/**
	 * Returns the unclamped interval state
	 * @param {number} f - The interval duration fraction
	 * @returns {number}
	 */
	nOfF(f) {
		return this.n0 + this.nDelta * this.ease.yOfT(this.ease.tOfX(f));
	}


	/**
	 * Returns a string representation of the instance
	 * @param {int} [digits=3] - The representation digits
	 * @returns {string}
	 */
	toString(digits = 3) {
		return `[Interval]${
				this.t0.toFixed(digits)
			} ${
				this.tDelta.toFixed(digits)
			} - ${
				this.n0.toFixed(digits)
			} ${
				this.nDelta.toFixed(digits)
			}`;
	}
}
