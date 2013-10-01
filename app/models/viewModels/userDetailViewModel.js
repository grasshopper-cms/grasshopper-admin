define(['masseuseModel', 'userWorker', 'jquery', 'baseView', 'resources'], function (Model, userWorker, $, BaseView, resources) {
    return Model.extend({
        defaults: {
            name : null,
            role : null,
            enabled : null,
            email : null,
            id : null,
            login : null,
            password : null
        },
        initialize : function() {
            this.on('change', function(model) {
                // TODO: ComputedProperty?
                // TODO: window. ?
                var  currentUserId =  window.router.user.attributes._id;
                if (userWorker.isAdminLoggedIn() || userWorker.isThisMyProfile(model, currentUserId)) {
//                    $('.progress-bar').addClass('active');
                    userWorker.updateUserDetails(model)
                        .done(function(data) {
//                            console.log('Something Worked');
                        }).fail( function(xhr) {
                            BaseView.prototype.displayAlertBox(resources.user.errors[xhr.status]);
                        }).always( function() {
//                            $('.progress-bar').removeClass('active');
                        });
                }
            });
        }
    });

});