/*global define:false*/
define(['grasshopperBaseView', 'validationDateConfig'],
    function (GrasshopperBaseView, validationDateConfig) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : validationDateConfig,
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


