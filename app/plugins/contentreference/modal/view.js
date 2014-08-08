/*global define:false*/
define(['grasshopperBaseView', 'plugins/contentreference/modal/config', 'jquery', 'breadcrumbWorker', 'searchWorker'],
    function (GrasshopperBaseView, config, $, breadcrumbWorker, searchWorker) {

        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : config,
            beforeRender : beforeRender,
            afterRender : afterRender,
            stopAccordionPropagation : stopAccordionPropagation,
            confirmModal : confirmModal,
            cancelModal : cancelModal,
            setSelectedNode : setSelectedNode,
            searchContent : searchContent,
            navigateToFolder : navigateToFolder
        });

        function beforeRender($deferred) {
            _setBreadcrumbs.call(this);
            $.when(_fetchChildNodes.call(this),
                    _fetchChildContent.call(this),
                    _fetchCurrentNode.call(this))
                .done(
                    _toggleLoadingSpinner.bind(this),
                    $deferred.resolve
                );
        }

        function afterRender() {
            this.$el.foundation();
        }

        function _fetchChildNodes() {
            return this.model.get('children').fetch();
        }

        function _fetchChildContent() {
            if(!this.model.get('inRoot')) {
                return this.searchContent(undefined, undefined, true);
            }
        }

        function _fetchCurrentNode() {
            return this.model.fetch();
        }

        function _toggleLoadingSpinner() {
            this.model.toggle('loading');
        }

        function stopAccordionPropagation(e) {
            e.stopPropagation();
        }

        function confirmModal () {
            this.$deferred.resolve(this.model.attributes);
            _removeModal.call(this);
        }

        function cancelModal () {
            this.$deferred.reject();
            _removeModal.call(this);
        }

        function _removeModal () {
            this.remove();
        }

        function setSelectedNode() {
            return false;
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
            _fetchCurrentNode.call(this);
        }

        function searchContent(e, context, isFirstQuery) {
            return searchWorker.searchContent.call(this, e, context, 'content', false, isFirstQuery);
        }
    });
