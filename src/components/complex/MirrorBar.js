/*
	Author: LAB

	MirrorBar.
    Draw mirrored bars

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {Vector2, Color, Global, Helper} = app;

    app.MirrorBar = class {
        constructor(config = {
            cut: true,
            spacing: 1,
            width: 0,
            height: 0,
            topSpacing: 0,
            scale: 0.45,
            color: new Color(255, 0, 0)
        }) {
            this.config = config;
            this.cachedPos = new Array(Global.DATA_SIZE);
        }

        // Update cached width, height and spacing config
        updateConfig(canvas) {

            this.config.width = (canvas.halfWidth) / Global.DATA_SIZE;
            this.config.height = canvas.halfHeight / 3;
            this.config.topSpacing = -this.config.height / 2;

            for (let i = 0; i < Global.DATA_SIZE; i++) {
                const horizontalBarSpacing = i * this.config.width;

                const topBarPosition = new Vector2(
                    canvas.halfWidth - this.config.width - horizontalBarSpacing,
                    canvas.halfHeight + this.config.topSpacing
                );

                const bottomBarPosition = new Vector2(
                    canvas.halfWidth + horizontalBarSpacing,
                    canvas.halfHeight + this.config.topSpacing
                );

                this.cachedPos[i] = Object.freeze({topBarPosition, bottomBarPosition});
            }

        }

        // Draw the mirror bar
        draw(ctx, data) {
            ctx.save();

            ctx.fillStyle = ctx.strokeStyle = this.config.color.value;

            const barConfig = this.config;
            // cache all multiplication, reduce calculation to add and sub

            for (let i = 0; i < data.length; i++) {
                if (barConfig.cut && data[i] === 0) {
                    continue;
                }

                const scaledData = data[i] * barConfig.scale;
                // Draw top left segment
                ctx.fillRect(
                    this.cachedPos[i].topBarPosition.x,
                    this.cachedPos[i].topBarPosition.y - scaledData,
                    barConfig.width,
                    barConfig.height
                );

                // Draw top right segment
                ctx.fillRect(
                    this.cachedPos[i].topBarPosition.x,
                    this.cachedPos[i].topBarPosition.y + scaledData,
                    barConfig.width,
                    barConfig.height
                );

                // Draw bottom right segment
                ctx.fillRect(
                    this.cachedPos[i].bottomBarPosition.x,
                    this.cachedPos[i].bottomBarPosition.y - scaledData,
                    barConfig.width,
                    barConfig.height
                );

                // Draw bottom left segment
                ctx.fillRect(
                    this.cachedPos[i].bottomBarPosition.x,
                    this.cachedPos[i].bottomBarPosition.y + scaledData,
                    barConfig.width,
                    barConfig.height
                );
            }

            ctx.restore();
        }
    };
}());
