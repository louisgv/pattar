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
        'passThrough': [
            'PassThrough'
        ],
        'kaleidoscope': [
            'Kaleidoscope', true
        ]
    });

    const values = Object.keys(value);

    // Class - Default Config
    const defaultValue = Object.seal({
        'passThrough': [
            'PassThrough'
        ],
        'kaleidoscope': [
            'Kaleidoscope',
        ]
    });

    // label - config - min - max
    const slider = Object.seal({
        'kaleidoscope': [
            ['Slices', 'slices', 0, 100],
            ['Zoom', 'zoom', 0, 10]
        ]
    });

    // label - path within config - config
    const checkbox = Object.seal({
        'kaleidoscope': [
            ['Rotate', ['animateKey'], 'offsetRotation'],
            ['Shift X', ['animateKey'], 'offsetX'],
            ['Shift Y', ['animateKey'], 'offsetY'],
            ['Animate', [], 'animate'],
            ['Mouse Track', [], 'mouseAnim']
        ],
    });

    app.FilterConfig = {
        value,
        values,
        defaultValue,
        slider,
        checkbox,
    };
}());
