/*global define:false*/
define(['baseView', 'rivetView'], function (BaseView, rivetView) {

    var usersIndexView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#usersIndex', rivetPrefix : 'usersindex', instaUpdateRivets : true})
    });

    return usersIndexView;
});