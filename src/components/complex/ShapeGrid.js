/*
	Author: LAB

	Shape grid module
    Used to draw triangle grid

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {Vector2} = app;

    app.ShapeGrid = class {
        constructor(config = {
            size: 10,
            shape: 'Triangle',
            fill: false
        }) {
            this.config = config;
            this.shapeCache = [];
        }

        // Update local cache
        updateConfig(canvas) {

            this.config.xCount = parseInt(canvas.center.x / this.config.size + 1);

            this.config.yCount = parseInt(canvas.center.y / this.config.size + 1);

            this.config.doubleSize = this.config.size * 2;

            this.updateShapeCache();
        }

        updateShapeCache() {
            this.shapeCache = new Array(this.config.xCount);

            for (let x = 0; x < this.config.xCount; x++) {
                this.shapeCache[x] = new Array(this.config.yCount);
                for (let y = 0; y < this.config.yCount; y += 2) {
                    this.shapeCache[x][y] = new app[this.config.shape](
                        new Vector2(x * this.config.doubleSize + this.config.size, y * this.config.doubleSize + this.config.size),
                        this.config.size,
                        Math.PI / 2
                    );
                }

                for (let y = 1; y < this.config.yCount; y += 2) {
                    this.shapeCache[x][y] = new app[this.config.shape](
                        new Vector2(x * this.config.doubleSize + this.config.size, y * this.config.doubleSize + this.config.size),
                        this.config.size,
                        -Math.PI / 2
                    );
                }
            }
        }

        // Draw the grid
        draw(ctx) {
            ctx.save();

            for (let x = 0; x < this.config.xCount; x++) {
                for (let y = 0; y < this.config.yCount; y += 1) {
                    this
                        .shapeCache[x][y]
                        .draw(ctx);
                }

                // for (let y = 1; y < this.config.yCount; y += 2) {
                //     this
                //         .shapeCache[x][y]
                //         .draw(ctx, 'white');
                // }
            }

            ctx.restore();
        }
    };
}());
