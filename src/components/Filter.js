/*
	Author: LAB
	Filter module for pattar

    LICENSE: MIT
*/

// An IIFE ("Iffy") - see the notes in mycourses
"use strict";
var app = app || {};
(function() {
    const {Vector2, FilterConfig, Helper} = app;

    app.Filter = class {
        constructor(config = {}) {
            this.config = config;

            this.filterList = FilterConfig.values;

            // Render from bottom-up
            this.filterInstances = this
                .filterList
                .map(fltr => {
                    const [filterClass, defaultConfig] = FilterConfig.defaultValue[fltr];
                    this[fltr] = new app.filter[filterClass](defaultConfig);
                    this[fltr].disabled = !FilterConfig.value[fltr][1];
                    return this[fltr];
                });
        }

        // Update config based on the canvas
        updateConfig(canvas, {size, mid}) {
            this.config.size = size || new Vector2(canvas.width, canvas.height);
            this.config.mid = mid || this.config.size.iMul(0.5);
        }

        /** Refresh instance for redraw scheduling */
        refresh() {
            this.filterInstances.forEach(instance => {
                instance.refresh();
            });
        }

        // Draw the filter into the ctx
        draw(ctx, dt) {
            this.imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

            this.filterInstances.forEach(instance => {
                if (instance.disabled) {
                    return;
                }
                instance.draw(this.imageData, this.config, dt);
            });

            ctx.putImageData(this.imageData, 0, 0);
        }

    };
}());
