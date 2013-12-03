/*global define:false*/
define(['baseView', 'resources', 'userWorker', 'constants'], function (BaseView, resources, userWorker, constants) {

    var userDetailView = BaseView.extend({
        beforeRender : beforeRender,
        updateModel : updateModel,
        updateNameInHeader : updateNameInHeader,
        toggleEnabled : toggleEnabled,
        handleRowClick : handleRowClick
    });

    function beforeRender () {
        var self = this;

        // It is checking to see if the current model's ID is the same as Logged in user, the API endpoints are different for Admin editing their own (/user) and admin editing someone else (/users/id)
        if (this.model.get('id') === this.app.user.get('_id')) {
            this.model.url = constants.api.user.url;
        } else {
            this.model.urlRoot = constants.api.users.url;
        }

        if (!this.model.has('_id')) {
            this.model.fetch()
                .done(function() {
                    self.$el.foundation('forms');
                });
        }

        console.log(this);
    }

    function updateModel () {
        var self = this;
        this.model.save()
            .done(function (model) {
                self.displayTemporaryAlertBox(resources.user.successfullyUpdated, true);
                updateNameInHeader.call(self, model);
            }).fail(function () {
                self.displayAlertBox(resources.user.updateError);
            });

        return false;
    }

    function updateNameInHeader(model) {
        if (this.app.user.get('_id') === model._id) {
            this.app.user.set(
                {
                    firstName : model.firstname,
                    lastName : model.lastname
                });
        }
    }

    function toggleEnabled() {
        console.log('this was called');
        var enabled = this.model.get('enabled');
        this.model.set('enabled', (enabled) ? false : true);
        this.updateModel();
    }

    function handleRowClick(e) {
        e.stopPropagation();
        this.app.router.navigateTrigger(this.model.get('href'), {}, true);
    }

    return userDetailView;
});