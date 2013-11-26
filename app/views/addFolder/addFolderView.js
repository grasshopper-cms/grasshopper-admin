/*global define:false*/
define(['baseView'],
    function (BaseView) {
    'use strict';

    return BaseView.extend({
        afterRender: afterRender
    });

    function afterRender() {
        this.displayModal('Please enter the name of the folder:', 'input');
    }

});