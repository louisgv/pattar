/*
	Author: LAB

	Background grid pattern module

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function () {
    const {
        Vector2,
        Global
    } = app;
    app.pattern = app.pattern || {};

    app.pattern.BackgroundImage = class {
        constructor(config = {
            zoom: 0,
            src: Global.BACKGROUND_IMAGES[0]
        }) {
            this.config = config;
            this.imageCache = new Image();
        }

        /** Update config based on canvas */
        updateConfig(canvas) {

            this.updateCache();
        }

        /** Update the image cache src to match config
         *
         */
        updateCache() {
            this.imageCache.src = this.config.src;
        }

        // Draw the grid
        draw(ctx) {
            ctx.save();

            ctx.drawImage(this.imageCache, 0, 0);

            ctx.restore();
        }
    };
}());
