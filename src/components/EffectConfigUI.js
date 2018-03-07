/*
	Author: LAB

	Filter Config UI
	Used to Generate the UI to control each Filter

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function () {
    const {
        EffectConfig,
        Interface,
        Helper,
        Global
    } = app;

    app.EffectConfigUI = class {

        constructor(filterInstance) {
            this.filterInstance = filterInstance;
        }

        // Generate a column of a viz UI
        generateCol(f, onChange) {
            const instance = this.filterInstance[f];
            const [label, isEnabled] = EffectConfig.value[f];

            const bodyEl = Helper.createElement(`<div class="flex-inline-row margin-bottom"></div>`);

            const toggleEl = Interface.generateCheckBox(label, f, (e) => {
                instance.disabled = !e.target.checked;

                onChange();
            }, !!isEnabled, 'margin-right');

            bodyEl.appendChild(toggleEl);

            const effectConfig = instance.config;

            EffectConfig.slider[f].forEach(([sliderLabel, sliderConfig, min, max]) => {
                const delta = max - min;
                const defaultValue = (effectConfig[sliderConfig] - min ) /delta;
                
                const sliderEl = Interface.generateSlider(sliderLabel, `${sliderConfig}-slider`, (e) => {
                    effectConfig[sliderConfig] = parseFloat(e.target.value) * delta + min;
                    
                    onChange();
                }, defaultValue, 'margin-right');

                bodyEl.appendChild(sliderEl);
            });

            return bodyEl;
        }

        // Generate and mount the config UI onto the parentEl
        mount(parentEl, onChange) {
            EffectConfig.values.map((v) => {
                parentEl.appendChild(this.generateCol(v, onChange));
            });
        }
    };
}());