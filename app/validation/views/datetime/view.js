/*global define:false*/
define(['grasshopperBaseView', 'validationDatetimeConfig'],
    function (GrasshopperBaseView, validationDatetimeConfig) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : validationDatetimeConfig,
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

