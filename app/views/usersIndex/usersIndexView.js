/*global define:false*/
define(['baseView', 'userWorker', 'constants'],

    function (BaseView, userWorker, constants) {

        var usersIndexView = BaseView.extend({
            beforeRender : beforeRender,
            goToPage : goToPage,
            checkAndSetLimit : checkAndSetLimit,
            changeLimit : changeLimit
        });

        function beforeRender() {
            var self = this,
                model = this.model.toJSON();

            this.goToPage(model.pageNumber || model.defaultPage, model.pageLimit || model.defaultLimit)
                .done(function() {
                    self.$el.foundation('forms');
                });
        }

        function goToPage (page, limit) {
            var pageLimit = this.checkAndSetLimit(limit),
                $deferred = new $.Deferred();

            return userWorker.getUsers(this, {
                data : {
                    page : page,
                    limit : pageLimit
                }
            }, $deferred);
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