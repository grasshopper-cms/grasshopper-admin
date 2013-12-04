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
        // Checking user permissions
        if(this.options.permissions && this.options.permissions.indexOf(this.app.user.get('role')) === -1) {
            this.app.router.navigateTrigger('home');
            return;
        }

        var $promise = BaseView.prototype.start.apply(this, arguments),
            self = this;

        $promise.progress(function(event){
            switch (event) {
                case BaseView.afterRenderDone:
                    if (self.options.mastheadButtons) {
                        self.channels.views.trigger('updateMastheadButtons', (self.options.mastheadButtons));
                    }
                    if (self.options.breadcrumbs) {
                        self.channels.views.trigger('updateMastheadBreadcrumbs', self);
                    }
                    if (self.options.rivetConfig) {
                        self.rivetView();
                        self.channels.views.trigger('rivetViewRendered');
                    }
                    break;
            }
        });

        return $promise;
    }

});