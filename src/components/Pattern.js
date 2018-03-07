/*
	Author: LAB
	Pattern module for pattar

    LICENSE: MIT
*/

// An IIFE ("Iffy") - see the notes in mycourses
"use strict";
var app = app || {};
(function () {
    const {
        Vector2,
        PatternConfig,
        Helper
    } = app;

    app.Pattern = class {
        constructor(config = {}) {
            this.config = config;

            this.patternList = PatternConfig.values;

            // Render from bottom-up
            this.patternInstances = this
                .patternList
                .map(pattern => {                    
                    const [patternClass, defaultConfig] = PatternConfig.defaultValue[pattern];
                    this[pattern] = new app.pattern[patternClass](defaultConfig);
                    this[pattern].disabled = !PatternConfig.value[pattern][1];                    
                    return this[pattern];
                });
        }

        // Update config based on the canvas
        updateConfig(canvas, {
            size,
            mid
        }) {
            this.config.size = size || new Vector2(canvas.width, canvas.height);
            this.config.mid = mid || this.config.size.iMul(0.5);

            this.patternInstances.forEach(instance => {
                instance.updateConfig(canvas);
            });
        }

        // Draw the Pattern into the ctx
        draw(ctx) {
            this.patternInstances.forEach(instance => {
                if (instance.disabled) {
                    return;
                }
                instance.draw(ctx);
            });
        }

    };
}());