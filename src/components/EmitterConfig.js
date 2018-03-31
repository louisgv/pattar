/*
	Author: LAB

	Singleton for Emitter config
    "opinionated global", might mutate

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {Helper} = app;

    // Key - Label - Enabled
    const value = Object.seal(['emitter', 'Mousar', true]);

    const values = Object.keys(value);

    // Class - Default Config
    const defaultValue = Object.seal(['Emitter']);

    app.EmitterConfig = {
        value,
        values,
        defaultValue
    };
}());
