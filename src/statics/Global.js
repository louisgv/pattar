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

    BACKGROUND_IMAGES: [
        'vibe-x.png',
        'black-white-sky.jpg',
        'colorful-sky.jpg'
    ].map((img) => `./media/bgimg/${img}`),

    KEYBOARD: {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SPACE: 32,
        SHIFT: 16,
        ESC: 27,
        CTRL: 17,
        s: 83
    },

    BASIC_SHAPES: [
        'Circle',
        'Square',
        'Triangle',
        'Diamond'
    ]
});
