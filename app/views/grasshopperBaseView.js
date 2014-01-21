/*global define:false*/
define(['backbone', 'masseuse', 'helpers', 'rivetsPlugin'], function (Backbone, masseuse, helpers, rivetsPlugin) {
    'use strict';

    var BaseView = masseuse.BaseView,
        oldSet = Backbone.Collection.prototype.set;

    return BaseView.extend({
        initialize : initialize,
        start : start
    });

    function initialize (options) {
        options.viewOptions = options.viewOptions || [];
        options.viewOptions =  options.viewOptions.concat(
            [
                'rivetConfig',
                '$deferred',
                'type',
                'temporary',
                'defaultBreadcrumbs',
                'defaultMastheadButtons',
                'breadcrumbs',
                'mastheadButtons',
                'permissions',
                'nodeId',
                'rivetBinders',
                'rivetFormatters',
                'wrapper',
                'appendTo',
                'collection'
            ]);
        if (options.rivetConfig) {
            options.plugins = [];
            options.plugins.push(rivetsPlugin.plugin);
        }
        // TODO: I think I can get rid of this line.... Nowhere in this app do I call this.options or self.options.
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