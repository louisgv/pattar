/*
	Author: LAB
	Keyboard module for pattar

    LICENSE: MIT
*/

// An IIFE ("Iffy") - see the notes in mycourses
"use strict";
var app = app || {};
(function() {
    const {Global} = app;

    app.Keyboard = class {
        constructor() {
            this.pressing = [];
            this.combo = {};
        }

        registerCombo(name, keys) {
            this.combo[name] = {
                keys,
                pressing: false,
            };
        }

        isComboPressing(name) {
            return this.combo[name].pressing;
        }

        isComboDown(name) {
            if (!this.areKeysDown(this.combo[name].keys) || this.isComboPressing(name)) {
                return false;
            }

            return this.combo[name].pressing = true;
        }

        isComboUp(name) {
            if (!this.combo[name].pressing) {
                this.combo[name].pressing = this.areKeysDown(this.combo[name].keys);
                return false;
            }

            if (!this.areKeysDown(this.combo[name].keys)) {
                this.combo[name].pressing = false;
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
            if (Global.DEBUG) {
                console.log("keydown=" + e.keyCode);
            }
            this.pressing[e.keyCode] = true;
        }

        onKeyUp(e) {
            this.pressing[e.keyCode] = false;

            return String.fromCharCode(e.keyCode).toUpperCase();
        }
    };
}());
