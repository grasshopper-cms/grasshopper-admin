/*global define:false*/
define(['baseView'], function (BaseView) {
    'use strict';

    var assetIndexView = BaseView.extend({
        beforeRender: beforeRender
    });

    function beforeRender() {
        var self = this;

        if(this.options.nodeId) {
            this.model.url = this.model.url.replace(':id', this.options.nodeId);
        } else {
            this.model.url = this.model.url.replace(':id', 0);
        }

        this.model.fetch()
            .done(function() {
                console.log(self.model);
            });
    }

    return assetIndexView;
});