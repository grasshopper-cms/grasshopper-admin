/*global define:false*/
define(['baseView', 'resources', 'userWorker', 'constants'], function (BaseView, resources, userWorker, constants) {

    var userDetailView = BaseView.extend({
        beforeRender : beforeRender,
//        displaySuccessfulSave : displaySuccessfulSave,
//        displaySaveError : displaySaveError,
        updateModel : updateModel,
        updateNameInHeader : updateNameInHeader,
        toggleEnabled : toggleEnabled
    });

    function beforeRender () {
        var self = this;

        // TODO: make this a computed property. It is checking to see if the current model's ID is the same as Logged in user, the API endpoints are different for Admin editing their own (/user) and admin editing someone else (/users/id)
        if (this.model.get('id') === this.app.user.get('_id')) {
            this.model.url = constants.api.user.url;
        } else {
            this.model.urlRoot = constants.api.users.url;
        }

        // TODO: Here I am checking to see if the model that is passed to it already has an _id (the id coming from Backbone) if it does, then it does not need to fetch because it already exists.
        if (!this.model.has('_id')) {
            this.model.fetch()
                .done(function() {
                    self.$el.foundation('forms');
                });
        }
    }

    function updateModel () {
        var self = this;
        this.model.save()
            .done(function (model) {
//                displaySuccessfulSave();
                updateNameInHeader.call(self, model);
            }).fail(function (odel, xhr) {
//                displaySaveError.call(self, xhr);
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
        var enabled = this.model.get('enabled');
        this.model.set('enabled', (enabled) ? false : true);
        this.updateModel();
    }

//
//    function displaySuccessfulSave () {
//        var progressBar = $('.progress-bar');
//
//        progressBar.addClass('active');
//        progressBar.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
//            progressBar.addClass('disappear');
//            progressBar.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
//                progressBar.removeClass('active').removeClass('disappear');
//            });
//        });
//    }
//
//    function displaySaveError (xhr) {
//        var message = '';
//        if (xhr.status === 500) {
//            message = $.parseJSON(xhr.responseText).message;
//        } else {
//            message = resources.user.errors[xhr.status];
//        }
//        this.displayAlertBox(message);
//    }

    return userDetailView;
});