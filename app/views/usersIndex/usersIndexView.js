/*global define:false*/
define(['baseView', 'rivetView', 'userWorker'], function (BaseView, rivetView, userWorker) {

    var usersIndexView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#usersIndex', rivetPrefix : 'usersindex', instaUpdateRivets : true}),
        goToPage : goToPage,
        afterRender : afterRender
    });

    function afterRender() {
        // TODO: Should only affect newly rendered view - or should be done once up front
        // $this.$el.foundation('forms');?
        $(document).foundation('forms');
    }

    function goToPage (page) {

       userWorker.getUsers(this, {
           data : {
               page : page
           }
       });
    }

    return usersIndexView;
});