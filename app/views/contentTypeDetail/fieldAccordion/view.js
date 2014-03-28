/*global define:false*/
define(['grasshopperBaseView', 'fieldAccordionConfig'],
    function(grasshopperBaseView, fieldAccordionConfig) {
        'use strict';

        return grasshopperBaseView.extend({
            defaultOptions : fieldAccordionConfig,
            beforeRender : beforeRender
        });

        function beforeRender() {
            console.log(this);
        }

    });