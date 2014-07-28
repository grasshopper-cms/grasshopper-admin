/*global define:false*/
define(['grasshopperBaseView', 'footerViewConfig'],
    function (GrasshopperBaseView, footerViewConfig) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : footerViewConfig
        });


    });
