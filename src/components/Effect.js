/*
	Author: LAB
	Filter module for pattar

    LICENSE: MIT
*/

// An IIFE ("Iffy") - see the notes in mycourses
"use strict";
var app = app || {};
(function() {
    const {Vector2, EffectConfig, Helper} = app;

    app.Effect = class {
        constructor(config = {}) {
            this.config = config;

            this.filterList = EffectConfig.values;

            // Render from bottom-up
            this.effectInstances = this
                .filterList
                .map(fltr => {
                    const [effectClass, defaultConfig] = EffectConfig.defaultValue[fltr];
                    this[fltr] = new app.effect[effectClass](defaultConfig);
                    this[fltr].disabled = !EffectConfig.value[fltr][1];
                    return this[fltr];
                });
        }

        // Update config based on the canvas
        updateConfig(canvas) {
            
        }

        /** Refresh instance for redraw scheduling */
        refresh() {
            this.effectInstances.forEach(instance => {
                instance.refresh();
            });
        }

        // Draw the filter into the ctx
        draw(ctx, dt) {
            this.imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

            this.effectInstances.forEach(instance => {
                if (instance.disabled) {
                    return;
                }
                instance.draw(this.imageData, this.config, dt);
            });

            ctx.putImageData(this.imageData, 0, 0);
        }

    };
}());
