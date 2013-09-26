/*global define:false*/
define(['baseView', 'rivetView'], function (BaseView, rivetView) {

        var userDetailView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#userDetail', rivetPrefix : 'userdetail', instaUpdateRivets : true})
        });

        return userDetailView;
    });