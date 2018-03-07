/*
	Author: LAB

	Singleton for Pattern config
    "opinionated global", might mutate

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {Helper, Global} = app;

    // Label - Enabled
    const value = Object.seal({
        'shapeGrid': [
            'Shape Grid', true
        ],
    });

    // Class - Default Config
    const defaultValue = Object.seal({
        'shapeGrid': [
            'ShapeGrid', {
                size: 10,
                shape: 'Diamond',
            }
        ],
    });

    const shape = Global.BASIC_SHAPE;

    const shapes = Object.keys(shape);

    const select = Object.seal({
        'shapeGrid': ['Shape']
    });


    const values = Object.keys(value);

    app.PatternConfig = {
        value,
        values,
        shape,
        shapes,
        select,
        defaultValue,
    };
}());
