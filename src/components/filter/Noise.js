/*
	Author: LAB

	Noise module
    Used to apply Noise filter to image

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {Random} = app;

    app.filter = app.filter || {};

    app.filter.Noise = class {
        constructor(config = {
            value: 255
        }) {
            this.config = config;
        }

        // Apply the filter effect
        apply({data}, opt) {
            for (let i = 0; i < data.length; i += 4) {
                if (Random.next() > 0.90) {
                    data[i] = data[i + 1] = data[i + 2] = this.config.value;
                    data[i + 3] = 255;
                }
            }
        }
    };
}());
