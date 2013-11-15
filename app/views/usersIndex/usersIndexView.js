/*global define:false*/
define(['baseView', 'userWorker', 'constants', 'underscore', 'text!views/userDetail/_userDetailRow.html', 'userDetailView', 'userDetailViewConfig'],

    function (BaseView, userWorker, constants, _, userRowTemplate, UserDetailView, userDetailViewConfig) {

        var usersIndexView = BaseView.extend({
            beforeRender : beforeRender,
            goToPage : goToPage,
            checkAndSetLimit : checkAndSetLimit,
            changeLimit : changeLimit,
            appendUserRow : appendUserRow
        });

        function beforeRender() {
            var self = this,
                model = this.model.toJSON();

            this.goToPage(model.pageNumber || model.defaultPage, model.pageLimit || model.defaultLimit)
                .done(function() {
                    self.model.get('users').each(function(model){
                        self.appendUserRow(model);
                    });
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

        function appendUserRow(model) {
            var userDetailView = new UserDetailView(_.extend({}, userDetailViewConfig,
                {
                    name : 'userDetailRow',
                    el : '#usersIndexTable',
                    templateHtml : userRowTemplate,
                    model : model
//                    modelData : model.toJSON()
                }
            ));
            userDetailView.start();
        }

        return usersIndexView;
    });