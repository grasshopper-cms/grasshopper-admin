/*global define:false*/
define(['baseView', 'rivetView', 'userWorker', 'constants'],

    function (BaseView, rivetView, userWorker, constants) {

    var usersIndexView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#usersIndex', rivetPrefix : 'usersindex', instaUpdateRivets : true}),
        goToPage : goToPage,
        afterRender : afterRender,
        checkAndSetLimit : checkAndSetLimit,
        changeLimit : changeLimit
    });

    var doRivetsRender = false;

    function afterRender () {

        this.rivetView();
        if ( ! doRivetsRender) {
            var oldHtml = this.$el.find('#limitDropdown').html();

            var interval = setInterval(function () {
                var newHtml = this.$el.find('#limitDropdown').html();
                if (oldHtml !== newHtml) {
                    clearInterval(interval);
                    this.$el.foundation('forms');
                    doRivetsRender = true;
                }
            }.bind(this), 1);
        } else {
            this.$el.foundation('forms');
        }


    }

    function goToPage (page, limit) {

        var pageLimit = this.checkAndSetLimit(limit);

        userWorker.getUsers(this, {
            data : {
                page : page,
                limit : pageLimit
            }
        });
    }

    function checkAndSetLimit (limit) {
        if (limit) {
            this.model.set('pageLimit', limit);
        }
        return this.model.get('pageLimit');
    }

    function changeLimit (event) {
        this.goToPage(constants.userCollection.page, event.target.value);
    }

    return usersIndexView;
});