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
        'passThrough' : [],
        'kaleidoscope': [
            ['Slices', 'slices', 3, 30]
        ]
    });

    app.FilterConfig = {
        value,
        values,
        defaultValue,
        slider,
    };
}());
