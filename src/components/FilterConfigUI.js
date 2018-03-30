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
        FilterConfig,
        Interface,
        Helper,
        Global
    } = app;

    app.FilterConfigUI = class {

        constructor(filterInstance) {
            this.filterInstance = filterInstance;
        }

        // Generate a column of a viz UI
        generateCol(f, onChange) {
            const instance = this.filterInstance[f];
            const [label, isEnabled] = FilterConfig.value[f];

            const bodyEl = Helper.createElement(`<div class="flex-inline-row flex-wrap margin-top-double margin-bottom-double"></div>`);

            const filterToggleEl = Interface.generateCheckBox(label, f, (e) => {
                instance.disabled = !e.target.checked;

                onChange();
            }, !!isEnabled, 'margin-right');

            bodyEl.appendChild(filterToggleEl);

            const filterConfig = instance.config;

            if (FilterConfig.slider[f]) {
                FilterConfig.slider[f].forEach(([sliderLabel, sliderConfig, min, max]) => {
                    const delta = max - min;
                    const defaultValue = (filterConfig[sliderConfig] - min ) /delta;

                    const sliderEl = Interface.generateSlider(sliderLabel, `${sliderConfig}-slider`, (e) => {
                        filterConfig[sliderConfig] = parseFloat(e.target.value) * delta + min;

                        onChange();
                    }, defaultValue, 'margin-right');

                    bodyEl.appendChild(sliderEl);
                });
            }

            if (FilterConfig.checkbox[f]) {
                FilterConfig.checkbox[f].forEach(([checkBoxLabel, path, key]) => {
                    const checkBoxConfig = Helper.traceProp(path, filterConfig);

                    const checkBoxEl = Interface.generateCheckBox(checkBoxLabel, `${f}-${key}`, (e) => {
                        checkBoxConfig[key] = e.target.checked;
                    }, checkBoxConfig[key], 'tool-col');

                    bodyEl.appendChild(checkBoxEl);
                });
            }

            return bodyEl;
        }

        // Generate and mount the config UI onto the parentEl
        mount(parentEl, onChange) {
            FilterConfig.values.map((v) => {
                parentEl.appendChild(this.generateCol(v, onChange));
            });
        }
    };
}());
