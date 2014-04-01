/*global define:false*/
define(['grasshopperBaseView', 'validationEmailConfig'],
    function (GrasshopperBaseView, validationEmailConfig) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : validationEmailConfig,
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


