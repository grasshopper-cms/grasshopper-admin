/*global define:false*/
define(['grasshopperBaseView'], function (GrasshopperBaseView) {
    'use strict';

    return GrasshopperBaseView.extend({
        closeAlertBox : closeAlertBox
    });

    function closeAlertBox () {
        this.remove();
        return false;
    }

});