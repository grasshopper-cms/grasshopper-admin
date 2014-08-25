/*global define:false*/
define(['grasshopperBaseView', 'advancedSearch/config'],
    function (GrasshopperBaseView, config) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : config,
            afterRender : afterRender
        });

        function afterRender() {
            this.$el.foundation();
        }

    });