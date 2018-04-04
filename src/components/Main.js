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

    const {KEYBOARD} = Global;

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

            this.keyboard.registerCombo('REC', [KEYBOARD.CTRL, KEYBOARD.v]);

            // start animation loop
            this.update();
        }

        /** Halt the program
         *
         */
        halt() {
            if (!Global.DEBUG) {
                document.querySelector('#halt-notice').classList.add('enabled');
            }

            this.paused = true;
            cancelAnimationFrame(this.animationID);
            this.update();
        }

        /** Resume the application
         */
        resume() {
            if (!Global.DEBUG) {
                document.querySelector('#halt-notice').classList.remove('enabled');
            }

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

            document.querySelector('#save-button').addEventListener('click', () => this.drawpad.saveToPNG());

            document.querySelector('#record-button').addEventListener('click', (e) => {

                if (e.target.isRecording) {
                    e.target.isRecording = false;
                    e.target.innerHTML = "Record WebM";
                    this.drawpad.stopSaveToWebM();
                } else {
                    e.target.isRecording = true;
                    e.target.innerHTML = "Stop Record WebM";
                    this.drawpad.startSaveToWebM();
                }
            });

            this.drawpad.setupUI();

            this.lateInit();
        }

        /** Final stage of initialization
         *
         */
        async lateInit() {
            // await Helper.wait(3600);
            //
            // this.toggleUIButton.dispatchEvent(new Event('click'));
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

            if (this.keyboard.isComboDown('REC')) {
                this.drawpad.startSaveToWebM();
            }

            if (this.keyboard.isComboUp('REC')) {
                this.drawpad.stopSaveToWebM();
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
