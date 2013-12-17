/*global define:false*/
define(['grasshopperBaseView', 'jquery'], function (GrasshopperBaseView, $) {
    'use strict';

    return GrasshopperBaseView.extend({
        afterRender: afterRender
    });

    function afterRender() {
        // TODO: What is this and what is it doing?
        $('.report-cirque').cirque ({
            radius: 60,
            total: 7630,
            lineWidth: 10,
            trackColor: '#CCCCCC'
        });
    }

});