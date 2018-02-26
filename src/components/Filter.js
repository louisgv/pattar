/*
	Author: LAB
	Drawpad module for pattar

    LICENSE: GPLv3
*/

// An IIFE ("Iffy") - see the notes in mycourses
"use strict";
var app = app || {};
(function() {
    const {Helper} = app;

    app.Filter = class {
        constructor() {}

        apply(ctx) {
            const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.putImageData(imageData, 0, 0);
        }

    };
}());
