import assert from 'assert';
import { describe, it } from 'mocha';

import BezierEase from '../source/BezierEase';
import Interval from '../source/Interval';



function _testInterval(t0, tDelta, n0, nDelta) {
	const ease = BezierEase.Linear();
	const iv = new Interval(t0, tDelta, n0, nDelta, ease);

	for (let f = -1.00; f <= 2.0; f += 0.02) {
		const t = t0 + f * tDelta;
		const n = Math.min(Math.max(n0 + nDelta * f, n0), n0 + nDelta);
		const ret = iv.nOfT(t);

		assert(Math.abs(ret - n) < 1.0e-4, `t: ${ t } returned n: ${ ret }, expected n: ${ n }`);
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