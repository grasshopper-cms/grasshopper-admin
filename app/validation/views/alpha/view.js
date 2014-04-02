/*global define:false*/
define(['grasshopperBaseView', 'validationAlphaConfig', 'resources'],
    function (GrasshopperBaseView, validationAlphaConfig, resources) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : validationAlphaConfig,
            afterRender : afterRender,
            deleteThisValidation : deleteThisValidation
        });

        function afterRender() {
            _initializeSortableAccordions.call(this);
        }

        function _initializeSortableAccordions() {
            var $accordion = this.$el;

            $accordion
                .accordion(
                {
                    header : '.validationAccordion',
                    icons : false,
                    active : false,
                    collapsible : true,
                    heightStyle : 'content'
                }
            );
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
