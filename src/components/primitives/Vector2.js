/*
	Author: LAB

	Vector2 class
	Used to model basic vector, together with basic vector arithmetic

    LICENSE: MIT
*/

"use strict";
var app = app || {};
(function() {
    app.Vector2 = class {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
            this.updateCache();
        }

        // Cache most calculation. Used on most mutable opt
        updateCache() {
            this.squaredLength = this.x * this.x + this.y * this.y;
            return this;
        }

        // Return a copy of this vector
        copy() {
            return new this.constructor(this.x, this.y);
        }

        // Dot product
        dot({x, y}) {
            return this.x * x + this.y * y;
        }

        // Mutable add
        mAdd({x, y}) {
            this.x += x;
            this.y += y;
            return this.updateCache();
        }

        // Mutable subtraction
        mSub({x, y}) {
            this.x -= x;
            this.y -= y;
            return this.updateCache();
        }

        // Mutable scaling
        mScale(x, y) {
            this.x *= x;
            this.y *= y;
            return this.updateCache();
        }

        // Immutable add
        iAdd({x, y}) {
            return new this.constructor(this.x + x, this.y + y);
        }

        // Immutable subtraction
        iSub({x, y}) {
            return new this.constructor(this.x - x, this.y - y);
        }

        // Immutable multiplication
        iMul(scalar) {
            return new this.constructor(this.x * scalar, this.y * scalar);
        }
    };
}());
