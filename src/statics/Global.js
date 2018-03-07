/*
	Author: LAB

	Global singleton
	Used to share global config

    LICENSE: MIT
*/

"use strict";
var app = app || {};

app.Global = Object.freeze({
    HALF_PI: Math.PI / 2,
    TWO_PI: Math.PI * 2,
    KEYBOARD: {
        KEY_LEFT: 37,
        KEY_UP: 38,
        KEY_RIGHT: 39,
        KEY_DOWN: 40,
        KEY_SPACE: 32,
        KEY_SHIFT: 16
    },
    BASIC_SHAPE: {
        Circle: 'Circle',
        Square: 'Square',
        Triangle: 'Triangle',
        Diamond: 'Diamond'
    }
});