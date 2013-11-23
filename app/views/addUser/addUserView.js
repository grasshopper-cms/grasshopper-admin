/*global define:false*/
define(['baseView', 'resources'], function (BaseView, resources) {

    var addUserView = BaseView.extend({
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
                self.displayTemporaryAlertBox(resources.user.newUserAdded, true);
            })
            .error(function(xhr) {
                self.displayAlertBox(JSON.parse(xhr.responseText).message);
            });

        return false;
    }

    return addUserView;
});