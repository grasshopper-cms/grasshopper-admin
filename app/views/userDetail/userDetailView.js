/*global define:false*/
define(['baseView', 'rivetView'], function (BaseView, rivetView) {

        var userDetailView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#userDetail', rivetPrefix : 'userDetail', instaUpdateRivets : true}),
        });

        return userDetailView;
    });