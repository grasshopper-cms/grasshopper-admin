/*global define:false*/
define(['grasshopperBaseView', 'contentDetailViewConfig', 'resources', 'jquery', 'api', 'breadcrumbWorker',
    'underscore', 'masseuse'],
    function (GrasshopperBaseView, contentDetailViewConfig, resources, $, Api, breadcrumbWorker,
              _, masseuse) {
    'use strict';

    var ProxyProperty = masseuse.ProxyProperty;

    return GrasshopperBaseView.extend({
        defaultOptions : contentDetailViewConfig,
        beforeRender : beforeRender,
        deleteContent : deleteContent,
        handleRowClick : handleRowClick,
        saveContent : saveContent
    });

    function beforeRender($deferred) {
        if(!this.model.has('label')) {
            _fetchContentDetails.call(this, $deferred);
        } else {
            $deferred.resolve();
        }
    }

    function deleteContent () {
        _confirmDeletion.call(this)
            .then(_destroyThisModel.bind(this));
    }

    function _confirmDeletion() {
        return this.displayModal(
            {
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
        this.displayAlertBox(
            {
                msg : resources.contentItem.errorDeleted + model.get('label')
            }
        );
    }

    function _handleSuccessfulDeletion(model) {
        this.displayTemporaryAlertBox(
            {
                msg : resources.contentItem.successfullyDeletedPre + model.get('label') +
                    resources.contentItem.successfullyDeletedPost,
                status : true
            }
        );
        this.remove();
    }

    function handleRowClick () {
        this.app.router.navigateTrigger(this.model.get('href'));
        return false;
    }

    function saveContent() {
        this.model.save()
            .done(_handleSuccessfulModelSave.bind(this))
            .fail(_handleFailedModelSave.bind(this));
    }

    function _handleSuccessfulModelSave() {
        this.displayTemporaryAlertBox({
            msg : resources.contentItem.successfullySaved,
            status : true
        });
    }

    function _handleFailedModelSave() {
        this.displayAlertBox({
            msg : resources.contentItem.failedToSave
        });
    }

    function _fetchContentDetails($deferred) {
        this.model.fetch()
            .done(_getContentSchema.bind(this, $deferred))
            .fail(_handleFailedModelFetch.bind(this, $deferred));
    }

    function _handleFailedModelFetch($deferred) {
        this.displayAlertBox({
            msg : resources.contentItem.failedToFetch
        });
        $deferred.reject();
    }

    function _getContentSchema($deferred) {
        Api.getContentType(this.model.get('type'))
            .done(_handleSuccessfulContentSchemaRetrieval.bind(this, $deferred))
            .fail(_handleFailedContentSchemaRetrieval.bind(this, $deferred));
    }

    function _handleSuccessfulContentSchemaRetrieval($deferred, schema) {
        this.model.set('schema', schema);
        _proxyFirstFieldToLabel.call(this);
        _updateMastheadBreadcrumbs.call(this, $deferred);
    }

    function _handleFailedContentSchemaRetrieval($deferred) {
        this.displayAlertBox({
            msg : resources.contentItem.failedToFetchContentsContentType
        });
        $deferred.reject();
    }

    function _proxyFirstFieldToLabel() {
        var firstField = _.first(this.model.get('schema.fields'))._id;

        this.model.set('label', new ProxyProperty('fields.' + firstField, this.model));
    }

    function _updateMastheadBreadcrumbs($deferred) {
        breadcrumbWorker.contentBreadcrumb.call(this, $deferred);
    }
});