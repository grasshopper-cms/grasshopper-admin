/*global define:false*/
define(['baseView', 'rivetView', 'userWorker'], function (BaseView, rivetView, userWorker) {

    var usersIndexView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#usersIndex', rivetPrefix : 'usersindex', instaUpdateRivets : true}),
        goToPage : goToPage
    });

    function goToPage (page) {

       userWorker.getUsers(this, {
           data : {
               page : page
           }
       });
    }

    return usersIndexView;
});