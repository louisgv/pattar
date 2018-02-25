/*
	Author: LAB

	Gradient class
	Used to model gradient initialized from a context.
    Accept stop colors as init params

    LICENSE: MIT
*/

"use strict";
var app = app || {};
(function() {
    app.Gradient = class {
        constructor() {}

        // stopColors is an array of Color
        init(ctx, stopColors) {
            this.value = ctx.createLinearGradient(0, 0, 0, window.innerHeight);

            const stepSize = 1 / (stopColors.length - 1);

            stopColors.forEach((c, i) => {
                this.value.addColorStop(i * stepSize, c.value || c);
            });
        }
    };
}());
