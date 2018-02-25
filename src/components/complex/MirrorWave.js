/*
	Author: LAB

	Mirror Wave.
    Draw a mirrored wave onto the canvas

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {Vector2, VisualizerConfig, Color, Global, Helper} = app;

    app.MirrorWave = class {
        constructor(config = {
            cut: true,
            stroke: true,
            fill: true,
            widthScale: 0,
            heightScale: 0,
            // Hack to show the gradient color up-front
            color: VisualizerConfig.gradient.CrimsonThought,
        }) {
            this.config = config;
        }

        // Update the width and height scale of the wave
        updateConfig(canvas) {
            this.config.widthScale = canvas.halfWidth / Global.DATA_SIZE;
            this.config.heightScale = canvas.halfHeight / Global.NUM_SAMPLES;
        }

        // Draw a segent of the mirror wave, checking if we should cut the blank part or not
        drawSegment(ctx, freq, x, y) {
            if (this.config.cut && freq <= 0) {
                ctx.lineTo(ctx.canvas.halfWidth, ctx.canvas.halfHeight);
            } else {
                ctx.lineTo(x, y);
            }
        }

        // Draw the Mirror Wave
        draw(ctx, data) {
            ctx.save();
            ctx.beginPath();

            ctx.fillStyle = ctx.strokeStyle = this.config.color.value;

            let x = 0;
            // *ctx.canvas.halfHeight

            let i = 0;

            ctx.moveTo(x, ctx.canvas.halfHeight);

            // Draw top left segment
            for (; i < data.length; ++i) {
                this.drawSegment(ctx, data[i], x, data[i] * this.config.heightScale);
                x += this.config.widthScale;
            }

            // Draw top right segment
            for (; i > 0; --i) {
                this.drawSegment(ctx, data[i], x, data[i] * this.config.heightScale);
                x += this.config.widthScale;
            }

            // Draw bottom right segment
            for (; i < data.length; ++i) {
                this.drawSegment(ctx, data[i], x, -data[i] * this.config.heightScale + ctx.canvas.height);
                x -= this.config.widthScale;
            }

            // Draw bottom left segment
            for (; i >= 0; --i) {
                this.drawSegment(ctx, data[i], x, -data[i] * this.config.heightScale + ctx.canvas.height);
                x -= this.config.widthScale;
            }

            ctx.closePath();

            if (this.config.stroke) {
                ctx.stroke();
            }

            if (this.config.fill) {
                ctx.fill();
            }

            ctx.restore();
        }
    };
}());
