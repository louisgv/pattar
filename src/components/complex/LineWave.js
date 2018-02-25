/*
	Author: LAB

	Line Wave.
    Used to draw linear line segment based on waveform data

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {Vector2, Color, Global, Helper} = app;

    app.LineWave = class {
        constructor(config = {
            fill: false,
            widthScale: 0,
            heightScale: 0,
            lineWidth: 9,
            color: new Color()
        }) {
            this.config = config;
        }

        // Update the width and height scale of the wave
        updateConfig(canvas) {
            this.config.widthScale = (canvas.width / Global.DATA_SIZE + 1);
            this.config.heightScale = canvas.halfHeight / Global.DATA_SIZE;
        }

        // Draw the Mirror Wave
        draw(ctx, fData, data) {
            ctx.save();
            ctx.beginPath();

            ctx.fillStyle = ctx.strokeStyle = this.config.color.value;

            ctx.lineWidth = this.config.lineWidth;

            let x = 0;
            let i = 0;

            for (; i < data.length; i++) {
                if (i == 0) {
                    ctx.moveTo(x, data[i] * this.config.heightScale);
                } else {
                    ctx.lineTo(x, data[i] * this.config.heightScale);
                }
                x += this.config.widthScale;
            }

            ctx.stroke();

            if (this.config.fill) {
                ctx.fill();
            }

            ctx.restore();
        }
    };
}());
