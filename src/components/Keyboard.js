/*
	Author: LAB
	Keyboard module for pattar

    LICENSE: MIT
*/

// An IIFE ("Iffy") - see the notes in mycourses
"use strict";
var app = app || {};
(function() {

    app.Keyboard = class {
        constructor() {
            this.pressing = [];
            this.combo = {};
        }

        registerCombo(name, keys) {
            this.combo[name] = {
                keys,
                isDown: false
            };
        }

        isComboDown(name) {
            return this.combo[name].isDown = this.areKeysDown(this.combo[name].keys);
        }

        isComboUp(name) {
            if (!this.combo[name].isDown) {
                this.combo[name].isDown = this.areKeysDown(this.combo[name].keys);
                return false;
            }

            if (!this.areKeysDown(this.combo[name].keys)) {
                this.combo[name].isDown = false;
                return true;
            }
        }

        areKeysDown(keys) {
            return keys.reduce((p, c) => p && this.pressing[c], true);
        }

        async onKeysReleased(keys) {
            return new Promise((resolve, reject) => {
                while (!this.areKeysDown(keys)) {}

                resolve();
            });
        }

        onKeyDown(e) {
            e.preventDefault();
            console.log("keydown=" + e.keyCode);
            this.pressing[e.keyCode] = true;
        }

        onKeyUp(e) {
            this.pressing[e.keyCode] = false;

            return String.fromCharCode(e.keyCode).toUpperCase();
        }
    };
}());
