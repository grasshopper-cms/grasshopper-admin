/*global define:false*/
define(['baseView'], function (BaseView) {

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
                self.displayAlertBox('New User Added', true);
            })
            .error(function(xhr) {
                self.displayAlertBox(JSON.parse(xhr.responseText).message);
            });

        return false;
    }

    return addUserView;
});