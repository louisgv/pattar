/*
	Author: LAB

	Noise module
    Used to apply Noise effect to image

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function () {
    const {
        Random
    } = app;

    app.effect = app.effect || {};

    app.effect.Noise = class {
        constructor(config = {
            value: 255
        }) {
            this.config = config;
        }
        refresh() {}
        
        // Apply the filter effect
        draw({
            data
        }, opt) {
            for (let i = 0; i < data.length; i += 4) {
                if (Random.next() > 0.90) {
                    data[i] = data[i + 1] = data[i + 2] = this.config.value;
                    data[i + 3] = 255;
                }
            }
        }
    };
}());