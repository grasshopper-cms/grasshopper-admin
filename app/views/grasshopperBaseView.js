/*global define:false*/
define(['backbone', 'masseuse', 'resources'],
    function (Backbone, masseuse, resources) {
        'use strict';

        var RivetView = masseuse.plugins.rivets.RivetsView,
            oldSet = Backbone.Collection.prototype.set;

        return RivetView.extend({
            initialize : initialize,
            start : start,
            fireErrorModal : fireErrorModal,
            mastheadButtonsSelector : '#mastheadButtons'
        });

        function initialize (options) {
            options.viewOptions = options.viewOptions || [];
            options.viewOptions =  options.viewOptions.concat(
                [
                    '$deferred',
                    'type',
                    'defaultBreadcrumbs',
                    'defaultMastheadButtons',
                    'breadcrumbs',
                    'privateBreadcrumbs',
                    'mastheadButtons',
                    'permissions',
                    'nodeId',
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
            if (this.breadcrumbs && !this.privateBreadcrumbs) {
                this.channels.views.trigger('updateMastheadBreadcrumbs', this);
            }
        }

        function start () {
            // Checking user permissions
            if (this.permissions && this.permissions.indexOf(this.app.user.get('role')) === -1) {
                // replace: true is essential if we want user to be able to go back. otherwise he will got stuck in
                // a loop when pressing "back"
                this.app.router.navigateTrigger('forbidden',{replace: true});
                return;
            }

            return RivetView.prototype.start.apply(this, arguments)
                .done(_handleAfterRender.bind(this));
        }

        function fireErrorModal(message) {
            return this.displayModal(
                {
                    header : resources.error,
                    type : 'error',
                    msg : message
                }
            );
        }

    });