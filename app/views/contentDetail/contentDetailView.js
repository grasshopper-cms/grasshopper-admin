/*global define:false*/
define(['grasshopperBaseView', 'contentDetailViewConfig', 'resources', 'jquery', 'api', 'breadcrumbWorker', 'constants', 'mixins/handleRowClick', 'underscore'],
    function (GrasshopperBaseView, contentDetailViewConfig, resources, $, Api, breadcrumbWorker, constants, handleRowClick, _) {
        'use strict';

        return GrasshopperBaseView.extend(_.extend({
            defaultOptions: contentDetailViewConfig,
            beforeRender: beforeRender,
            afterRender: afterRender,
            deleteContent: deleteContent,
            saveContent: saveContent,
            saveAndClose: saveAndClose
        }, handleRowClick));

        function beforeRender ($deferred) {
            if (this.model.get('isNew')) {
                _getContentSchema.call(this, $deferred);
            } else {
                _resetViewOrFetchContentDetails.call(this, $deferred);
            }
        }

        function _resetViewOrFetchContentDetails ($deferred) {
            if (this.name === 'contentDetailRow') {
                _resetLabel.call(this, $deferred);
            } else {
                _callFetchContentDetails.call(this,$deferred);
            }
        }

        function _callFetchContentDetails($deferred) {
            _fetchContentDetails.call(this)
                .done(_getContentSchema.bind(this, $deferred))
                .fail(_handleFailedModelFetch.bind(this, $deferred));
        }

        function _resetLabel($deferred) {
            this.model.resetContentLabel.call(this.model);
            $deferred.resolve();
        }

        function afterRender () {
            this.$el.foundation();
            _addListenerForModelChange.call(this);
        }

        function deleteContent (e) {
            e.stopPropagation();
            _confirmDeletion.call(this)
                .then(_destroyThisModel.bind(this));
        }

        function _confirmDeletion () {
            return this.displayModal(
                {
                    header: resources.warning,
                    msg: resources.contentItem.deletionWarning
                });
        }

        function _destroyThisModel () {
            this.model.destroy(
                {
                    success: _handleSuccessfulDeletion.bind(this),
                    error: _handleFailedDeletion.bind(this)
                });
        }

        function _handleFailedDeletion (model) {
            this.fireErrorModal(resources.contentItem.errorDeleted + model.get('label'));
        }

        function _handleSuccessfulDeletion (model) {
            this.displayTemporaryAlertBox(
                {
                    header: resources.success,
                    style: 'success',
                    msg: resources.contentItem.successfullyDeletedPre + model.get('label') +
                        resources.contentItem.successfullyDeletedPost
                }
            );
        }

        function saveContent (e) {
            _toggleModelSavingAndSwapSpinner.call(this, e);
            _saveContentWorkflow.call(this, {});
        }

        function saveAndClose(e) {
            _swapSavingTextWithSpinner.call(this, e);
            this.model.toggle('saving');
            _saveContentWorkflow.call(this, { close : true });

        }

        function _saveContentWorkflow (options) {
            this.model.save({ smartParse: true })
                .done(_handleSuccessfulModelSave.bind(this, options))
                .fail(_handleFailedModelSave.bind(this));
        }

        function _handleSuccessfulModelSave (options) {
            this.displayTemporaryAlertBox(
                {
                    header: resources.success,
                    style: 'success',
                    msg: resources.contentItem.successfullySaved
                }
            );

            _setModelIsNewToFalse.call(this);

            if (options.close) {
                this.app.router.navigateTrigger(
                    constants.internalRoutes.nodeDetail.replace(':id', this.model.get('meta.node')));
            } else {
                _toggleModelSavingAndSwapSpinner.call(this);

                this.app.router.navigateNinja(
                    constants.internalRoutes.contentDetail.replace(':id', this.model.get('_id')));

                breadcrumbWorker.resetBreadcrumb.call(this);
                this.model.resetContentLabel();
                _updateMastheadBreadcrumbs.call(this);
            }
        }

        function _setModelIsNewToFalse() {
            if (this.model.get('isNew')) {
                this.model.set('isNew', false);
            }
        }

        function _handleFailedModelSave (response) {
            _toggleModelSavingAndSwapSpinner.call(this);
            this.fireErrorModal(_getFailedModelSaveMessage(response));
        }

        function _toggleModelSavingAndSwapSpinner (e) {
            this.model.toggle('saving');
            e ? _swapSavingTextWithSpinner.call(this, e) : _swapSavingTextWithSpinner.call(this);
        }

        function _getFailedModelSaveMessage (response) {
            return response.responseJSON.message ? response.responseJSON.message : resources.contentItem.failedToSave;
        }

        function _fetchContentDetails () {
            return this.model.fetch();
        }

        function _handleFailedModelFetch ($deferred) {
            this.fireErrorModal(resources.contentItem.failedToFetch);
            $deferred.reject();
        }

        function _getContentSchema ($deferred) {
            Api.getContentType(this.model.get('meta.type'))
                .done(_handleSuccessfulContentSchemaRetrieval.bind(this, $deferred))
                .fail(_handleFailedContentSchemaRetrieval.bind(this, $deferred));
        }

        function _handleSuccessfulContentSchemaRetrieval ($deferred, schema) {
            this.model.set('schema', schema);
            this.model.resetContentLabel();

            _updateMastheadBreadcrumbs.call(this, $deferred);
        }

        function _handleFailedContentSchemaRetrieval ($deferred) {
            this.fireErrorModal(resources.contentItem.failedToFetchContentsContentType);
            $deferred.reject();
        }

        function _updateMastheadBreadcrumbs ($deferred) {
            breadcrumbWorker.contentBreadcrumb.call(this, $deferred);
        }

        function _addListenerForModelChange () {
            var self = this;

            this.model.on('change:fields', function () {
                self.channels.views.trigger('contentFieldsChange', self.model.get('fields'));
            });
        }

        function _swapSavingTextWithSpinner (e) {
            var currentWidth,
                $currentTarget;

            if (e) {
                $currentTarget = $(e.currentTarget);

                _setSwapElementAndText.call(this, $currentTarget);

                currentWidth = $currentTarget.width();
                $currentTarget.empty().width(currentWidth).append('<i class="fa fa-refresh fa fa-spin"></i>');
            } else {
                $(this.model.get('swapElement')).empty().text(this.model.get('swapText'));
            }
        }

        function _setSwapElementAndText ($currentTarget) {
            this.model.set('swapElement', $currentTarget);
            this.model.set('swapText', $currentTarget.text());
        }
    });