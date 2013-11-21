/*global define:false*/
define(['baseView'], function (BaseView) {
    'use strict';

    var assetIndexView = BaseView.extend({
        beforeRender: beforeRender
    });

    function beforeRender() {
        console.log('assetIndexView');
    }

    return assetIndexView;
});