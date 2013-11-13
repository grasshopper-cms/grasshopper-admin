/*global define:false*/
define(['baseView', 'resources', 'userWorker', 'constants', 'LocalStorage'], function (BaseView, resources, userWorker, constants, LocalStorage) {

    var userDetailView = BaseView.extend({
        beforeRender : beforeRender,
//        displaySuccessfulSave : displaySuccessfulSave,
//        displaySaveError : displaySaveError,
        updateModel : updateModel,
        updateNameInHeader : updateNameInHeader
    });

    function beforeRender () {
        var self = this;
        // TODO: make this a computed property.
        if (this.model.get('id') === this.app.user.get('_id')) {
            this.model.url = constants.api.user.url;
        }

        // TODO: Move this Authorization into somewhere more General. Override the Backbone Sync to always include it.
        this.model.fetch({ headers: {authorization: 'Token ' + LocalStorage.get('authToken')} })
            .done(function() {
                self.$el.foundation('forms');
            });
    }

    function updateModel () {
        var self = this;
        this.model.save()
            .done(function (model) {
//                displaySuccessfulSave();
                updateNameInHeader.call(self, model);
            }).fail(function (odel, xhr) {
                displaySaveError.call(self, xhr);
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
    function displaySaveError (xhr) {
        var message = '';
        if (xhr.status === 500) {
            message = $.parseJSON(xhr.responseText).message;
        } else {
            message = resources.user.errors[xhr.status];
        }
        this.displayAlertBox(message);
    }

    return userDetailView;
});