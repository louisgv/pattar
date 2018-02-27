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

        // Apply the filter into the ctx
        apply(ctx) {
            this.imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

            for (let i = 0; i < this.filterInstances.length; i++) {
                if (this.filterInstances[i].disabled) {
                    continue;
                }
                this
                    .filterInstances[i]
                    .apply(this.imageData, this.config);
            }

            ctx.putImageData(this.imageData, 0, 0);
        }

    };
}());
