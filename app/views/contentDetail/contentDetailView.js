/*global define:false*/
define(['grasshopperBaseView', 'contentDetailViewConfig', 'resources', 'jquery', 'api', 'breadcrumbWorker', 'constants',
        'underscore'],
    function (GrasshopperBaseView, contentDetailViewConfig, resources, $, Api, breadcrumbWorker, constants, _) {
    'use strict';

    return GrasshopperBaseView.extend({
        defaultOptions : contentDetailViewConfig,
        beforeRender : beforeRender,
        afterRender : afterRender,
        deleteContent : deleteContent,
        handleRowClick : handleRowClick,
        saveContent : saveContent,
        saveAndClose : saveAndClose,
        remove : remove
    });

    function beforeRender($deferred) {
        if(this.model.get('isNew')) {
            _getContentSchema.call(this, $deferred);
        } else {
            if(this.name === 'contentDetailRow') {
                _fetchContentDetails.call(this)
                    .done(this.model.resetContentLabel.bind(this.model), $deferred.resolve);
            } else {
                _fetchContentDetails.call(this)
                    .done(_getContentSchema.bind(this, $deferred))
                    .fail(_handleFailedModelFetch.bind(this, $deferred));
            }
        }
    }

    function afterRender() {
        this.$el.foundation();
        _addListenerForModelChange.call(this);
        _addMastheadListeners.call(this);
    }

    function deleteContent () {
        _confirmDeletion.call(this)
            .then(_destroyThisModel.bind(this));
    }

    function _confirmDeletion() {
        return this.displayModal(
            {
                header : resources.warning,
                msg : resources.contentItem.deletionWarning
            });
    }

    function _destroyThisModel() {
        this.model.destroy(
            {
                success : _handleSuccessfulDeletion.bind(this),
                error : _handleFailedDeletion.bind(this)
            });
    }

    function _handleFailedDeletion(model) {
        this.fireErrorModal(resources.contentItem.errorDeleted + model.get('label'));
    }

    function _handleSuccessfulDeletion(model) {
        this.displayTemporaryAlertBox(
            {
                header : resources.success,
                style : 'success',
                msg : resources.contentItem.successfullyDeletedPre + model.get('label') +
                    resources.contentItem.successfullyDeletedPost
            }
        );
        this.remove();
    }

    function handleRowClick () {
        this.app.router.navigateTrigger(this.model.get('href'));
    }

    function saveContent() {
        _saveContentWorkflow.call(this, {});
    }

    function saveAndClose() {
        _saveContentWorkflow.call(this, { close : true });
    }

    function _saveContentWorkflow(options) {
        this.model.save({ parse : false })
            .done(_handleSuccessfulModelSave.bind(this, options))
            .fail(_handleFailedModelSave.bind(this));
    }

    function _handleSuccessfulModelSave(options) {
        this.displayTemporaryAlertBox(
            {
                header : resources.success,
                style : 'success',
                msg : resources.contentItem.successfullySaved
            }
        );

        if(this.model.get('isNew')) {
            this.model.set('isNew', false);
        }

        if(options.close) {
            this.app.router.navigateTrigger(
                constants.internalRoutes.nodeDetail.replace(':id', this.model.get('meta.node')));
        } else {
            this.app.router.navigateNinja(
                constants.internalRoutes.contentDetail.replace(':id', this.model.get('_id')));

            breadcrumbWorker.resetBreadcrumb.call(this);
            this.model.resetContentLabel();
            _updateMastheadBreadcrumbs.call(this);
        }
    }

    function _handleFailedModelSave() {
        this.fireErrorModal(resources.contentItem.failedToSave);
    }

    function _fetchContentDetails() {
        return this.model.fetch();
    }

    function _handleFailedModelFetch($deferred) {
        this.fireErrorModal(resources.contentItem.failedToFetch);
        $deferred.reject();
    }

    function _getContentSchema($deferred) {
        Api.getContentType(this.model.get('meta.type'))
            .done(
                this.model.resetContentLabel.bind(this.model),
                _handleSuccessfulContentSchemaRetrieval.bind(this, $deferred)
            )
            .fail(_handleFailedContentSchemaRetrieval.bind(this, $deferred));
    }

    function _handleSuccessfulContentSchemaRetrieval($deferred, schema) {
        this.model.set('schema', schema);

        _updateMastheadBreadcrumbs.call(this, $deferred);
    }

    function _handleFailedContentSchemaRetrieval($deferred) {
        this.fireErrorModal(resources.contentItem.failedToFetchContentsContentType);
        $deferred.reject();
    }

    function _updateMastheadBreadcrumbs($deferred) {
        breadcrumbWorker.contentBreadcrumb.call(this, $deferred);
    }

    function _addListenerForModelChange() {
        var self = this;

        this.model.on('change:fields', function() {
            self.channels.views.trigger('contentFieldsChange', self.model.get('fields'));
        });
    }

    function _addMastheadListeners() {
        var self = this;

        _.defer(function() {
            $('#contentDetailViewSave').click(self.saveContent.bind(self));
            $('#contentDetailViewSaveAndClose').click(self.saveAndClose.bind(self));
        });
    }

    function remove() {
        GrasshopperBaseView.prototype.remove.apply(this, arguments);
        $('#contentDetailViewSave').off();
        $('#contentDetailViewSaveAndClose').off();
        this.model.off('change:fields');
    }

});