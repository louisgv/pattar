/*
	Author: LAB

	PonchoEye module.
    Used to draw an eye-like form consists
    of 3 shapes of variety size and type.

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {Color, Vector2, Global, Helper} = app;

    app.PonchoEye = class {
        constructor(config = {
            pos: new Vector2(),
            maxRadius: 180,
            color: new Color(),
            smShape: 'Diamond',
            mdShape: 'Diamond',
            lgShape: 'Diamond'
        }) {
            this.config = config;
            this.smCentralCache = new Array(Global.DATA_SIZE);

            this.mdCentralCache = new Array(Global.DATA_SIZE);

            this.lgCentralCache = new Array(Global.DATA_SIZE);
        }

        // Update local cache
        updateConfig(canvas) {
            if (this.config.maxRadius > canvas.halfHeight) {
                this.config.maxRadius = canvas.halfHeight;
            }
            if (this.config.maxRadius > canvas.halfWidth) {
                this.config.maxRadius = canvas.halfWidth;
            }

            this.config.pos = new Vector2(canvas.halfWidth, canvas.halfHeight);

            this.updateShapeCache();
        }

        // Update the small shape cache
        updateSmallShapeCache(shape = 'Diamond') {
            this.config.smShape = shape;
            this
                .smCentralCache
                .fill(new app[shape](this.config.pos.copy()));
        }

        // Update the medium shape cache
        updateMediumShapeCache(shape = 'Diamond') {
            this.config.mdShape = shape;
            this
                .mdCentralCache
                .fill(new app[shape](this.config.pos.copy()));
        }

        // Update the large shape cache
        updateLargeShapeCache(shape = 'Diamond') {
            this.config.lgShape = shape;
            this
                .lgCentralCache
                .fill(new app[shape](this.config.pos.copy()));
        }

        // Update the shape cache
        updateShapeCache() {
            const {smShape, mdShape, lgShape} = this.config;
            this.updateSmallShapeCache(smShape);
            this.updateMediumShapeCache(mdShape);
            this.updateLargeShapeCache(lgShape);
        }

        // Draw the eye
        draw(ctx, data) {
            ctx.save();
            const color = this.config.color || new Color();
            const invertedColor = color.iInvert();

            for (let i = 0; i < data.length; i++) {
                if (data[i] === 0) {
                    continue;
                }

                const percent = data[i] / (Global.NUM_SAMPLES - 1);

                const circleRadius = percent * this.config.maxRadius;

                this
                    .smCentralCache[i]
                    .setColor(invertedColor.customAlpha(.5 - percent / 5.0))
                    .setSize(circleRadius * .50)
                    .draw(ctx);

                this
                    .mdCentralCache[i]
                    .setColor(invertedColor.customAlpha(1.0))
                    .setSize(circleRadius)
                    .draw(ctx, false, true);

                this
                    .lgCentralCache[i]
                    .setColor(color.customAlpha(.10 - percent / 10.0))
                    .setSize(circleRadius * 1.5)
                    .draw(ctx);
            }

            ctx.restore();
        }
    };
}());
