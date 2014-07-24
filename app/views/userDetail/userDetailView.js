/*global define:false*/
define(['grasshopperBaseView', 'userDetailViewConfig', 'resources', 'constants', 'breadcrumbWorker', 'jquery'],
    function (GrasshopperBaseView, userDetailViewConfig, resources, constants, breadcrumbWorker, $) {

        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : userDetailViewConfig,
            beforeRender : beforeRender,
            saveUser : saveUser,
            saveAndClose : saveAndClose,
            toggleEnabled : toggleEnabled,
            handleRowClick : handleRowClick,
            addNewUser : addNewUser,
            showSelfLockoutWarning: showSelfLockoutWarning
        });

        function beforeRender ($deferred) {
            this.model.fetch()
                .done(_updateMastheadBreadcrumbs.bind(this, $deferred));
        }

        function saveUser(e) {
            var self=this,lockoutFunction = function () {
                _swapSavingTextWithSpinner.call(self, e);
                self.model.toggle('saving');
                _updateUserWorkflow.call(self, {});
            };
            if (e){
                e.stopPropagation();
            }
            if (this.model.id == this.app.user.id && this.model.get('enabled').toString() === 'false' && this.model.changed.enabled !== undefined) {
                this.showSelfLockoutWarning(lockoutFunction);
            } else {
                lockoutFunction();
            }
        }

        function saveAndClose() {
            var self=this, lockoutFunction = function () {
                _updateUserWorkflow.call(self, { close: true });
            };
            if (this.model.id == this.app.user.id && this.model.get('enabled').toString() === 'false' && this.model.changed.enabled !== undefined) {
                this.showSelfLockoutWarning(lockoutFunction);
            } else {
                lockoutFunction();
            }
        }

        function _updateUserWorkflow(options) {
            this.model.save()
                .done(_handleSuccessfulSave.bind(this, options))
                .fail(_handleFailedSave.bind(this));
        }

        function showSelfLockoutWarning(completionFunction){
            this.displayModal(
                {
                    header: resources.warning,
                    msg: resources.user.selfLockWarning
                }).done(completionFunction.bind(this));
        }

        function toggleEnabled(e) {
            e.stopPropagation();
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
            } else {
                this.model.toggle('saving');

                _swapSavingTextWithSpinner.call(this);
            }

            _updateNameInHeader.call(this, model);
        }

        function _handleFailedSave (xhr) {
            this.model.toggle('saving');

            _swapSavingTextWithSpinner.call(this);
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

        function _swapSavingTextWithSpinner(e) {
            var currentWidth,
                $currentTarget;

            if(e) {
                $currentTarget = $(e.currentTarget);

                this.model.set('swapElement', $currentTarget);
                this.model.set('swapText', $currentTarget.text());
                currentWidth = $currentTarget.width();
                $currentTarget.empty().width(currentWidth).append('<i class="fa fa-refresh fa fa-spin"></i>');
            } else {
                $(this.model.get('swapElement')).empty().text(this.model.get('swapText'));
            }
        }

    });