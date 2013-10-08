/*global define:false*/
define(['baseView', 'userWorker', 'constants'],

    function (BaseView, userWorker, constants) {

        var usersIndexView = BaseView.extend({
            goToPage : goToPage,
            renderPlugins : renderPlugins,
            checkAndSetLimit : checkAndSetLimit,
            changeLimit : changeLimit
        });

        //TODO: Turn this into a mixin
        function renderPlugins () {
            this.$el.foundation('forms');
        }

        function goToPage (page, limit) {

            var pageLimit = this.checkAndSetLimit(limit),
                deferred = new $.Deferred();

            return userWorker.getUsers(this, {
                data : {
                    page : page,
                    limit : pageLimit
                }
            }, deferred);
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