/*
	Author: LAB
	Main app module for pattar

    LICENSE: GPLv3
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

        setupCache() {}

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

        }
    };
}());
