var Page = require('astrolabe').Page;
var _ = require('lodash');

/**
 * @namespace
 */
var rxFieldName = {
    eleRequiredSymbol: {
        get: function () {
            return this.rootElement.$('.required-symbol');
        }
    },

    eleContent: {
        get: function () {
            return this.rootElement.$('.rx-field-name-content');
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not a required field currently displays a red asterisk next to it.
     * @returns {Boolean}
     */
    isSymbolDisplayed: {
        value: function () {
            return this.eleRequiredSymbol.isDisplayed();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether the required symbol is present in the DOM.
     * @returns {Boolean}
     */
    isSymbolPresent: {
        value: function () {
            return this.eleRequiredSymbol.isPresent();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether the field is currently displayed.
     * @returns {Boolean}
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether the field is currently present on the page.
     * @returns {Boolean}
     */
    isPresent: {
        value: function () {
            return this.rootElement.isPresent();
        }
    }
};//rxFieldName

/**
 * @namespace rxForm
 */
exports.rxForm = {
    /**
     * @namespace
     */
    textField: {
        /**
         * @function
         * @description
         * Generates a getter and a setter for a text field on your page.
         * Text fields include text boxes, text areas, anything that responds to `.clear()` and `.sendKeys()`.
         * @param {ElementFinder} elem - The ElementFinder for the text field.
         * @returns {Object} A getter and a setter to be applied to a text field in a page object.
         *
         * @example
         * var yourPage = Page.create({
         *     plainTextbox: rxForm.textField.generateAccessor(element(by.model('username')));
         * });
         *
         * it('should fill out the text box', function () {
         *     yourPage.plainTextbox = 'My Username'; // setter
         *     expect(yourPage.plainTextbox).to.eventually.equal('My Username'); // getter
         * });
         */
        generateAccessor: function (elem) {
            return {
                get: function () {
                    return elem.getAttribute('value');
                },
                set: function (input) {
                    elem.clear();
                    elem.sendKeys(input);
                }
            };
        }
    },

    /**
     * @description
     * Set `value` in `formData` to the page object's current method `key`.
     * Aids in filling out form data via javascript objects.
     * For an example of this in use, see [encore-ui's end to end tests]{@link http://goo.gl/R7Frwv}.
     * @param {Object} reference - Context to evaluate under as `this` (typically, `this`).
     * @param {Object} formData - Key-value pairs of deeply-nested form items, and their values to fill.
     *
     * @example
     * var yourPage = Page.create({
     *     form: {
     *         set: function (formData) {
     *             rxForm.fill(this, formData);
     *         }
     *     },
     *
     *     aTextbox: encore.rxForm.textField.generateAccessor(element(by.model('textbox'))),
     *
     *     aRadioButton: encore.rxRadio.generateAccessor(element(by.model('radioButton'))),
     *     anotherRadioButton: encore.rxRadio.generateAccessor(element(by.model('radioButton_1'))),
     *
     *     aSelectDropdown: encore.rxSelect.generateAccessor(element(by.model('dropdown')));
     *
     *     aModule: {
     *         // this is now a namespace within your page object
     *         get hasMethods() {
     *             return encore.rxForm.textField.generateAccessor(element(by.model('internalTextbox')))
     *         },
     *
     *         deepNesting: {
     *             // namespace within a namespace
     *             get might() {
     *                 return encore.rxForm.textField.generateAccessor(element(by.model('nested')))
     *             }
     *         }
     *     }
     *
     * });
     *
     * yourPage.form = {
     *     aTextbox: 'My Name',
     *     aRadioButton: true,
     *     aSelectDropdown: 'My Choice'
     *     aModule: {
     *         hasMethods: 'Can Accept Input Too',
     *         deepNesting: {
     *             might: 'be overkill at this level'
     *         }
     *     }
     * };
     * // executing the above would execute all `setter` methods of your form to equal the values listed above.
     */
    fill: function (reference, formData) {
        var next = this;
        var page = reference;
        _.forEach(formData, function (value, key) {
            if (_.isPlainObject(value)) {
                // There is a deeply-nested function call in the form.
                reference = page[key];
                next.fill(reference, value);
            } else {
                page[key] = value;
            }
        });
    },

    //TODO: split out into exports.rxFieldName (src/rxFieldName.page.js)
    /**
     * @namespace
     */
    fieldName: {
        /**
         * @function
         * @param {ElementFinder} rxFieldNameElement -
         * ElementFinder to be transformed into an rxFieldNameElement object.
         * @returns {rxFieldName} Page object representing the rxFieldName object.
         */
        initialize: function (rxFieldNameElement) {
            rxFieldName.rootElement = {
                get: function () { return rxFieldNameElement; }
            };
            return Page.create(rxFieldName);
        }
    }
};
