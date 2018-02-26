/*
	Author: LAB
	Loader module for pattar

    LICENSE: GPLv3
*/

"use strict";
var app = app || {};
(function() {

    const {Main, Drawpad, Keyboard, Sound} = app;

    const main = new Main();

    window.addEventListener('load', () => {
        main.sound = new Sound();
        main.keyboard = new Keyboard();
        main.drawpad = new Drawpad();

        main.init();
    });

    window.addEventListener('resize', () => main.setupCache());

    window.addEventListener('blur', () => main.halt());

    window.addEventListener('focus', () => main.resume());

    window.addEventListener('keydown', (e) => main.keyboard.onKeyDown(e));

    window.addEventListener('keyup', (e) => {
        switch (main.keyboard.onKeyUp(e)) {
            case 'P':
                {
                    if (main.paused) {
                        main.resume();
                    } else {
                        main.halt();
                    }
                    break;
                }
            default:
        }
    });
}());
