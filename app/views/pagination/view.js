/*global define:false*/
define(['grasshopperBaseView', 'pagination/options'],
    function (GrasshopperBaseView, options) {
    'use strict';

    return GrasshopperBaseView.extend({
        defaultOptions : options,
        next : next
    });

    function next(e, context) {
        this.collection.next(e, context);
    }


});