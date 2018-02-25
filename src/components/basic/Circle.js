/*
	Author: LAB

	Circle module.
    Used to model a circle

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const { Vector2 } = app;

    app.Circle = class {
        constructor(pos = new Vector2(), radius = 1, color = 'white') {
            this.pos = pos;
            this.radius = radius;
            this.color = color;
        }

        // Set the desired color of the circle
        setColor(color) {
            this.color = color;
            return this;
        }
        // Set the desired size of the circle
        setSize(radius) {
            this.radius = radius;
            return this;
        }

        // Draw the circle
        draw(ctx, fill = true, stroke = false) {
            ctx.save();

            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;

            ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);

            ctx.closePath();

            if (fill) {
                ctx.fill();
            }

            if (stroke) {
                ctx.stroke();
            }

            ctx.restore();
        }
    };
}());
