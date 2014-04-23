/*global define:false*/
define(['grasshopperBaseView', 'userDetailViewConfig', 'resources', 'constants', 'breadcrumbWorker',
        'jquery', 'underscore'],
    function (GrasshopperBaseView, userDetailViewConfig, resources, constants, breadcrumbWorker,
              $, _) {

        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : userDetailViewConfig,
            beforeRender : beforeRender,
            afterRender : afterRender,
            saveUser : saveUser,
            saveAndClose : saveAndClose,
            toggleEnabled : toggleEnabled,
            handleRowClick : handleRowClick,
            remove : remove
        });

        function beforeRender ($deferred) {
            this.model.fetch()
                .done(_updateMastheadBreadcrumbs.bind(this, $deferred));
        }

        function afterRender () {
            _addMastheadListeners.call(this);
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
            this.updateModel();
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

        function _addMastheadListeners() {
            var self = this;

            _.defer(function() {
                $('#userDetailViewSave').click(self.saveUser.bind(self));
                $('#userDetailViewSaveAndClose').click(self.saveAndClose.bind(self));
            });
        }

        function remove() {
            GrasshopperBaseView.prototype.remove.apply(this, arguments);
            $('#userDetailViewSave').off();
            $('#userDetailViewSaveAndClose').off();
        }

    });