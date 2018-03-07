/*
	Author: LAB

	Singleton for Filter config
    "opinionated global", might mutate

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function () {
    const {
        Helper
    } = app;

    // Label - Enabled
    const value = Object.seal({
        'lightNoise': [
            'Light Noise'
        ],
    });

    const values = Object.keys(value);

    // Class - Default Config
    const defaultValue = Object.seal({
        'lightNoise': [
            'Noise', {
                value: 234
            }
        ],
    });

    // label - config - min - max
    const slider = Object.seal({
        'lightNoise' : [],
    });

    app.EffectConfig = {
        value,
        values,
        defaultValue,
        slider,
    };
}());