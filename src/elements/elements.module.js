/**
 * @ngdoc overview
 * @name elements
 * @requires utilities
 * @description
 * # Elements
 * Elements are visual directives.
 *
 * ## Directives
 * * {@link elements.directive:rxAccountInfo rxAccountInfo}
 * * {@link elements.directive:rxActionMenu rxActionMenu}
 * * {@link elements.directive:rxButton rxButton}
 * * {@link elements.directive:rxCheckbox rxCheckbox}
 * * {@link elements.directive:rxDatePicker rxDatePicker}
 * * {@link elements.directive:rxMetadata rxMetadata}
 * * {@link elements.directive:rxTimePicker rxTimePicker}
 */
angular.module('encore.ui.elements', [
    'cfp.hotkeys',
    'encore.ui.utilities',
    'encore.ui.rxEnvironment',
    'encore.ui.rxPermission',
    'ngRoute',
    'ngSanitize'
]);
