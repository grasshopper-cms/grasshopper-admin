/*global define:false*/
define(['baseView'], function (BaseView) {
    'use strict';

    var nodeIndexView = BaseView.extend({
        beforeRender: beforeRender
    });

    function beforeRender() {
        var self = this;
        console.log('before render on the NodeIndexView');

        this.model.fetch()
            .done(function() {
                console.log(self.model);
            });
    }

    return nodeIndexView;
});