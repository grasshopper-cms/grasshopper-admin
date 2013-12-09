/*global define:false*/
define(['grasshopperBaseView', 'resources'], function (GrasshopperBaseView, resources) {

    return GrasshopperBaseView.extend({
        saveUser : saveUser
    });


    function saveUser() {
        var self = this;

        console.log(this.model);
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