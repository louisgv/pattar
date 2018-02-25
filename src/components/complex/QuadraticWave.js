
/*
	Author: LAB

	Bezier Wave module.
    Used to draw Wave form using the Bezier curve

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {Vector2, Color, Global, Helper} = app;

    app.QuadraticWave = class {
        constructor(config = {
            fill: true,
            step: 18,
            widthScale: 0,
            heightScale: 0,
            lineWidth: 2,
            color: new Color()
        }) {
            this.config = config;
        }

        // Update the width and height scale of the wave
        updateConfig(canvas) {
            this.config.widthScale = canvas.width / (Global.DATA_SIZE - 2) * this.config.step;
            this.config.heightScale = canvas.halfHeight / Global.DATA_SIZE;
        }

        // Draw the Mirror Wave
        draw(ctx, fData, data) {
            ctx.save();
            ctx.beginPath();

            ctx.fillStyle = ctx.strokeStyle = this.config.color.value;

            ctx.lineWidth = this.config.lineWidth;

            let x = 0;
            // Used to calculate the middle point
            let xTemp = 0;

            // TODO: switch to Bezier curve
            let yMaxTemp = 0;
            let yMinTemp = 0;

            let i = 0;

            ctx.moveTo(x, ctx.canvas.halfHeight);

            for (; i < data.length; i += this.config.step) {

                ctx.quadraticCurveTo(
                    (x - xTemp) / 2 + xTemp,
                    data[i] * this.config.heightScale,
                    x,
                    ctx.canvas.halfHeight
                );

                xTemp = x;

                x += this.config.widthScale;
            }

            ctx.lineTo(x, ctx.canvas.halfHeight);

            ctx.closePath();

            ctx.stroke();

            if (this.config.fill) {
                ctx.fill();
            }

            ctx.restore();
        }
    };
}());
