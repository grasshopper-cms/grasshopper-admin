/*global define:false*/
define(['baseView', 'rivetView', 'resources', 'userWorker'], function (BaseView, rivetView, resources, userWorker) {

        var userDetailView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#userDetail', rivetPrefix : 'userdetail', instaUpdateRivets : false}),
            beforeRender : beforeRender,
            afterRender : afterRender,
            displaySuccessfulSave : displaySuccessfulSave,
            displaySaveError : displaySaveError,
            updateModel : updateModel,
            updateNameInHeader : updateNameInHeader
        });

        function beforeRender() {
            this.model.set('isAdmin', this.app.user.get('isAdmin'));
            this.model.attributesToIgnore = ['isAdmin', 'resources', 'id', 'roles', 'possibleStatus', 'statusOptions'];
            console.log(this.model.statusOptions);
        }
//
        var doRivetsRender = false;
////        TODO: Turn this into a mixin
        function afterRender () {
////            debugger;
//
            this.rivetView();
            setTimeout(function()  {
                this.$el.foundation('forms');
            }.bind(this), 50);
//            if (!doRivetsRender) {
//                var $limitDropdown = this.$el.find('#statusText'),
//                    oldHtml = $limitDropdown.html();
//
//                var interval = setInterval(function () {
//                    var newHtml = $limitDropdown.html();
//                    if (oldHtml !== newHtml) {
//                        clearInterval(interval);
//                        this.$el.foundation('forms');
//                        doRivetsRender = true;
//                    }
//                }.bind(this), 1);
//            } else {
//                this.$el.foundation('forms');
//            }
        }

        function updateModel(model) {
            var self = this;

            this.model.attributes = _.omit(this.model.attributes, this.model.attributesToIgnore);
            this.model.save()
                .done(function(model, response, options) {
                    displaySuccessfulSave();
                    updateNameInHeader.call(self, self.model);
                }).fail(function(odel, xhr, options) {
                    displaySaveError.call(self, xhr);
                });

            return false;
        }

        function updateNameInHeader(model) {
            if(userWorker.isThisMyProfile(model, this.app.user.get('_id'))) {
                this.app.user.set('name', model.get('name'));
            }
        }

        function displaySuccessfulSave() {
            var progressBar = $('.progress-bar');

            progressBar.addClass('active');
            progressBar.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e){
                progressBar.addClass('disappear');
                progressBar.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e){
                    progressBar.removeClass('active').removeClass('disappear');
                });
            });
        }

        function displaySaveError(xhr) {
            var message = '';
            if(xhr.status === 500) {
                message = $.parseJSON(xhr.responseText).message;
            } else {
                message = resources.user.errors[xhr.status];
            }
            this.displayAlertBox(message);
        }

    return userDetailView;
});