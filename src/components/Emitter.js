/*
	Author: LAB
	Emitter module for pattar

    LICENSE: MIT
*/

// An IIFE ("Iffy") - see the notes in mycourses
"use strict";
var app = app || {};
(function() {
    const {Helper} = app;

    app.Emitter = class {
        constructor(config = {
            numParticles: 25,
            useCircles: true,
            useSquares: false,
            xRange: 4,
            yRange: 4,
            minXspeed: -1,
            maxXspeed: 1,
            minYspeed: 2,
            maxYspeed: 4,
            startRadius: 4,
            expansionRate: 0.3,
            decayRate: 2.5,
            lifetime: 100,
            red: 0,
            green: 0,
            blue: 0
        }) {
            this.config = config;
            this.particles = undefined;
        }

        /*
            Update and draw each particles
        */
        updateAndDraw(ctx, emitterPoint) {
            if (this.disabled) {
                return;
            }
            /* move and draw particles */
            // each frame, loop through particles array
            // move each particle down screen, and slightly left or right
            // make it bigger, and fade it out
            // increase its age so we know when to recycle it

            this.particles.forEach((p) => {

                p.age += this.config.decayRate;
                p.r += this.config.expansionRate;
                p.x += p.xSpeed;
                p.y += p.ySpeed;

                const alpha = 1 - p.age / this.config.lifetime;

                if (this.config.useSquares) {
                    // fill a rectangle
                    ctx.fillStyle =`rgba(${this.config.red},${this.config.green},${this.config.blue},${alpha})`;

                    ctx.fillRect(p.x, p.y, p.r, p.r);
                    // note: this code is easily modified to draw images
                }

                if (this.config.useCircles) {
                    // fill a circle
                    ctx.fillStyle =`rgba(${this.config.red},${this.config.green},${this.config.blue},${alpha})`;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, Math.PI * 2, false);
                    ctx.closePath();
                    ctx.fill();
                }

                // if the particle is too old, recycle it
                if (p.age >= this.config.lifetime) {
                    this.initParticle(this.config, p, emitterPoint);
                }
            }); // end for loop of this._particles
        } // end updateAndDraw()

        /*
            Initialize particle array
        */
        createParticles(emitterPoint) {
            // initialize particle array
            this.particles = Array.from({
                length: this.config.numParticles
            }, () => this.initParticle(this.config, {}, emitterPoint));
        }

        /*
            Initialize the given particle
        */
        initParticle(obj, p, emitterPoint) {

            // give it a random age when first created
            p.age = Helper.getRandom(0, obj.lifetime);

            p.x = emitterPoint.x + Helper.getRandom(-obj.xRange, obj.xRange);
            p.y = emitterPoint.y + Helper.getRandom(0, obj.yRange);
            p.r = Helper.getRandom(obj.startRadius / 2, obj.startRadius); // radius
            p.xSpeed = Helper.getRandom(obj.minXspeed, obj.maxXspeed);
            p.ySpeed = Helper.getRandom(obj.minYspeed, obj.maxYspeed);
            return p;
        };
    };
}());
