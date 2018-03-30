/*
	Author: LAB

	Kaleidoscope module
    Used to apply Kaleidoscope filter to image

    Adapted from https://codepen.io/soulwire/full/pwchL

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {Vector2, Global, Helper} = app;
    app.filter = app.filter || {};

    app.filter.Kaleidoscope = class {
        constructor(config = {
            offsetRotation: 0.0,
            offsetScale: 1.0,
            offsetX: 0,
            offsetY: 0,
            radius: 450,
            slices: 36,
            zoom: 1.0,
            timeout: 0,
            ease: 0.1,
            mouseAnim: false,
            animate: true,
            animateKey: {
                offsetRotation: true,
                offsetX: true,
                offsetY: true,
                // offsetScale: true,
            }
        }) {
            this.config = config;
            this.config.animateKeys = Object.keys(config.animateKey);
            this.currentTime = config.timeout;
        }

        /** Update config based on canvas */
        updateConfig(canvas) {
            this.config.radius = Math.min(canvas.center.x * 2 / 3, canvas.center.y * 2 / 3);

            this.config.center = canvas.center;

            this.config.rawScale = this.config.radius / Math.min(canvas.width, canvas.height);

            this.refresh();
        }

        // Refresh timeout
        refresh() {
            this.currentTime = this.config.timeout;

            this.config.step = Global.TWO_PI / this.config.slices;

            this.config.arcStep = this.config.step * 0.51;

            this.config.scale = this.config.zoom * this.config.rawScale;
        }

        // React to mouse event
        updateConfigOnMouseEvent(e) {
            if (!this.config.mouseAnim) {
                return;
            }
            const dx = e.pageX / window.innerWidth;
            const dy = e.pageY / window.innerHeight;

            const hx = dx - 0.5;
            const hy = dy - 0.5;

            const tx = hx * this.config.radius * -2;
            const ty = hy * this.config.radius * 2;
            const tr = Math.atan2(hy, hx);

            const delta = tr - this.config.offsetRotation;
            const theta = Math.atan2(Math.sin(delta), Math.cos(delta));

            this.config.offsetX += (tx - this.config.offsetX) * this.config.ease;
            this.config.offsetY += (ty - this.config.offsetY) * this.config.ease;

            this.config.offsetRotation += (theta - this.config.offsetRotation) * this.config.ease;
        }

        // Apply the filter effect
        draw(srcCtx, dstCtx, dt) {
            // if (this.currentTime < this.config.timeout) {
            //     this.currentTime += dt;
            //     return;
            // }
            // this.currentTime = 0;

            if (this.config.animate) {
                const easedDelta = dt;
                this.config.animateKeys.forEach((k) => {
                    if (this.config.animateKey[k]) {
                        this.config[k] += easedDelta;
                    }
                });
            }

            dstCtx.save();
            dstCtx.fillStyle = dstCtx.createPattern(srcCtx.canvas, 'repeat');

            for (let index = 0; index < this.config.slices; index++) {

                dstCtx.save();

                dstCtx.translate(this.config.center.x, this.config.center.y);

                dstCtx.rotate(index * this.config.step);

                dstCtx.beginPath();

                dstCtx.moveTo(-0.5, -0.5);
                dstCtx.arc(0, 0, this.config.radius, -this.config.arcStep, this.config.arcStep);
                dstCtx.lineTo(0.5, 0.5);
                dstCtx.closePath();

                dstCtx.rotate(Global.HALF_PI);
                dstCtx.scale(this.config.scale, this.config.scale);

                dstCtx.scale([-1, 1][index % 2], 1);

                dstCtx.translate(this.config.offsetX - this.config.center.x, this.config.offsetY);

                dstCtx.rotate(this.config.offsetRotation);
                dstCtx.scale(this.config.offsetScale, this.config.offsetScale);

                dstCtx.fill();

                dstCtx.restore();
            }

            dstCtx.restore();
        }
    };
}());
