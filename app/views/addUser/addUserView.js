/*global define:false*/
define(['grasshopperBaseView', 'resources'], function (GrasshopperBaseView, resources) {

    return GrasshopperBaseView.extend({
        applyFoundationForms : applyFoundationForms,
        saveUser : saveUser
    });

    function applyFoundationForms() {
        this.$el.foundation('forms');
    }

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
                        msg: JSON.parse(xhr.responseText).message
                    }
                );
            });

        return false;
    }

});