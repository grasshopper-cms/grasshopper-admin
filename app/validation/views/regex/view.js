/*global define:false*/
define(['grasshopperBaseView', 'validationRegexConfig'],
    function (GrasshopperBaseView, validationRegexConfig) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : validationRegexConfig,
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


