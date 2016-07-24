import ds from './drawSpline';
import ac from './applyCurves';
import dh from './drawHistogram';

export const round = (int, dec = 2) => parseFloat(int.toFixed(dec));
export const drawSpline = ds;
export const applyCurves = ac;
export const drawHistogram = dh;