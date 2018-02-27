/*
	Author: LAB

	Singleton for Filter config
    "opinionated global", might mutate

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {Helper} = app;

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

    app.FilterConfig = {
        value,
        values,
    };
}());
