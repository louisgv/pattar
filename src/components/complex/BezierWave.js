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

    app.BezierWave = class {
        constructor(config = {
            fill: false,
            widthScale: 0,
            heightScale: 0,
            lineWidth: 2,
            color: new Color(255,255,255)
        }) {
            this.config = config;
        }

        // Update the width and height scale of the wave
        updateConfig(canvas) {
            this.config.widthScale = canvas.width / Global.DATA_SIZE;
            this.config.heightScale = canvas.halfHeight / Global.DATA_SIZE;
        }

        // Draw the Mirror Wave
        draw(ctx, fData, data) {
            ctx.save();
            ctx.beginPath();

            ctx.fillStyle = ctx.strokeStyle = this.config.color.value;

            ctx.lineWidth = this.config.lineWidth;

            let xMax = 0;
            let xMin = 0;

            // TODO: switch to Bezier curve
            let yMax = 0;
            let yMin = Number.MAX_SAFE_INTEGER;

            let i = 0;

            // Find the two control points which are the min and max data
            for (; i < data.length; i++) {
                if (yMax < data[i]) {
                    yMax = data[i];
                    xMax = i;
                }
                if (yMin > data[i]) {
                    yMin = data[i];
                    xMin = i;
                }
            }

            ctx.moveTo(0, ctx.canvas.halfHeight);
            // draw them based on their order:
            if (xMin < xMax) {
                ctx.bezierCurveTo(
                    xMin * this.config.widthScale, yMin * this.config.heightScale,
                    xMax * this.config.widthScale, yMax * this.config.heightScale,
                    ctx.canvas.width, ctx.canvas.halfHeight);
            } else {
                ctx.bezierCurveTo(
                    xMax * this.config.widthScale, yMax * this.config.heightScale,
                    xMin * this.config.widthScale, yMin * this.config.heightScale,
                    ctx.canvas.width, ctx.canvas.halfHeight);
            }

            ctx.stroke();

            if (this.config.fill) {
                ctx.fill();
            }

            ctx.restore();
        }
    };
}());
