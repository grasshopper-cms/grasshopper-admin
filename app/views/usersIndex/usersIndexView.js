/*global define:false*/
define(['baseView', 'rivetView', 'userWorker'], function (BaseView, rivetView, userWorker) {

    var usersIndexView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#usersIndex', rivetPrefix : 'usersindex', instaUpdateRivets : true}),
        beforeRender : beforeRender
    });

    function beforeRender () {
       userWorker.getUsers(this);
    }

    return usersIndexView;
});