const _x = new WeakMap();
const _y = new WeakMap();
const _abcx = new WeakMap();
const _abcy = new WeakMap();
const _tx = new WeakMap();
const _ty = new WeakMap();



/**
 * Builds and returns the values of terms a,b,c associated with n1,n2 for nn
 * @private
 * @param {WeakMap} abcn - The term map
 * @param {WeakMap} nn - The coordinate map
 * @returns {number[]}
 */
function _buildABCN(abcn, nn) {
	const [n0, n1] = nn.get(this);

	const abc = [
		1.0 - 3.0 * n1 + 3.0 * n0,
		3.0 * n1 - 6.0 * n0,
		3.0 * n0
	];

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
	const t = [];

	for (let i = 0; i < 11; i += 1) {
		const f = 0.1 * i;

		t[i] = ((abc[0] * f + abc[1]) * f + abc[2]) * f;
	}

	tn.set(this, t);

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
	let t;

	for (let i = 0; i < 10; i += 1) {
		t = a + (b - a) * 0.5;

		const c = ((an * t + bn) * t + cn) * t - n;

		if (c > 1.0e-5) b = t;
		else if (c < -1.0e-5) a = t;
		else break;
	}

	return t;
}

/**
 * Returns the t of n
 * Using Newton-Raphson iteration when suitable
 * p(n+1) = pn - f(pn) / f'(pn)
 * @private
 * @param {WeakMap} _abcn - The term map
 * @param {WeakMap} _tn - The lookup table map
 * @param {WeakMap} _n - The coordinate map
 * @param {number} n - The x coordinate
 * @returns {number}
 */
function _tOfN(_abcn, _tn, _n, n) {
	let tn = _tn.get(this), abcn = _abcn.get(this);

	if (tn === undefined) {
		if (abcn === undefined) abcn = _buildABCN.call(this, _abcn, _n);

		tn = _buildTN.call(this, _tn, abcn);
	}

	const [a, b, c] = abcn;
	let i;

	for (i = 0; i < 10; i += 1) {
		if (tn[i] > n) break;
	}

	i -= 1;

	const ti = i * 0.1;
	let t = ti + (n - tn[i]) / (tn[i + 1] - tn[i]) * 0.1;
	let d = 3.0 * a * t * t + 2.0 * b * t + c;

	if (d < 0.21) return _subdivideN(n, ti, ti + 0.1, a, b, c);

	for (let i = 0; i < 4; i += 1) {
		t -= (((a * t + b) * t + c) * t - n) / d;
		d = 3.0 * a * t * t + 2.0 * b * t + c;

		if (d === 0.0) break;
	}

	return t;
}


/**
 * Bezier easing curve
 */
export default class BezierEase {

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
	static Define(x1, y1, x2, y2, target) {
		if (target === undefined) return new this(x1, y1, x2, y2);
		else this.call(target, x1, y1, x2, y2);
	}

	/**
	 * Returns a instance representing the (0.0,0.0,1.0,1.0) bezier curve
	 * @param {BezierEase} [target] - The target instance
	 * @returns {BezierEase}
	 */
	static Linear(target) {
		return this.Define(0.0, 0.0, 1.0, 1.0, target);
	}

	/**
	 * Returns a instance representing the (0.25,0.1,0.25,1.0) bezier curve
	 * @param {BezierEase} [target] - The target instance
	 * @returns {BezierEase}
	 */
	static Ease(target) {
		return this.Define(0.25, 0.1, 0.25, 1.0, target);
	}

	/**
	 * Returns a instance representing the (0.42,0.0,1.0,1.0) bezier curve
	 * @param {BezierEase} [target] - The target instance
	 * @returns {BezierEase}
	 */
	static EaseIn(target) {
		return this.Define(0.42, 0.0, 1.0, 1.0, target);
	}

	/**
	 * Returns a instance representing the (0.0,0.0,0.58,1.0) bezier curve
	 * @param {BezierEase} [target] - The target instance
	 * @returns {BezierEase}
	 */
	static EaseOut(target) {
		return this.Define(0.0, 0.0, 0.58, 1.0, target);
	}

	/**
	 * Returns a instance representing the (0.42,0.0,0.58,1.0) bezier curve
	 * @param {BezierEase} [target] - The target instance
	 * @returns {BezierEase}
	 */
	static EaseInOut(target) {
		return this.Define(0.42, 0.0, 0.58, 1.0, target);
	}



	/**
	 * Creates a new instance
	 * @param {number} x0 - The x coordinate of the second control point
	 * @param {number} y0 - The y coordinate of the second control point
	 * @param {number} x1 - The x coordinate of the third control point
	 * @param {number} y1 - The y coordinate of the third control point
	 */
	constructor(x0, y0, x1, y1) {
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
	define(x1, y1, x2, y2) {
		this.constructor.call(x1, y1, x2, y2);

		return this;
	}


	/**
	 * The x coordinate of the second control point
	 * @type number
	 */
	get x1() {
		return _x.get(this)[0];
	}

	set x1(x) {
		const cx = _x.get(this);

		if (cx[0] === x) return;

		cx[0] = x;

		_abcx.delete(this);
		_tx.delete(this);
	}


	/**
	 * The y coordinate of the second control point
	 * @type number
	 */
	get y1() {
		return _y.get(this)[0];
	}

	set y1(y) {
		const cy = _y.get(this);

		if (cy[0] === y) return;

		cy[0] = y;

		_abcy.delete(this);
		_ty.delete(this);
	}


	/**
	 * The x coordinate of the third control point
	 * @type number
	 */
	get x2() {
		return _x.get(this)[1];
	}

	set x2(x) {
		const cx = _x.get(this);

		if (cx[1] === x) return;

		cx[1] = x;

		_abcx.delete(this);
		_tx.delete(this);
	}


	/**
	 * The y coordinate of the third control point
	 * @type number
	 */
	get y2() {
		return _y.get(this)[1];
	}

	set y2(y) {
		const cy = _y.get(this);

		if (cy[1] === y) return;

		cy[1] = y;

		_abcy.delete(this);
		_ty.delete(this);
	}


	/**
	 * Returns the x of t
	 * p(t) = (1-t)³p0 + 3t(1-t)²p1 + 3t²(1-t)p2 + t³p3 =>
	 * 3t(1-t)²p1 + 3t²(1-t)p2 + t³  <=> (1-3p2+3p1)t³ + (3p2-6p1)t² + (3p1)t =>
	 * at³ + bt² + ct
	 * @param {number} t - The time
	 * @returns {number}
	 */
	xOfT(t) {
		let abc = _abcx.get(this);

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
	yOfT(t) {
		let abc = _abcy.get(this);

		if (abc === undefined) abc = _buildABCN.call(this, _abcy, _y);

		return ((abc[0] * t + abc[1]) * t + abc[2]) * t;
	}


	/**
	 * Returns the t of x
	 * @param {number} x - The x coordinate
	 * @returns {number}
	 */
	tOfX(x) {
		return _tOfN.call(this, _abcx, _tx, _x, x);
	}

	/**
	 * Returns the t of y
	 * @param {number} y - The y coordinate
	 * @returns {number}
	 */
	tOfY(y) {
		return _tOfN.call(this, _abcy, _ty, _y, y);
	}


	/**
	 * Returns the x of y
	 * @param {number} y - The y coordinate
	 * @returns {number}
	 */
	xOfY(y) {
		return this.xOfT(this.tOfY(y));
	}

	/**
	 * Returns the y of x
	 * @param {number} x - The x coordinate
	 * @returns {number}
	 */
	yOfX(x) {
		return this.yOfT(this.tOfX(x));
	}


	/**
	 * Returns true if a == b, false otherwise
	 * @param {BezierEase} a - The protagonist
	 * @param {BezierEase} b - The antagonist
	 * @returns {boolean}
	 */
	isEQ(a, b) {
		if (a === b) return true;

		const [ax1, ax2] = _x.get(a), [ay1, ay2] = _y.get(a);
		const [bx1, bx2] = _x.get(b), [by1, by2] = _y.get(b);

		return ax1 === bx1 && ax2 === bx2 && ay1 === by1 && ay2 === by2;
	}


	/**
	 * Returns a string representation of the instance
	 * @returns {string}
	 */
	toString(digits = 3) {
		const x = _x.get(this), y = _y.get(this);

		return `[BezierEase](${ x[0]} ${ y[0] })(${ x[1] } ${ y[1] })`;
	}
}
