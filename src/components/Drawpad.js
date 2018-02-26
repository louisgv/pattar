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

    app.Drawpad = class {
        constructor() {
            this.mainCanvas = Helper.createElement(`
                <canvas id="main-canvas"></canvas>
            `);
            this.mainCanvasCtx = this.mainCanvas.getContext('2d');

            this.draftCanvas = Helper.createElement(`
                <canvas id="draft-canvas"></canvas>
            `);
            this.draftCanvasCtx = this.draftCanvas.getContext('2d');

            this.container = document.querySelector('#drawpad-container');

            this.container.appendChild(this.mainCanvas);
            this.container.appendChild(this.draftCanvas);
        }


    };
}());
