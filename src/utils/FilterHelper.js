/*
	Author: LAB
	Helper methods singleton. Generic and not opinionated

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {

    const {Vector2} = app;

    app.FilterHelper = {
        migrateRGBA(i, j, src, dst) {
            dst.data[j] = src.data[i];
            dst.data[j + 1] = src.data[i + 1];
            dst.data[j + 2] = src.data[i + 2];
            dst.data[j + 3] = src.data[i + 3];
        },
        /* Convert source to pollar coordinates
        // Adapted from https://github.com/konvajs/konva/blob/bdc3a2d30e90685f0b80204b4ce7976a95dfe0ba/src/filters/Kaleidoscope.js#L19
        opt = {
            polarCenterX, // center of the circle
            polarCenterY // center of the circle
        }
        */
        toPolar(src, dst, opt) {
            const size = opt.size || new Vector2(src.width, src.height);

            const mid = opt.mid || new Vector2(size.x / 2, size.y / 2);

            const center = size.iSub(mid);

            // Find the largest radius
            const rMax = Math.sqrt(
                center.squaredLength > mid.squaredLength
                ? center.squaredLength
                : mid.squaredLength);

            let x,
                y;

            // We'll be uisng y as the radius, and x as the angle (theta=t)
            let rSize = size.y,
                tSize = size.x,
                radius,
                theta;

            // We want to cover all angles (0-360) and we need to convert to
            // radians (*PI/180)
            let conversion = 360 / tSize * Math.PI / 180,
                tAngle,
                sin,
                cos;

            for (theta = 0; theta < tSize; theta += 1) {
                tAngle = theta * conversion;
                sin = Math.sin(tAngle);
                cos = Math.cos(tAngle);
                for (radius = 0; radius < rSize; radius += 1) {
                    x = Math.floor(mid.x + rMax * radius / rSize * cos);
                    y = Math.floor(mid.y + rMax * radius / rSize * sin);

                    app.FilterHelper.migrateRGBA((y * size.x + x) * 4, (theta + radius * tSize) * 4, src, dst);
                }
            }
        },

        /*
        Convert image data from polar coordinates back to Cartesian
        // Adapted from https://github.com/konvajs/konva/blob/bdc3a2d30e90685f0b80204b4ce7976a95dfe0ba/src/filters/Kaleidoscope.js#L96
        opt = {
            polarCenterX, // center of the circle
            polarCenterY, // center of the circle
            polarRotation // amount to rotate the image ccw
        }
        */
        fromPolar(src, dst, opt) {

            // Find the largest radius
            const size = opt.size || new Vector2(src.width, src.height);

            const mid = opt.mid || new Vector2(size.x / 2, size.y / 2);

            const center = size.iSub(mid);

            // Find the largest radius
            const rMax = Math.sqrt(
                center.squaredLength > mid.squaredLength
                ? center.squaredLength
                : mid.squaredLength);

            let x,
                y,
                dx,
                dy;

            // We'll be uisng x as the radius, and y as the angle (theta=t)
            let rSize = size.y,
                tSize = size.x,
                radius,
                theta,
                phaseShift = opt.polarRotation || 0;

            let t1,
                r1;

            for (x = 0; x < size.x; x += 1) {
                for (y = 0; y < size.y; y += 1) {
                    dx = x - mid.x;
                    dy = y - mid.y;
                    radius = Math.sqrt(dx * dx + dy * dy) * rSize / rMax;
                    theta = (Math.atan2(dy, dx) * 180 / Math.PI + 360 + phaseShift) % 360;

                    theta = theta * tSize / 360;

                    t1 = Math.floor(theta);
                    r1 = Math.floor(radius);

                    app.FilterHelper.migrateRGBA((r1 * tSize + t1) * 4, (y * size.x + x) * 4, src, dst);
                }
            }
        }
    };
}());
