/*global define:false*/
define(['backbone', 'masseuse'], function (Backbone, masseuse) {
    'use strict';

    var RivetView = masseuse.plugins.rivets.RivetsView,
        oldSet = Backbone.Collection.prototype.set;

    return RivetView.extend({
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
                'rivetsBinders',
                'rivetsFormatters',
                'wrapper',
                'appendTo',
                'collection'
            ]);

        // TODO: I think I can get rid of this line.... Nowhere in this app do I call this.options or self.options.
        this.options = options;
        Backbone.Collection.prototype.set = function (data, options) {
            if (data && data.results) {
                data = data.results;
            }
            oldSet.call(this, data, options);
        };

        RivetView.prototype.initialize.apply(this, arguments);
    }

    function _handleAfterRender() {
        if (this.mastheadButtons) {
            this.channels.views.trigger('updateMastheadButtons', (this.mastheadButtons));
        }
        if (this.breadcrumbs) {
            this.channels.views.trigger('updateMastheadBreadcrumbs', this);
        }
    }

    function start () {
        // Checking user permissions
        if (this.permissions && this.permissions.indexOf(this.app.user.get('role')) === -1) {
            this.app.router.navigateTrigger('home');
            return;
        }

        this.on(RivetView.afterRenderDone, _handleAfterRender.call(this));

        return RivetView.prototype.start.apply(this, arguments);
    }


});