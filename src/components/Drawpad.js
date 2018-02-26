/*
	Author: LAB
	Drawpad module for pattar

    LICENSE: GPLv3
*/

// An IIFE ("Iffy") - see the notes in mycourses
"use strict";
var app = app || {};
(function() {
    const {Vector2, Triangle, Helper} = app;

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

            this.setupCache();
        }

        setupCache() {
            this.draftCanvas.center = this.mainCanvas.center = new Vector2(window.innerWidth / 2, window.innerHeight / 2);

            // NOTE: Storing the half-size of the canvas into itself for reuse later.
            this.draftCanvas.width = this.mainCanvas.width = window.innerWidth;
            this.draftCanvas.height = this.mainCanvas.height = window.innerHeight;
        }

        render() {
            const triangle = new Triangle(this.draftCanvas.center.copy(), 150);

            triangle.draw(this.draftCanvasCtx);

        }

    };
}());
