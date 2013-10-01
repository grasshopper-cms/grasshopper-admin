/*global define:false*/
define(['baseView', 'rivetView', 'resources', 'userWorker', 'loginWorker'], function (BaseView, rivetView, resources, userWorker, loginWorker) {

        var userDetailView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#userDetail', rivetPrefix : 'userdetail', instaUpdateRivets : true}),
            displaySuccessfulSave : displaySuccessfulSave,
            displaySaveError : displaySaveError,
            updateModel : updateModel,
            beforeRender : beforeRender
        });

        function beforeRender() {
            this.listenTo(this.model, 'change', this.updateModel);
        }

        function updateModel() {
            userWorker.updateModel(this.model, this.app.user)
                .done(function(data) {
                    displaySuccessfulSave(data);
                }).fail(function(xhr) {
                    displaySaveError(xhr);
                });
        }

        function displaySuccessfulSave(data) {
            console.log('Success!!!');

        }

        function displaySaveError(xhr) {
            this.displayAlertBox(resources.user.errors[xhr.status]);
        }

    return userDetailView;
});