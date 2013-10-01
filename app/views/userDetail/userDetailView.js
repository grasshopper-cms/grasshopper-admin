/*global define:false*/
define(['baseView', 'rivetView', 'resources'], function (BaseView, rivetView, resources) {

        var userDetailView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#userDetail', rivetPrefix : 'userdetail', instaUpdateRivets : true}),
            displaySuccessfulSave : displaySuccessfulSave,
            displaySaveError : displaySaveError
        });

        function displaySuccessfulSave(data) {
            console.log('Success!!!');
        }

        function displaySaveError(xhr) {
            BaseView.prototype.displayAlertBox(resources.user.errors[xhr.status]);
        }

        return userDetailView;
    });