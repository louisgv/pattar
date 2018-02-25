/*
	Author: LAB

	Triangle module
    Used to handle drawing a equilateral triangle

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {Vector2} = app;
    app.Triangle = class {
        constructor(pos = new Vector2(), size = 1, color = 'white') {
            this.pos = pos;
            this.size = size;
            this.color = color;
        }
        // Set the size of the trangle
        setSize(size) {
            this.size = size;
            return this;
        }
        // Set the color of the triangle
        setColor(color) {
            this.color = color;
            return this;
        }
        // Draw the triangle to the context
        draw(ctx) {
            ctx.save();

            ctx.fillStyle = this.color;

            ctx.beginPath();

            ctx.moveTo(this.pos.x, this.pos.y - this.size);
            ctx.lineTo(this.pos.x - this.size, this.pos.y + this.size);
            ctx.lineTo(this.pos.x + this.size, this.pos.y + this.size);

            ctx.closePath();
            ctx.fill();

            ctx.restore();
        }
    };
}());
