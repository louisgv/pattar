/*
	Author: LAB

	Shape grid module

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function () {
    const {
        Vector2
    } = app;
    app.pattern = app.pattern || {};

    app.pattern.ShapeGrid = class {
        constructor(config = {
            size: 10,
            shape: 'Square',
            fill: false
        }) {
            this.config = config;
            this.shapeCache = [];
        }

        /** Update config based on canvas */
        updateConfig(canvas) {

            this.config.xCount = parseInt(canvas.center.x / this.config.size + 1);

            this.config.yCount = parseInt(canvas.center.y / this.config.size + 1);

            this.config.doubleSize = this.config.size * 2;

            this.updateCache();
        }

        /** Update the shape cache used to draw the grid
         * 
         */
        updateCache() {
            if (!this.shapeCache) {
                this.shapeCache = new Array(this.config.xCount);
            }

            for (let x = 0; x < this.config.xCount; x++) {
                if (!this.shapeCache[x]) {
                    this.shapeCache[x] = new Array(this.config.yCount);
                }
                for (let y = 0; y < this.config.yCount; y++) {
                    this.shapeCache[x][y] = new app[this.config.shape](
                        new Vector2(x * this.config.doubleSize + this.config.size, y * this.config.doubleSize + this.config.size),
                        this.config.size,
                        Math.PI / 2
                    );
                }
            }
        }

        // Draw the grid
        draw(ctx) {
            ctx.save();

            this.shapeCache.forEach((row) => {
                row.forEach((shape) => {
                    shape.draw(ctx);
                });
            });

            ctx.restore();
        }
    };
}());