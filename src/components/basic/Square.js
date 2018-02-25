/*
	Author: LAB

	Square module.
	Used to draw square into the canvas.

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {Vector2} = app;
    app.Square = class {
        constructor(pos = new Vector2(), size = 10, color = 'white') {
            this.pos = pos;
            this.size = size;
            this.halfSize = size / 2;
            this.color = color;
        }

        // Set the desired size of the square, together with its hafl-size
        setSize(size) {
            this.size = size;
            this.halfSize = size / 2;
            return this;
        }

        // Set the color of the square
        setColor(color) {
            this.color = color;
            return this;
        }

        draw(ctx) {
            ctx.save();
            ctx.fillStyle = this.color;

            ctx.fillRect(
                this.pos.x - this.halfSize,
                this.pos.y - this.halfSize,
                this.size,
                this.size
            );

            ctx.fill();
            ctx.restore();
        }
    };
}());
