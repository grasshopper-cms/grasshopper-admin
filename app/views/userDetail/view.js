/*global define:false*/
define(['grasshopperBaseView', 'userDetail/options', 'resources', 'constants', 'breadcrumbWorker', 'underscore', 'mixins/handleRowCLick'],
    function (GrasshopperBaseView, options, resources, constants, breadcrumbWorker, _, handleRowCLick) {

        'use strict';

        return GrasshopperBaseView.extend(_.extend({
            defaultOptions : options,
            beforeRender : beforeRender,
            afterRender : afterRender,
            saveUser : saveUser,
            saveAndClose : saveAndClose,
            toggleEnabled : toggleEnabled,
            addNewUser : addNewUser
        }, handleRowCLick));

        function beforeRender ($deferred) {
            this.model.fetch()
                .done(_updateMastheadBreadcrumbs.bind(this, $deferred));
        }

        function afterRender() {
            _setUpEnabledChangeWarning.call(this);
        }

        function saveUser() {
            this.model.toggle('saving');
            _updateUserWorkflow.call(this, {});
        }

        function saveAndClose() {
            this.model.toggle('saving');
            _updateUserWorkflow.call(this, { close : true });
        }

        function _updateUserWorkflow(options) {
            this.model.save()
                .done(_handleSuccessfulSave.bind(this, options))
                .fail(_handleFailedSave.bind(this));
        }

        function _showSelfLockoutWarning(){
            return this.displayModal(
                {
                    header: resources.warning,
                    msg: resources.user.selfLockWarning
                });
        }

        function toggleEnabled(e) {
            e.stopPropagation();
            this.model.toggle('enabled');
            this.model.trigger('change:enabled');
            this.saveUser();
        }

        function _setUpEnabledChangeWarning() {
            var self = this;

            this.model.on('change:enabled', function() {
                if(self.model.get('userIsChangingTheirProfile') && self.model.get('enabled').toString() === 'false') {
                    _showSelfLockoutWarning.call(self)
                        .fail(function() {
                            self.model.set('enabled', self.model.previous('enabled'));
                        });
                }
            });
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
            } else {
                this.model.toggle('saving');
            }

            _updateNameInHeader.call(this, model);
        }

        function _handleFailedSave (xhr) {
            this.model.toggle('saving');

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
            this.app.router.navigateTrigger(constants.internalRoutes.addUser);
        }

    });