/*
	Author: LAB

	Kaleidoscope module
    Used to apply Kaleidoscope filter to image

    Adapted from https://github.com/konvajs/konva/blob/bdc3a2d30e90685f0b80204b4ce7976a95dfe0ba/src/filters/Kaleidoscope.js#L177

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function () {
    const {
        Vector2,
        FilterHelper,
        Helper
    } = app;
    app.filter = app.filter || {};

    app.filter.Kaleidoscope = class {
        constructor(config = {
            power: 3,
            angle: 0,
            timeout: 30
        }) {
            this.config = config;
            this.currentTime = config.timeout;
        }

        refresh() {
            this.currentTime = this.config.timeout;
        }

        // Apply the filter effect
        draw(imageData, opt, dt) {
            if(this.currentTime < this.config.timeout) {
                this.currentTime += dt;
                return;
            }
            this.currentTime = 0;

            const size = opt.size || new Vector2(imageData.width, imageData.height);
            const mid = opt.mid || new Vector2(size.x / 2, size.y / 2);

            let x,
                y,
                xoff,
                i;
            let power = Math.round(this.config.power);
            let angle = Math.round(this.config.angle);
            let offset = Math.floor(size.x * (angle % 360) / 360);

            if (power < 1) {
                return;
            }

            // Work with our shared buffer canvas
            let tempCanvas = Helper.createElement('<canvas/>');
            tempCanvas.width = size.x;
            tempCanvas.height = size.y;

            let scratchData = tempCanvas.getContext('2d').getImageData(0, 0, size.x, size.y);

            // Convert thhe original to polar coordinates
            FilterHelper.toPolar(imageData, scratchData, {
                mid,
                size
            });

            // Determine how big each section will be, if it's too small
            // make it bigger
            let minSectionSize = size.x / Math.pow(2, power);

            while (minSectionSize <= 8) {
                minSectionSize = minSectionSize * 2;
                power -= 1;
            }

            minSectionSize = Math.ceil(minSectionSize);
            let sectionSize = minSectionSize;

            // Copy the offset region to 0
            // Depending on the size of filter and location of the offset we may need
            // to copy the section backwards to prevent it from rewriting itself
            let xStart = 0,
                xEnd = sectionSize,
                xDelta = 1;
            if (offset + minSectionSize > size.x) {
                xStart = sectionSize;
                xEnd = 0;
                xDelta = -1;
            }

            for (y = 0; y < size.y; y += 1) {
                for (x = xStart; x !== xEnd; x += xDelta) {
                    xoff = Math.round(x + offset) % size.x;

                    FilterHelper.migrateRGBA((size.x * y + xoff) * 4, (size.x * y + x) * 4, scratchData, scratchData);
                }
            }

            // Perform the actual effect
            for (y = 0; y < size.y; y += 1) {
                sectionSize = Math.floor(minSectionSize);
                for (i = 0; i < power; i += 1) {
                    for (x = 0; x < sectionSize + 1; x += 1) {
                        FilterHelper.migrateRGBA((size.x * y + x) * 4, (size.x * y + sectionSize * 2 - x - 1) * 4, scratchData, scratchData);
                    }
                    sectionSize *= 2;
                }
            }

            // Convert back from polar coordinates
            FilterHelper.fromPolar(scratchData, imageData, {
                polarRotation: 0,
                size,
                mid
            });
        }
    };
}());