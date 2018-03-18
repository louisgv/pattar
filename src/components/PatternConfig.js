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
        'backgroundImage': [
            'Background Image', true
        ],
        'shapeGrid': ['Shape Grid'],
        'shapeAltGrid': ['Shape Alternative Grid']
    });

    // Class - Default Config
    const defaultValue = Object.seal({
        'backgroundImage': [
            'BackgroundImage', {
                zoom: 0,
                src: Global.BACKGROUND_IMAGES[0]
            }
        ],
        'shapeGrid': [
            'ShapeGrid', {
                size: 10,
                shape: 'Diamond'
            }
        ],
        'shapeAltGrid': [
            'ShapeAltGrid', {
                size: 10,
                shape: 'Triangle'
            }
        ]
    });

    const shapeSelect = [
        'Shape',
        'shape',
        Helper.makeEnum(Global.BASIC_SHAPES),
        Global.BASIC_SHAPES
    ];

    const backgroundSelect = [
        'Source',
        'src',
        Helper.makeEnum(Global.BACKGROUND_IMAGES),
        Global.BACKGROUND_IMAGES
    ];

    const select = Object.seal({
        'shapeGrid': [shapeSelect],
        'shapeAltGrid': [shapeSelect],
        'backgroundImage': [backgroundSelect]
    });

    const values = Object.keys(value);

    app.PatternConfig = {
        value,
        values,
        select,
        defaultValue
    };
}());
