/*global define:false*/
define(['baseView', 'jquery'], function (BaseView, $) {
    'use strict';

    var ContentIndexView = BaseView.extend({
        afterRender: afterRender
    });

    function afterRender() {

        $(document).foundation('section', 'reflow');

    }


    return ContentIndexView;
});