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
            this.renderCanvas = Helper.createElement(`
                <canvas id="main-canvas"></canvas>
            `);
            this.renderCanvasCtx = this.renderCanvas.getContext('2d');

            this.container = document.querySelector('#drawpad-container');

            this.container.appendChild(this.renderCanvas);

            this.pattern = new Pattern();
            this.patternConfigUI = new PatternConfigUI(this.pattern);
            this.patternCtx = Helper.createCtx();

            this.filter = new Filter();
            this.filterConfigUI = new FilterConfigUI(this.filter);
            this.filterCtx = Helper.createCtx();

            this.setupCache();
        }

        // Cache the size as well as update config for some child module
        setupCache() {
            this.renderCanvas.size = new Vector2(window.innerWidth, window.innerHeight);
            this.renderCanvas.center = this.renderCanvas.size.iMul(0.5);


            Helper.setFullsizeCtx(this.patternCtx);
            Helper.setFullsizeCtx(this.filterCtx);
            Helper.setFullsizeCtx(this.renderCanvasCtx);

            this.pattern.updateConfig(this.renderCanvas);

            this.filter.updateConfig(this.renderCanvas);
        }

        /** Setup UI for the drawpad */
        setupUI() {
            this.patternConfigUI.mount(document.querySelector('#pattern-ui-config'), () => {
                Helper.clearCanvas(this.renderCanvasCtx);
                this.filter.refresh();
            });

            this.filterConfigUI.mount(document.querySelector('#filter-ui-config'), () => {
                Helper.clearCanvas(this.renderCanvasCtx);
                this.filter.refresh();
            });

            this.renderCanvas.addEventListener('mousedown', (e) => this.onMouseDownCanvas(e));
            this.renderCanvas.addEventListener('mousemove', (e) => this.onMouseMoveCanvas(e));
            this.renderCanvas.addEventListener('mouseup', (e) => this.onMouseUpCanvas(e));
            this.renderCanvas.addEventListener('mouseout', (e) => this.onMouseOutCanvas(e));
        }

        onMouseDownCanvas(e) {
            this.dragging = true;

            // const mouse = Helper.getMouse(e);
        }

        onMouseMoveCanvas(e) {
            Helper.clearCanvas(this.renderCanvasCtx);

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
            this.pattern.draw(this.patternCtx, dt);

            this.filter.draw(this.patternCtx, this.filterCtx, dt);

            this.renderCanvasCtx.drawImage(this.filterCtx.canvas, 0, 0);

            Helper.clearCanvas(this.patternCtx);
            Helper.clearCanvas(this.filterCtx);
        }

    };
}());
