/*global define:false*/
define(['grasshopperBaseView', 'addUserViewConfig', 'resources'],
    function (GrasshopperBaseView, resources, addUserViewConfig) {
    'use strict';
    return GrasshopperBaseView.extend({
        defaultOptions : addUserViewConfig,
        saveUser : saveUser
    });


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

});