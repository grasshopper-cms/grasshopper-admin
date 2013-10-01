/*global define:false*/
define(['baseView', 'rivetView', 'userWorker'], function (BaseView, rivetView, userWorker) {

    var usersIndexView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#usersIndex', rivetPrefix : 'usersindex', instaUpdateRivets : true}),
        beforeRender : beforeRender,
        goToPage : goToPage
    });

    function beforeRender () {
        userWorker.getUsers(this);

    }

    function goToPage (event) {
       var page = $(event.target).text();
       userWorker.getUsers(this, {
           data : {
               skip : (page -1) * 5
           }

       });
    }
    return usersIndexView;
});