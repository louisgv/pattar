/*
	Author: LAB
	Keyboard module for pattar

    LICENSE: GPLv3
*/

// An IIFE ("Iffy") - see the notes in mycourses
"use strict";
var app = app || {};
(function() {
    app.Keyboard = class {
        constructor() {
            this.pressing = [];
        }

        onKeyDown(e) {
            console.log("keydown=" + e.keyCode);
            this.pressing[e.keyCode] = true;
        }

        onKeyUp(e) {
            this.pressing[e.keyCode] = false;

            return String.fromCharCode(e.keyCode).toUpperCase();
        }
    };
}());
