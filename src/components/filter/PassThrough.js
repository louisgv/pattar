/*
	Author: LAB

	Kaleidoscope module
    Used to apply Kaleidoscope filter to image

    Adapted from https://codepen.io/soulwire/full/pwchL

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function () {
    const {
        Vector2,
        Global,
        Helper
    } = app;
    app.filter = app.filter || {};

    app.filter.PassThrough = class {
        constructor(config = {}) {
            this.config = config;
            this.currentTime = config.timeout;
        }

        /** Update config based on canvas */
        updateConfig(canvas) {}

        // Refresh timeout
        refresh() {
            this.currentTime = this.config.timeout;
        }

        // Apply the filter effect
        draw(srcCtx, dstCtx, dt) {
            if (this.currentTime < this.config.timeout) {
                this.currentTime += dt;
                return;
            }
            this.currentTime = 0;

            dstCtx.save();
            dstCtx.drawImage(srcCtx.canvas, 0, 0);
            dstCtx.restore();
        }
    };
}());
