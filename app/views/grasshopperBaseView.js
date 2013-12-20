/*global define:false*/
define(['backbone', 'masseuse', 'helpers'], function (Backbone, masseuse, helpers) {
    'use strict';

    var BaseView = masseuse.BaseView,
        oldSet = Backbone.Collection.prototype.set,
        rivetsPlugin = helpers.rivetsPlugin;

    return BaseView.extend({
        initialize : initialize,
        start : start
    });

    function initialize (options) {

        if (options.rivetConfig) {
            options.viewOptions = options.viewOptions || [];
            options.viewOptions.push('rivetConfig');
            options.plugins = [];
            options.plugins.push(rivetsPlugin);
        }
        this.options = options;
        Backbone.Collection.prototype.set = function (data, options) {
            if (data && data.results) {
                data = data.results;
            }
            oldSet.call(this, data, options);
        };

        BaseView.prototype.initialize.apply(this, arguments);
    }

    function start () {
        // Checking user permissions
        if (this.permissions && this.permissions.indexOf(this.app.user.get('role')) === -1) {
            this.app.router.navigateTrigger('home');
            return;
        }

        var $promise = BaseView.prototype.start.apply(this, arguments),
            self = this;

        $promise.progress(function (event) {
            switch (event) {
            case BaseView.afterRenderDone:
                if (self.mastheadButtons) {
                    self.channels.views.trigger('updateMastheadButtons', (self.mastheadButtons));
                }
                if (self.breadcrumbs) {
                    self.channels.views.trigger('updateMastheadBreadcrumbs', self);
                }
                if (self.rivetConfig) {
                    self.rivetView();
                    self.channels.views.trigger('rivetViewRendered');
                }
                break;
            }
        });

        return $promise;
    }

});