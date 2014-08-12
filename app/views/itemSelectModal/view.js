/*global define:false*/
define(['grasshopperBaseView', 'itemSelectModal/config', 'jquery', 'breadcrumbWorker'],
    function (GrasshopperBaseView, config, $, breadcrumbWorker) {

        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : config,
            initialize : initialize,
            beforeRender : beforeRender,
            confirmModal : confirmModal,
            cancelModal : cancelModal,
            navigateToFolder : navigateToFolder
        });

        function initialize(options) {
            switch (options.type) {
                case 'file':
                    options.template = config.fileTemplate;
                    break;
                case 'content':
                    options.template = config.contentTemplate;
                    break;
                default:
                    options.template = config.contentTemplate;
                    break;
            }

            this.options = options;
            GrasshopperBaseView.prototype.initialize.apply(this, arguments);
        }

        function beforeRender($deferred) {
            _setBreadcrumbs.call(this);

            $.when(_fetchChildNodes.call(this),
                    _fetchChildContent.call(this))
                .done($deferred.resolve);
        }

        function _fetchChildNodes() {
            return this.model.get('childNodes').fetch();
        }

        function _fetchChildContent() {
            return this.model.get('content').fetch();
        }

        function confirmModal () {
            this.$deferred.resolve(this.model.get('value'));
            _removeModal.call(this);
        }

        function cancelModal () {
            this.$deferred.reject();
            _removeModal.call(this);
        }

        function _removeModal () {
            this.remove();
        }

        function _setBreadcrumbs() {
            var $deferred = new $.Deferred(),
                self = this;

            $deferred.done(function() {
                self.model.set('breadcrumbs', self.breadcrumbs);
            });

            breadcrumbWorker.contentBrowse.call(this, $deferred, { trigger : false });
        }

        function navigateToFolder(e) {
            this.model.set('_id', $(e.target).attr('nodeId'));

            breadcrumbWorker.resetBreadcrumb.call(this);

            _setBreadcrumbs.call(this);
            _fetchChildNodes.call(this);
            _fetchChildContent.call(this);
        }

    });
