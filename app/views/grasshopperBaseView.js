/*global define:false*/
define(['backbone', 'masseuse', 'resources', 'underscore'],
    function (Backbone, masseuse, resources, _) {
        'use strict';

        var RivetView = masseuse.plugins.rivets.RivetsView,
            defaultViewOptions = [
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
                'collection',
                'browserTitle'
            ];

        return RivetView.extend({
            initialize : initialize,
            start : start,
            fireErrorModal : fireErrorModal,
            enter : enter,
            remove : remove,
            mastheadButtonsSelector : '#mastheadButtons'
        });

        function initialize (options) {
            options.viewOptions = options.viewOptions || [];
            options.viewOptions =  options.viewOptions.concat(defaultViewOptions);

            this.options = options;

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
                this.app.router.navigateTrigger('forbidden',{ replace: true }); //replace: true is essential otherwise stuck in a loop when pressing "back"
                return;
            }

            return RivetView.prototype.start.apply(this, arguments)
                .done(_handleAfterRender.bind(this), this.enter);
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

        function enter() {
            if(_.has(this.options, 'transitions') && _.has(this.options.transitions, 'enter')) {
                this.$el.velocity(this.options.transitions.enter);
            }
        }

        function remove() {
            if(_.has(this.options, 'transitions') && _.has(this.options.transitions, 'exit')) {
               this.$el.velocity(this.options.transitions.exit, {
                   complete : RivetView.prototype.remove.bind(this, arguments)
               });
            } else {
                RivetView.prototype.remove.apply(this, arguments);
            }
        }

    });