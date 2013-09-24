/*global define:false*/
define(['baseView', 'rivetView'], function (BaseView, rivetView) {

        var userDetailView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#userDetail', rivetPrefix : 'userDetail', instaUpdateRivets : true}),
            displayProfile : displayProfile
        });

        function displayProfile() {
            console.log('ShowMyProfile was called');
        }

        return userDetailView;
    });