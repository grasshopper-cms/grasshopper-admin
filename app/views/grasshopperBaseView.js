/*global define:false*/
define(['masseuseBaseView'], function (BaseView) {
    'use strict';

    var oldSet = Backbone.Collection.prototype.set;

    return BaseView.extend({
        initialize : initialize,
        start : start
    });

    function initialize() {
        Backbone.Collection.prototype.set = function (data, options) {
            if (data && data.results) {
                data = data.results;
            }
            oldSet.call(this, data, options);
        };

        BaseView.prototype.initialize.apply(this, arguments);
    }

    function start() {
        var $promise = BaseView.prototype.start.apply(this, arguments),
            self = this;

        $promise.progress(function(event){
            switch (event) {
                case BaseView.afterRenderDone:
                    if (self.options.rivetConfig) {
                        self.rivetView();
                    }
                    self.channels.views.trigger('updateMastheadButtons', (self.options.mastheadButtons) ? self.options.mastheadButtons : null);
                    break;
            }
        });

        return $promise;
    }

});