import spline from 'cubic-spline';
import { round } from './index';

export default (originalImageData, canvas, ctx, curves) => {
    if (!canvas || !ctx) return;

    window.requestAnimationFrame(() => {
        let curvesData = { a: [], r: [], g: [], b: [] };
        let imageData = new Uint8ClampedArray(originalImageData);

        for (let i = 0; i < 256; i++) {
            curvesData.a.push(parseInt(spline(round(i / 256), curves.a.xs, curves.a.ys) * 256));
            curvesData.r.push(parseInt(spline(round(i / 256), curves.r.xs, curves.r.ys) * 256));
            curvesData.g.push(parseInt(spline(round(i / 256), curves.g.xs, curves.g.ys) * 256));
            curvesData.b.push(parseInt(spline(round(i / 256), curves.b.xs, curves.b.ys) * 256));
        }

        for (let i = 0; i < imageData.length; i += 4) {
            imageData[i]   = curvesData.r[imageData[i]];
            imageData[i+1] = curvesData.g[imageData[i+1]];
            imageData[i+2] = curvesData.b[imageData[i+2]];

            imageData[i]   = curvesData.a[imageData[i]];
            imageData[i+1] = curvesData.a[imageData[i+1]];
            imageData[i+2] = curvesData.a[imageData[i+2]];
        }

        ctx.putImageData(new ImageData(imageData, canvas.width, canvas.height), 0, 0);
    });
};