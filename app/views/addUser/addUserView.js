/*global define:false*/
define(['grasshopperBaseView', 'resources'], function (GrasshopperBaseView, resources) {
    'use strict';
    return GrasshopperBaseView.extend({
        saveUser : saveUser
    });


    function saveUser() {
        var self = this;

        this.model.save()
            .success(function() {
                _handleSuccessfulSave.call(self);
            })
            .error(function(xhr) {
                _handleSaveError.call(self, xhr);
            });

        return false;
    }

    function _handleSuccessfulSave() {
        this.app.router.navigateTrigger('users');
        this.displayTemporaryAlertBox(
            {
                msg: resources.user.newUserAdded,
                status: true
            }
        );
    }

    function _handleSaveError(xhr) {
        this.displayAlertBox(
            {
                msg: xhr.responseJSON.message
            }
        );
    }

});