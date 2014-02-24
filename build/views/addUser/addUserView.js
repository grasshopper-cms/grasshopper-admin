/*global define:false*/
define(['grasshopperBaseView', 'resources', 'addUserViewConfig', 'breadcrumbWorker'],
    function (GrasshopperBaseView, resources, addUserViewConfig, breadcrumbWorker) {
    'use strict';
    return GrasshopperBaseView.extend({
        defaultOptions : addUserViewConfig,
        beforeRender : beforeRender,
        saveUser : saveUser
    });

    function beforeRender($deferred) {
        _updateMastheadBreadcrumbs.call(this, $deferred);
    }

    function saveUser () {
        this.model.save()
            .success(_handleSuccessfulSave.bind(this))
            .error(_handleSaveError.bind(this));

        return false;
    }

    function _handleSuccessfulSave () {
        this.app.router.navigateTrigger('users');
        this.displayTemporaryAlertBox(
            {
                msg : resources.user.newUserAdded,
                status : true
            }
        );
    }

    function _handleSaveError (xhr) {
        this.displayAlertBox(
            {
                msg : xhr.responseJSON.message
            }
        );
    }

    function _updateMastheadBreadcrumbs($deferred) {
        breadcrumbWorker.userBreadcrumb.call(this, $deferred, true);
    }

});