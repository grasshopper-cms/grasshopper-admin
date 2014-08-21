/*global define:false*/
define(['grasshopperBaseView', 'advancedSearch/content/config'],
    function (GrasshopperBaseView, config) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : config
        });

    });