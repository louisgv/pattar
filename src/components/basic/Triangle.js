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
        constructor(pos = new Vector2(), size = 1) {
            this.pos = pos;
            this.size = size;
        }
        // Set the size of the trangle
        setSize(size) {
            this.size = size;
            return this;
        }

        // Draw the triangle to the context
        draw(ctx, fillStyle = 'black', strokeStyle = null) {
            ctx.save();

            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;
            
            ctx.beginPath();
            ctx.moveTo(this.pos.x, this.pos.y - this.size);
            ctx.lineTo(this.pos.x - this.size, this.pos.y + this.size);
            ctx.lineTo(this.pos.x + this.size, this.pos.y + this.size);
            ctx.closePath();

            if (fillStyle) {
                ctx.fill();
            }

            if (strokeStyle) {
                ctx.stroke();
            }

            ctx.restore();
        }
    };
}());
