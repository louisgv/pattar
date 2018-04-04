/*
	Author: LAB
	Drawpad Recorder module for pattar

    Code adapted from https://github.com/webrtc/samples/blob/gh-pages/src/content/capture/canvas-record/js/main.js#L48

    LICENSE: MIT
*/

// An IIFE ("Iffy") - see the notes in mycourses
"use strict";
var app = app || {};
(function() {
    const {Vector2, Helper} = app;

    app.DrawpadRecorder = class {
        constructor() {

            this.mediaSource = new MediaSource();

            this.sourceBuffer = null;

            this.mediaRecorder = null;
            this.recordedBlobs = [];

            this.stream = null;

            this.mediaSource.addEventListener('sourceopen', () => this.handleSourceOpen(), false);
        }

        // Initialize source buffer on media open
        handleSourceOpen() {
            this.sourceBuffer = this.mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
        }

        // Append new data into the recorded blobs
        handleDataAvailable({data}) {
            if (data && data.size > 0) {
                this.recordedBlobs.push(data);
            }
        }

        // Init recording
        startRecording(canvas) {
            this.stream = canvas.captureStream();
            const options = {
                mimeType: 'video/webm'
            };
            this.recordedBlobs = [];
            this.mediaRecorder = new MediaRecorder(this.stream, options);

            this.mediaRecorder.ondataavailable = (e) => this.handleDataAvailable(e);

            this.mediaRecorder.start(100);
        }

        // Stop recording
        stopRecording() {
            return new Promise((resolve, reject) => {
                this.mediaRecorder.onstop = () => {
                    resolve(new Blob(this.recordedBlobs, {type: 'video/webm'}));
                };
                this.mediaRecorder.stop();
                this.stream = null;
            });
        }

    };
}());
