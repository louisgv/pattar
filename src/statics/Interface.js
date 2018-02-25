/*
	Author: LAB

	Interface singleton
    Used to generate user interface, opinionated

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {Helper} = app;

    app.Interface = class {

        // Generate a select element
        static generateSelect(title, options, defaultValue, callback, addonClasses = '') {
            const optionLabelEl = Helper.createElement(
                `<label title="${title}" class="select-container ${addonClasses}"></label>`
            );

            const optionsEl = Helper.createElement(`<select name='options'></select>`);

            options.map((o) => {
                    const optionEl = Helper.createElement(
                        `<option ${o === defaultValue
                            ? 'selected'
                            : ''} value='${o}'>${o}</option>`
                    );

                    optionsEl.appendChild(optionEl);
                });

            optionsEl.addEventListener('change', callback);

            optionLabelEl.appendChild(optionsEl);

            return optionLabelEl;
        }

        // Generate a checkbox element
        static generateCheckBox(label, id, callback, checked = true, addonClasses = '') {
            const checkBoxEl = Helper.createElement(
                `
            <div title="Toggle ${label}" class="checkbox-container ${addonClasses}">
                <label class="checkbox">
                    ${label}
                    <input type="checkbox" id="${id}" ${checked
                    ? 'checked'
                    : ''}/>
                    <span class="checkmark"></span>
                </label>
            </div>
                `
            );

            checkBoxEl
                .querySelector(`#${id}`)
                .addEventListener('change', callback);

            return checkBoxEl;
        }

        // Generate a slider element
        static generateSlider(label, id, callback, value = 0.5, addonClasses = '') {
            const sliderContainerEl = Helper.createElement(
                `
                <div class="slider-container ${addonClasses}">
                    <label class="slider-label margin-right">
                        <span>${label}</span>
                    </label>
                    <input id="${id}"
                           title="Change ${label} Value"
                           class="slider margin-right"
                           type="range"
                           min="0"
                           max="1"
                           step="0.01"
                           value="${value}">
                    <button id="${id}-reset"
                      class="button slider-reset-button">
                      Reset
                    </button>
                </div>
                `
            );

            const sliderEl = sliderContainerEl.querySelector(`#${id}`);
            sliderEl.addEventListener('input', callback);

            sliderContainerEl
                .querySelector(`#${id}-reset`)
                .addEventListener('click', (e) => {
                    sliderEl.value = value;
                    sliderEl.dispatchEvent(new Event('input'));
                });

            sliderContainerEl.sliderEl = sliderEl;

            return sliderContainerEl;
        }
    };

}());
