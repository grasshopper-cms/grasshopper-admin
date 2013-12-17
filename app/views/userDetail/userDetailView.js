/*global define:false*/
define(['grasshopperBaseView', 'resources', 'userWorker', 'constants'],
    function (GrasshopperBaseView, resources, userWorker, constants) {

    return GrasshopperBaseView.extend({
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

                });
        }
    }

    function updateModel () {
        var self = this;
        this.model.save()
            .done(function (model) {
                self.displayTemporaryAlertBox(
                    {
                        msg: resources.user.successfullyUpdated,
                        status: true
                    }
                );
                updateNameInHeader.call(self, model);
            }).fail(function () {
                self.displayAlertBox(
                    {
                        msg: resources.user.updateError
                    }
                );
            });

        return false;
    }

    function updateNameInHeader(model) {
        if (this.app.user.get('_id') === model._id) {
            this.app.user.set(model);
        }
    }

    function toggleEnabled() {
        var enabled = this.model.get('enabled');
        this.model.set('enabled', (enabled) ? false : true);
        this.updateModel();
    }

    function handleRowClick(e) {
        e.stopPropagation();
        this.app.router.navigateTrigger(this.model.get('href'), {}, true);
    }

});