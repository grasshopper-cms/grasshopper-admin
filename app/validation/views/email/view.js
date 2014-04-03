/*global define:false*/
define(['grasshopperBaseView', 'validationEmailConfig', 'resources'],
    function (GrasshopperBaseView, validationEmailConfig, resources) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : validationEmailConfig,
            afterRender : afterRender,
            deleteThisValidation : deleteThisValidation
        });

        function afterRender() {
            this.parent.model.updateValidationRulesOnModel();
        }

        function deleteThisValidation(e) {
            e.stopPropagation();
            _warnUserBeforeDeleting.call(this)
                .done(_actuallyDeleteThisValidation.bind(this));
        }

        function _warnUserBeforeDeleting() {
            return this.displayModal({
                header : resources.warning,
                msg : resources.validationViews.deletionWarning
            });
        }

        function _actuallyDeleteThisValidation() {
            this.parent.model.get('validationCollection').remove(this.model);
            this.remove();
        }

    });
