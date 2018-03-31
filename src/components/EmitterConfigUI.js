/*
	Author: LAB

	Filter Config UI
	Used to Generate the UI to control each Filter

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {EmitterConfig, Interface, Helper, Global} = app;

    app.EmitterConfigUI = class {

        constructor(emitterInstance) {
            this.emitterInstance = emitterInstance;
        }

        // Generate a column of a viz UI
        generateCol(onChange) {
            const instance = this.emitterInstance;
            const [key, label, isEnabled] = EmitterConfig.value;

            const bodyEl = Helper.createElement(`
                <div class="flex-inline-row flex-wrap margin-top-double margin-bottom-double">
                </div>
                `);

            const toggleEl = Interface.generateCheckBox(label, key, (e) => {
                instance.disabled = !e.target.checked;

                onChange();
            }, !!isEnabled, 'margin-right');

            bodyEl.appendChild(toggleEl);

            return bodyEl;
        }

        // Generate and mount the config UI onto the parentEl
        mount(parentEl, onChange) {
            parentEl.appendChild(this.generateCol(onChange));
        }
    };
}());
