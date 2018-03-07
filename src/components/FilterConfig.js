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
        'kaleidoscope': [
            'Kaleidoscope'
        ],
        'lightNoise': [
            'Light Noise'
        ],
    });

    const values = Object.keys(value);

    // Class - Default Config
    const defaultValue = Object.seal({
        'kaleidoscope': [
            'Kaleidoscope'
        ],
        'lightNoise': [
            'Noise', {
                value: 234
            }
        ],
    });

    // label - config - min - max
    const slider = Object.seal({
        'kaleidoscope': [
            ['Split', 'power', 0, 5],
            ['Angle','angle', 0, 360],
        ],
        'lightNoise' : [],
    });

    app.FilterConfig = {
        value,
        values,
        defaultValue,
        slider,
    };
}());