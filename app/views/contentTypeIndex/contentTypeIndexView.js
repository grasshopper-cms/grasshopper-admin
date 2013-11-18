/*global define:false*/
define(['baseView'], function (BaseView) {
    'use strict';

    return BaseView.extend({
        beforeRender : beforeRender
    });

    function beforeRender() {
        console.log('brah');
    }

});