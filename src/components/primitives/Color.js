/*
	Author: LAB

	Color class
	Used to model rgba color with different format.

    LICENSE: MIT
*/

"use strict";
var app = app || {};
(function() {
    app.Color = class {
        constructor(r = 0, g = 0, b = 0, a = 0.6) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;

            this.value = `rgba(${this.r},${this.g},${this.b},${this.a})`;
        }

        // Invert and mutate the instance
        mInvert() {
            this.r = 255 - this.r;
            this.g = 255 - this.g;
            this.b = 255 - this.b;

            this.value = `rgba(${this.r},${this.g},${this.b},${this.a})`;
        }

        // Return a custom alpha color
        customAlpha(a) {
            return `rgba(${this.r},${this.g},${this.b},${a})`;
        }

        // Invert the color and return a new instance
        iInvert() {
            return new this.constructor(255 - this.r, 255 - this.g, 255 - this.b, this.a);
        }
    };
}());
