/*global define:false*/
define(['grasshopperBaseView', 'validationTimeConfig'],
    function (GrasshopperBaseView, validationTimeConfig) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : validationTimeConfig
        });
    });