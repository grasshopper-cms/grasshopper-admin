/*global define:false*/
define(['grasshopperBaseView', 'validationNumberConfig'],
    function (GrasshopperBaseView, validationNumberConfig) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : validationNumberConfig,
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


