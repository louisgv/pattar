/*
	Author: LAB
	Drawpad module for pattar

    LICENSE: MIT
*/

// An IIFE ("Iffy") - see the notes in mycourses
"use strict";
var app = app || {};
(function () {
    const {
        Vector2,

        Pattern,
        Filter,

        PatternConfigUI,
        FilterConfigUI,

        Helper
    } = app;

    app.Drawpad = class {
        constructor() {
            this.dragging = false;
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

            this.pattern = new Pattern();
            this.patternConfigUI = new PatternConfigUI(this.pattern);

            this.filter = new Filter();
            this.filterConfigUI = new FilterConfigUI(this.filter);

            this.setupCache();
        }

        // Cache the size as well as update config for some child module
        setupCache() {
            this.draftCanvas.size = this.mainCanvas.size = new Vector2(window.innerWidth, window.innerHeight);
            this.draftCanvas.center = this.mainCanvas.center = this.mainCanvas.size.iMul(0.5);


            // NOTE: Storing the half-size of the canvas into itself for reuse later.
            this.draftCanvas.width = this.mainCanvas.width = window.innerWidth;
            this.draftCanvas.height = this.mainCanvas.height = window.innerHeight;

            this.pattern.updateConfig(this.draftCanvas);

            this.filter.updateConfig(this.draftCanvas);
        }

        /** Setup UI for the drawpad */
        setupUI() {
            this.patternConfigUI.mount(document.querySelector('#pattern-ui-config'), () => {
                Helper.clearCanvas(this.mainCanvasCtx);
                this.filter.refresh();
            });

            this.filterConfigUI.mount(document.querySelector('#filter-ui-config'), () => {
                Helper.clearCanvas(this.mainCanvasCtx);
                this.filter.refresh();
            });

            this.mainCanvas.addEventListener('mousedown', (e) => this.onMouseDownCanvas(e));
            this.mainCanvas.addEventListener('mousemove', (e) => this.onMouseMoveCanvas(e));
            this.mainCanvas.addEventListener('mouseup', (e) => this.onMouseUpCanvas(e));
            this.mainCanvas.addEventListener('mouseout', (e) => this.onMouseOutCanvas(e));
        }

        onMouseDownCanvas(e) {
            this.dragging = true;

            // const mouse = Helper.getMouse(e);
        }

        onMouseMoveCanvas(e) {
            Helper.clearCanvas(this.mainCanvasCtx);

            this.filter.kaleidoscope.updateConfigOnMouseEvent(e);

            if (!this.dragging) {
                return;
            }

            const mouse = Helper.getMouse(e);
        }

        onMouseUpCanvas(e) {

            this.dragging = false;
        }

        // if the user drags out of the canvas
        onMouseOutCanvas(e) {

            this.dragging = false;
        }

        // Render the drawpad into the canvas's ctx
        render(dt) {
            this.pattern.draw(this.draftCanvasCtx, dt);

            this.filter.draw(this.draftCanvasCtx, dt);

            this.mainCanvasCtx.drawImage(this.draftCanvas, 0, 0);
            Helper.clearCanvas(this.draftCanvasCtx);
        }

    };
}());