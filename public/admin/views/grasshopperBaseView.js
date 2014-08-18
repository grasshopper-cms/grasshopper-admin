/*global define:false*/
define(['backbone', 'masseuse', 'resources', 'underscore'],
    function (Backbone, masseuse, resources, _) {
        'use strict';

        var RivetView = masseuse.plugins.rivets.RivetsView,
            oldSet = Backbone.Collection.prototype.set, DEFAULT_VIEW_OPTIONS=[
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
            mastheadButtonsSelector : '#mastheadButtons'/*,
            remove: remove*/
        });

        function initialize (options) {
            options.viewOptions = options.viewOptions || [];
            options.viewOptions =  options.viewOptions.concat(DEFAULT_VIEW_OPTIONS);

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

/*            if(!window.startedViews){
                window.startedViews=[];
            }
            window.startedViews.push({ name : this.name, cid : this.cid, parent : this.parent ? this.parent.name : 'NONE'});

            console.log('STARTING:', this.name);*/

            return RivetView.prototype.start.apply(this, arguments)
                .done(_handleAfterRender.bind(this));
        }

        /*function remove(){
            console.log('REMOVING:', this.name);
            var oldView = _.findWhere(window.startedViews, { cid : this.cid });
            window.startedViews = _.without(window.startedViews, oldView);
            RivetView.prototype.remove.apply(this,arguments);
        }*/

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