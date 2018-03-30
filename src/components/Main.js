/*
	Author: LAB
	Main app module for pattar

    LICENSE: MIT
*/

// An IIFE ("Iffy") - see the notes in mycourses
"use strict";
var app = app || {};
(function () {

    const {
        Random,
        Interface,
        Global,
        Helper,

    } = app;

    const {
        KEYBOARD
    } = Global;

    app.Main = class {
        constructor() {
            this.sound = undefined;
            this.keyboard = undefined;
            this.drawpad = undefined;
            this.animationID = 0;
            this.paused = false;

            this.toggleUIButton = undefined;

            this.lastTime = 0;
        }

        /** Setup the main process and start animation
         *
         */
        init() {
            this.setupUI();

            this.keyboard.registerCombo('SAVE', [KEYBOARD.CTRL, KEYBOARD.s]);

            // start animation loop
            this.update();
        }

        /** Halt the program
         *
         */
        halt() {
            document.querySelector('#halt-notice').classList.add('enabled');

            this.paused = true;
            cancelAnimationFrame(this.animationID);
            this.update();
        }

        /** Resume the application
         */
        resume() {
            document.querySelector('#halt-notice').classList.remove('enabled');

            cancelAnimationFrame(this.animationID);
            this.paused = false;
            this.update();
        }

        /** Setup any caching layer of any module it depends on.
         *
         */
        setupCache() {
            this.drawpad.setupCache();
        }

        /** UI Setup for the main application
         *
         */
        setupUI() {
            this.toggleUIButton = document.querySelector('#toggleui-button');
            this.toggleUIButton.addEventListener('click', Helper.toggleUIElement);

            this.drawpad.setupUI();

            this.lateInit();
        }

        /** Final stage of initialization
         *
         */
        async lateInit() {
            await Helper.wait(900);

            this.toggleUIButton.dispatchEvent(new Event('click'));
        }

        /** Update loop for animation
         *
         */
        update() {
            // this schedules a call to the update() method in 1/60 seconds
            this.animationID = requestAnimationFrame(() => this.update());

            if (this.paused || !this.drawpad) {
                return;
            }

            let dt = this.getDeltaTime();

            this.drawpad.render(dt);

            this.lateUpdate();
        }

        /** Handle user input in late update
         *
        */
        lateUpdate() {
            if (!this.keyboard) {
                return;
            }

            if (this.keyboard.isComboUp('SAVE')) {
                this.drawpad.saveToPNG();
            }
        }

        /** Calculate the delta time
         *
        */
        getDeltaTime() {
            const now = performance.now();
            let fps = 1000 / (now - this.lastTime);
            fps = Helper.clamp(fps, 12, 60);
            this.lastTime = now;
            return 1 / fps;
        }
    };
}());
