/*global define:false*/
define(['grasshopperBaseView', 'validationAlphaNumericConfig'],
    function (GrasshopperBaseView, validationAlphaNumericConfig) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : validationAlphaNumericConfig,
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
                    header : '.accordionHeader',
                    icons : false,
                    active : false,
                    collapsible : true,
                    heightStyle : 'content'
                }
            );
        }

    });


