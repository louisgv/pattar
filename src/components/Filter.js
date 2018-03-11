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
        updateConfig(canvas) {
            this.filterInstances.forEach(instance => {
                instance.updateConfig(canvas);
            });
        }

        /** Refresh instance for redraw scheduling */
        refresh() {
            this.filterInstances.forEach(instance => {
                instance.refresh();
            });
        }

        // Draw the filter into the ctx
        draw(srcCtx, dstCtx, dt) {
            this.filterInstances.forEach(instance => {
                if (instance.disabled) {
                    return;
                }
                instance.draw(srcCtx, dstCtx, dt);
            });
        }

    };
}());
