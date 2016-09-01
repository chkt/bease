import assert from 'assert';
import { describe, it } from 'mocha';

import BezierEase from '../source/BezierEase';



function _testEpsilon(ease, x, y) {
	assert(Math.abs(ease.yOfX(x) - y) < 1.0e-4, `x:${ x.toFixed(4) } returned y:${ ease.yOfX(x).toFixed(4) }, expected y:${ y.toFixed(4) }`);
}



describe('BezierEase', () => {
	describe('#yOfX', () => {
		it("should return linear scaling values for a linear easing curve", () => {
			const ease = BezierEase.Linear();

			for (let i = 1; i < 50; i += 1) {
				const n = i * 0.02;

				_testEpsilon(ease, n, n);
			}
		});

		it("should return correct scaling values for a easeinout easing curve", () => {
			const ease = BezierEase.EaseInOut();
			const y = [
				0.0008, 0.0031, 0.0070, 0.0125, 0.0197,
				0.0286, 0.0393, 0.0516, 0.0657, 0.0816,
				0.0993, 0.1188, 0.1400, 0.1628, 0.1874,
				0.2136, 0.2411, 0.2701, 0.3005, 0.3319,
				0.3643, 0.3975, 0.4313, 0.4655, 0.5000,
				0.5344, 0.5687, 0.6025, 0.6358, 0.6681,
				0.6995, 0.7298, 0.7582, 0.7865, 0.8126,
				0.8372, 0.8600, 0.8812, 0.9007, 0.9184,
				0.9342, 0.9484, 0.9608, 0.9714, 0.9803,
				0.9875, 0.9929, 0.9969, 0.9992
			];

			for (let i = i; i < 50; i += 1) _testEpsilon(ease, i * 0.02, y[i - 1]);
		});
	});
});
