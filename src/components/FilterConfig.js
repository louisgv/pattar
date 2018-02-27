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

    // Class - Default Config
    const defaultValue = Object.seal({
        'kaleidoscope': [
            'Kaleidoscope'
        ],
        'lightNoise': [
            'Noise', {value: 234}
        ],
    });

    const values = Object.keys(value);

    app.FilterConfig = {
        value,
        values,
        defaultValue,
    };
}());
