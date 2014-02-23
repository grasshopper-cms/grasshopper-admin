/*global define:false*/
define(['grasshopperBaseView', 'userDetailViewConfig', 'resources', 'constants', 'breadcrumbWorker'],
    function (GrasshopperBaseView, userDetailViewConfig, resources, constants, breadcrumbWorker) {
        'use strict';
        return GrasshopperBaseView.extend({
            defaultOptions : userDetailViewConfig,
            beforeRender : beforeRender,
            updateModel : updateModel,
            toggleEnabled : toggleEnabled,
            handleRowClick : handleRowClick
        });

        function beforeRender ($deferred) {

            if(!this.model.get('displayAsRow')) {
                this.model.fetch()
                    .done(_updateMastheadBreadcrumbs.bind(this, $deferred));
            } else {
                $deferred.resolve();
            }

        }

        function updateModel () {
            this.model.save()
                .done(_handleSuccessfulSave.bind(this))
                .fail(_handleFailedSave.bind(this));

            return false;
        }

        function toggleEnabled () {
            this.model.toggle('enabled');
            this.model.trigger('change:enabled');
            this.updateModel();
        }

        function handleRowClick (e) {
            e.stopPropagation();
            this.app.router.navigateTrigger(this.model.get('href'), {}, true);
        }

        function _handleSuccessfulSave (model) {
            this.displayTemporaryAlertBox(
                {
                    msg : resources.user.successfullyUpdated,
                    status : true
                }
            );
            _updateNameInHeader.call(this, model);
        }

        function _handleFailedSave (xhr) {
            this.displayAlertBox(
                {
                    msg : xhr.responseJSON.message
                }
            );
        }

        function _updateNameInHeader (model) {
            if (this.app.user.get('_id') === model._id) {
                this.app.user.set(model);
            }
        }

        function _updateMastheadBreadcrumbs($deferred) {
            breadcrumbWorker.userBreadcrumb.call(this, $deferred);
        }

    });