/*
	Author: LAB
	Main app module for pattar

    LICENSE: MIT
*/

// An IIFE ("Iffy") - see the notes in mycourses
"use strict";
var app = app || {};
(function() {

    const {Random, Interface, Global, Helper} = app;

    app.Main = class {
        constructor() {
            this.sound = undefined;
            this.keyboard = undefined;
            this.drawpad = undefined;
            this.animationID = 0;
            this.paused = false;
        }

        init() {
            this.setupUI();

            // start animation loop
            this.update();
        }

        halt() {
            this.paused = true;
            cancelAnimationFrame(this.animationID);
            this.update();

        }

        resume() {
            cancelAnimationFrame(this.animationID);
            this.paused = false;
            this.update();

        }

        setupCache() {
            this.drawpad.setupCache();
        }

        setupUI() {
            const toggleUIButton = document.querySelector('#toggleui-button');
            toggleUIButton.addEventListener('click', Helper.toggleUIElement);

            setTimeout(() => {
                toggleUIButton.dispatchEvent(new Event('click'));
            }, 900);
        }

        update() {
            // this schedules a call to the update() method in 1/60 seconds
            this.animationID = requestAnimationFrame(() => this.update());

            if (this.paused) {
                return;
            }

            let dt = this.getDeltaTime();

            this.drawpad.render();
        }

        // Calculate the delta time
        getDeltaTime() {
            const now = performance.now();
            let fps = 1000 / (now - this.lastTime);
            fps = Helper.clamp(fps, 12, 60);
            this.lastTime = now;
            return 1 / fps;
        }
    };
}());
