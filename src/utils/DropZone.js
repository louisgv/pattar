/*
	Author: LAB

	Dropzone module.
	When applying to an element, allowing files to be drag and dropped.
	Can filter out file type if necessary.

    LICENSE: MIT
*/
"use strict";
var app = app || {};

app.DropZone = {
    // Apply drag/drop event to an element and ire callback whenever
    // a file is dropped
    // 'audio.*'
    // 'image.*'
    apply(el, callback, blobType = null) {
        el.addEventListener('dragover', (e) => {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        }, false);

        el.addEventListener('drop', (e) => {
            e.stopPropagation(); // Stops some browsers from redirecting.
            e.preventDefault();

            const {
                x,
                y
            } = e;

            const fileBlob = e.dataTransfer.files[0];

            if (!fileBlob) {
                return;
            }

            if (blobType && !fileBlob.type.match(blobType)) {
            	return;
            }

            // If not image ignore
            callback(fileBlob, {
                x,
                y
            });
        }, false);
    }
};
