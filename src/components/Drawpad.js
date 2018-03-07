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
            this.draftCanvas.center = this.mainCanvas.center = new Vector2(window.innerWidth / 2, window.innerHeight / 2);

            // NOTE: Storing the half-size of the canvas into itself for reuse later.
            this.draftCanvas.width = this.mainCanvas.width = window.innerWidth;
            this.draftCanvas.height = this.mainCanvas.height = window.innerHeight;

            const size = this.size = new Vector2(this.draftCanvas.width, this.draftCanvas.height);
            const mid = this.mid = this.size.iMul(0.5);

            this.pattern.updateConfig(this.draftCanvas, {
                size,
                mid
            });

            this.filter.updateConfig(this.draftCanvas, {
                size,
                mid
            });
        }

        /** Setup UI for the drawpad */
        setupUI() {
            this.patternConfigUI.mount(document.querySelector('#pattern-ui-config'), ()=>{
                Helper.clearCanvas(this.mainCanvasCtx);
                this.filter.refresh();
            });

            this.filterConfigUI.mount(document.querySelector('#filter-ui-config'), ()=> {
                Helper.clearCanvas(this.mainCanvasCtx);
                this.filter.refresh();
            });
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