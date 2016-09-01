import assert from 'assert';
import { describe, it } from 'mocha';

import BezierEase from '../source/BezierEase';
import Interval from '../source/Interval';



function _testInterval(t0, tDelta, n0, nDelta) {
	const ease = BezierEase.Linear();
	const iv = new Interval(t0, tDelta, n0, nDelta, ease);

	for (let f = 0.02; f < 1.0; f += 0.02) {
		const t = t0 + f * tDelta;
		const n = n0 + nDelta * f;

		assert(iv.nOfT(t) - n < 1.0e-5, `t: ${ t.toFixed(4) } returned n: ${ iv.nOfT(t.toFixed(4)) }, expected n: ${ n.toFixed(4) }`);
	}
}



describe('Interval', () => {
	describe('#nOfT', () => {
		it("should return the clamped value of t", () => {
			_testInterval(0.0, 1.0, 0.0, 1.0);
			_testInterval(0.0, 100.0, 0.0, 100.0);
			_testInterval(-1.0, 1.0, -1.0, 1.0);
			_testInterval(-1.0, 1.0, 1.0, -1.0);
			_testInterval(1.0, -1.0, -1.0, 1.0);
			_testInterval(1.0, -1.0, 1.0, -1.0);
		});
	});
});