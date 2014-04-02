/*global define:false*/
define(['grasshopperBaseView', 'validationAlphaConfig'],
    function (GrasshopperBaseView, validationAlphaConfig) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : validationAlphaConfig,
            afterRender : afterRender
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

    });


