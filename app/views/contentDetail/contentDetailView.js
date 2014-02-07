/*global define:false*/
define(['grasshopperBaseView', 'contentDetailViewConfig', 'resources', 'jquery', 'api', 'breadcrumbWorker'],
    function (GrasshopperBaseView, contentDetailViewConfig, resources, $, Api, breadcrumbWorker) {
    'use strict';
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
        console.log(this);
    }

    function _fetchContentDetails($deferred) {
        var self = this;
        this.model.fetch()
            .done(_getContentSchema.bind(self, $deferred))
            .fail(function() {
                self.displayAlertBox({
                    msg : 'Could not retrieve content.'
                });
                $deferred.reject();
            });
    }

    function _getContentSchema($deferred) {
        var self = this;
        Api.getContentType(this.model.get('type'))
            .done(function(schema) {
                self.model.set('schema', schema);
                _updateMastheadBreadcrumbs.call(self, $deferred);
            })
            .fail(function() {
                self.displayAlertBox({
                    msg : 'Could not retrieve content type for this content.'
                });
                $deferred.reject();
            });
    }

    function _updateMastheadBreadcrumbs($deferred) {
        breadcrumbWorker.contentBreadcrumb.call(this, $deferred);
    }
});


