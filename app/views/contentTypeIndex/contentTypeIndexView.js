/*global define:false*/
define(['baseView'], function (BaseView) {
    'use strict';

    return BaseView.extend({
        beforeRender : beforeRender
    });

    function beforeRender() {
        var self = this;
        this.model.fetch()
            .done(function() {
                console.log(self.model);
            })
            .fail(function() {
                console.log('it did not work');
            });
    }

});