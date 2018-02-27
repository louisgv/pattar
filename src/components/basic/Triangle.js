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
        constructor(pos = new Vector2(), size = 1, rotation = 0) {
            this.pos = pos;
            this.size = size;
            this.rotation = rotation;
        }
        // Set the size of the trangle
        setSize(size) {
            this.size = size;
            return this;
        }

        setRotation(rotation) {
            this.rotation = rotation;
            return this;
        }

        // Draw the triangle to the context
        draw(ctx, fillStyle = 'black', strokeStyle = null) {
            ctx.save();

            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;

            ctx.translate(this.pos.x, this.pos.y);

            ctx.rotate(this.rotation);

            ctx.beginPath();
            ctx.moveTo(0, -this.size);
            ctx.lineTo(-this.size, this.size);
            ctx.lineTo(this.size, this.size);
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
