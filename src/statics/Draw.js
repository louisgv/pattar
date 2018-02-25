/*
	Author: LAB
	Main app module for pattar

    LICENSE: GPLv3
*/

// An IIFE ("Iffy") - see the notes in mycourses
"use strict";
var app = app || {};
(function() {

    const {Main, Global, Helper} = app;

    // Handle on initialization
    function init() {
        draftCanvas = document.querySelector('#draft-canvas');
        draftCanvasCtx = draftCanvas.getContext('2d');

        mainCanvas = document.querySelector('#main-canvas');
        mainCanvasCtx = draftCanvas.getContext('2d');

        setupUI();

        // start animation loop
        update();
    }

    // Handle Setup UI event
    function setupUI() {

        const toggleUIButton = document.querySelector('#toggleui-button');
        toggleUIButton.addEventListener('click', Helper.toggleUIElement);

        setTimeout(() => {
            toggleUIButton.dispatchEvent(new Event('click'));
        }, 900);

        draftCanvas.addEventListener('mousedown', onMouseDownDraftCanvas);
        draftCanvas.addEventListener('mousemove', onMouseMoveDraftCanvas);
        draftCanvas.addEventListener('mouseup', onMouseUpDraftCanvas);
        draftCanvas.addEventListener('mouseout', onMouseOutDraftCanvas);
    }

    function clearMainCanvas() {
        Helper.clearCanvas(mainCanvasCtx);
    }

    function clearDraftCanvas() {
        Helper.clearCanvas(draftCanvasCtx);
    }

    function onMouseDownDraftCanvas(e) {
        dragging = true;

        const mouse = Helper.getMouse(e);

        console.log(mouse);
    }

    function onMouseMoveDraftCanvas(e) {
        if (!dragging) {
            return;
        }

        const mouse = Helper.getMouse(e);

        console.log(mouse);
    }

    function onMouseUpDraftCanvas(e) {

        dragging = false;
    }

    // if the user drags out of the canvas
    function onMouseOutDraftCanvas(e) {

        dragging = false;
    }



}());
