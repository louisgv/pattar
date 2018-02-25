/*
	Author: LAB

	Global singleton
	Used to share global config

    LICENSE: MIT
*/

"use strict";
var app = app || {};

app.Global = Object.freeze({
    KEYBOARD: {
        KEY_LEFT: 37,
        KEY_UP: 38,
        KEY_RIGHT: 39,
        KEY_DOWN: 40,
        KEY_SPACE: 32,
        KEY_SHIFT: 16
    }
});
