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
        }

        // Return a copy of this vector
        copy() {
            return new this.constructor(this.x, this.y);
        }

        // Mutable add
        mAdd({x, y}) {
            this.x += x;
            this.y += y;
        }

        dot({x, y}) {
            return this.x * x + this.y * y;
        }

        iSub({x, y}) {
            return new this.constructor(this.x - x, this.y - y);
        }

        // Immutable add
        iAdd({x, y}) {
            return new this.constructor(this.x + x, this.y + y);
        }

        mScale(x, y) {
            this.x *= x;
            this.y *= y;
        }

        // Immutable mul
        iMul(scalar) {
            return new this.constructor(this.x * scalar, this.y * scalar);
        }
    };
}());
