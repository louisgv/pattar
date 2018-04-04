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

    app.Square = function Square(pos = new Vector2(), size = 10, color = 'white') {
        this.pos = pos;
        this.size = size;
        this.halfSize = size / 2;
        this.color = color;

        this.setSize = (size) => {
            this.size = size;
            this.halfSize = size / 2;
            return this;
        };

        this.setColor = (color) => {
            this.color = color;
            return this;
        };

        this.draw = (ctx) => {
            ctx.save();
            ctx.fillStyle = this.color;

            ctx.fillRect(this.pos.x - this.halfSize, this.pos.y - this.halfSize, this.size, this.size);

            ctx.fill();
            ctx.restore();
        };
    };
}());
