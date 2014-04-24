/*global define:false*/
define(['grasshopperBaseView', 'userDetailViewConfig', 'resources', 'constants', 'breadcrumbWorker'],
    function (GrasshopperBaseView, userDetailViewConfig, resources, constants, breadcrumbWorker) {

        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : userDetailViewConfig,
            beforeRender : beforeRender,
            saveUser : saveUser,
            saveAndClose : saveAndClose,
            toggleEnabled : toggleEnabled,
            handleRowClick : handleRowClick,
            addNewUser : addNewUser
        });

        function beforeRender ($deferred) {
            this.model.fetch()
                .done(_updateMastheadBreadcrumbs.bind(this, $deferred));
        }

        function saveUser () {
            _updateUserWorkflow.call(this, {});
        }

        function saveAndClose() {
            _updateUserWorkflow.call(this, { close : true });
        }

        function _updateUserWorkflow(options) {
            this.model.save()
                .done(_handleSuccessfulSave.bind(this, options))
                .fail(_handleFailedSave.bind(this));
        }

        function toggleEnabled () {
            this.model.toggle('enabled');
            this.model.trigger('change:enabled');
            this.saveUser();
        }

        function handleRowClick (e) {
            e.stopPropagation();
            this.app.router.navigateTrigger(this.model.get('href'), {}, true);
        }

        function _handleSuccessfulSave (options, model) {
            this.displayTemporaryAlertBox(
                {
                    header : resources.success,
                    style : 'success',
                    msg : resources.user.successfullyUpdated
                }
            );

            if(options.close) {
                this.app.router.navigateTrigger(constants.internalRoutes.users);
            }

            _updateNameInHeader.call(this, model);
        }

        function _handleFailedSave (xhr) {
            this.fireErrorModal(xhr.responseJSON.message);
        }

        function _updateNameInHeader (model) {
            if (this.app.user.get('_id') === model._id) {
                this.app.user.set(model);
            }
        }

        function _updateMastheadBreadcrumbs($deferred) {
            breadcrumbWorker.userBreadcrumb.call(this, $deferred);
        }

        function addNewUser() {
            this.app.router.displayAddUser();
        }

    });