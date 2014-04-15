/*global define:false*/
define(['grasshopperBaseView', 'contentDetailViewConfig', 'resources', 'jquery', 'api', 'breadcrumbWorker'],
    function (GrasshopperBaseView, contentDetailViewConfig, resources, $, Api, breadcrumbWorker) {
    'use strict';

    return GrasshopperBaseView.extend({
        defaultOptions : contentDetailViewConfig,
        beforeRender : beforeRender,
        afterRender : afterRender,
        deleteContent : deleteContent,
        handleRowClick : handleRowClick,
        saveContent : saveContent
    });

    function beforeRender($deferred) {
//        var self = this;

        if(this.model.get('isNew')) {
            console.log('YEAH BUDDY');
            _getContentSchema.call(this, $deferred);
        } else {
            _fetchContentDetails.call(this)
                .done(_getContentSchema.bind(this, $deferred))
                .fail(_handleFailedModelFetch.bind(this, $deferred));
        }

//        setInterval(function() {
//            console.log(self.model.attributes.fields);
//        }, 2000);
    }

    function afterRender() {
        _addListenerForModelChange.call(this);
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
        this.displayAlertBox(
            {
                header : 'Error',
                style : 'error',
                msg : resources.contentItem.errorDeleted + model.get('label')
            }
        );
    }

    function _handleSuccessfulDeletion(model) {
        this.displayTemporaryAlertBox(
            {
                header : 'Success',
                style : 'success',
                msg : resources.contentItem.successfullyDeletedPre + model.get('label') +
                    resources.contentItem.successfullyDeletedPost
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
            header : 'Success',
            style : 'success',
            msg : resources.contentItem.successfullySaved
        });
//        this.app.router.navigateTrigger(
//            constants.internalRoutes.nodeDetail.replace(':id', this.model.get('meta.node'))
//        );
    }

    function _handleFailedModelSave() {
        this.displayAlertBox(
            {
                header : 'error',
                style : 'error',
                msg : resources.contentItem.failedToSave
            }
        );
    }

    function _fetchContentDetails() {
        return this.model.fetch();
    }

    function _handleFailedModelFetch($deferred) {
        this.displayAlertBox(
            {
                header : 'Error',
                style : 'error',
                msg : resources.contentItem.failedToFetch
            }
        );
        $deferred.reject();
    }

    function _getContentSchema($deferred) {
        Api.getContentType(this.model.get('meta.type'))
            .done(_handleSuccessfulContentSchemaRetrieval.bind(this, $deferred))
            .fail(_handleFailedContentSchemaRetrieval.bind(this, $deferred));
    }

    function _handleSuccessfulContentSchemaRetrieval($deferred, schema) {
        this.model.set('schema', schema);

        if(this.name === 'contentDetailRow') {
            $deferred.resolve();
        } else {
            _updateMastheadBreadcrumbs.call(this, $deferred);
        }
    }

    function _handleFailedContentSchemaRetrieval($deferred) {
        this.displayAlertBox(
            {
                header : 'Error',
                style : 'error',
                msg : resources.contentItem.failedToFetchContentsContentType
            }
        );
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
});