/*global define:false*/
define(['baseView', 'jquery'], function (BaseView, $) {
    'use strict';

    var ContentIndexView = BaseView.extend({
        beforeRender: beforeRender,
        afterRender: afterRender
    });

    function beforeRender() {
        this.model.fetch()
            .done(function() {
                console.log(this.mode);
            });
    }

    function afterRender() {
        //TODO: What is this and what is it doing? maybe it should be moved.
        $(document).foundation('section', 'reflow');
    }


    return ContentIndexView;
});