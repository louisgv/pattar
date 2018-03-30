/*
	Author: LAB
	Helper methods singleton. Generic and not opinionated

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {

    const {Vector2} = app;

    app.Helper = {

        // Create a quick canvas context for temporary drawing.
        createCtx: () => document.createElement("canvas").getContext('2d'),

        // Make enum from flat array
        makeEnum: (items) => items.reduce((p, c) => {
            p[c] = c;
            return p;
        }, {}),

        // Clamp value between min and max
        clamp: (val, min, max) => Math.max(min, Math.min(max, val)),

        // Return a random between min and max
        getRandomInt: (min, max) => Math.floor(Math.random() * (max - min) + min),


        // Get Mouse position relative to the element
        getMouse: ({pageX, pageY, target}) => new Vector2(pageX - target.offsetLeft, pageY - target.offsetTop),

        // Clear the canvas
        clearCanvas: (ctx) => ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height),

        // Trace toward the end of the path for the prop of the object
        traceProp: (path, obj) => path.reduce((p, c) => p = p[c], obj),

        // Asyncronously wait for a duration in ms
        wait: (duration) => new Promise((resolve) => setTimeout(() => resolve(), duration)),

        // Asyncronous image loading
        loadImages: (sources) => Promise.all(sources.map(src => new Promise((resolve, reject) => {
            const imageObject = new Image();
            imageObject.src = src;
            imageObject.onload = resolve;
            imageObject.onerror = reject;
        }))),

        // Set the ctx's canvas to full window inner size
        setFullsizeCtx(ctx) {
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
        },

        // Create html element. Code adapted from
        // https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
        createElement(html) {
            const template = document.createElement('template');
            html = html.trim(); // Never return a text node of whitespace as the result
            template.innerHTML = html;
            return template.content.firstChild;
        },

        // Toggle all toggle target based on the menu button state
        toggleUIElement(e) {

            const controlEl = document.querySelector('#controls');

            const shouldDisable = e.target.innerText === 'x';

            e.target.innerHTML = shouldDisable
                ? '='
                : 'x';

            controlEl.classList.toggle('highlight');

            Array.from(document.querySelectorAll('.toggle-target')).map((target) => {
                target.classList.toggle('toggle-disabled');
            });
        },

        // Request the user to fullscreen the visualization
        requestFullscreen(element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullscreen) {
                element.mozRequestFullscreen();
            } else if (element.mozRequestFullScreen) { // camel-cased 'S' was changed to 's' in spec
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            }
            // .. and do nothing if the method is not supported
        }
    };
}());
