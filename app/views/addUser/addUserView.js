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
                self.app.router.navigateTrigger('users');
                self.displayTemporaryAlertBox(
                    {
                        msg: resources.user.newUserAdded,
                        status: true
                    }
                );
            })
            .error(function(xhr) {
                self.displayAlertBox(
                    {
                        msg: xhr.responseJSON.message
                    }
                );
            });

        return false;
    }

});