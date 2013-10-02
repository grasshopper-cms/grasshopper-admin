/*global define:false*/
define(['baseView', 'rivetView', 'resources', 'userWorker', 'underscore'], function (BaseView, rivetView, resources, userWorker, _) {

        var userDetailView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#userDetail', rivetPrefix : 'userdetail', instaUpdateRivets : false}),
            displaySuccessfulSave : displaySuccessfulSave,
            displaySaveError : displaySaveError,
            updateModel : updateModel,
            beforeRender : beforeRender,
            updateNameInHeader : updateNameInHeader,
            updateEnabled : updateEnabled
        });

        function beforeRender() {
            this.model.set('isAdmin', this.app.user.get('isAdmin'));
            this.model.set('roles', resources.user.roles);
            this.listenTo(this.model, 'change', this.updateModel);
            this.listenTo(this.model, 'change:name', this.updateNameInHeader);
            this.listenTo(this.model, 'change:enabledText', this.updateEnabled);
        }

        function updateModel(model) {
            var key = _.keys(model.changed)[0],
                changedElement = $('.' + key + '.progress-bar'),
                changedElementIcon = $('.' + key + '.saving'),
                self = this;
            userWorker.updateModel(model, this.app.user)
                .done(function(data) {
                    displaySuccessfulSave(changedElement, changedElementIcon);
                }).fail(function(xhr) {
                    console.log(xhr);
                    displaySaveError.call(self, xhr);
                });
        }

        function updateNameInHeader(model) {
            if(userWorker.isThisMyProfile(model, this.app.user.get('_id'))) {
                this.app.user.set('name', model.get('name'));
            }
        }

        function updateEnabled(model) {
            if(model.get('enabledText') === 'enabled') {
                model.set('enabled', 'true');
            } else {
                model.set('enabled', 'false');
            }
        }

        function displaySuccessfulSave(changedElement, changedElementIcon) {
            var progressBar = changedElement,
                savingIcon = changedElementIcon;

            progressBar.addClass('active');
            savingIcon.addClass('visible');
            progressBar.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e){
                progressBar.addClass('disappear');
                progressBar.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e){
                    progressBar.removeClass('active').removeClass('disappear');
                    savingIcon.removeClass('visible');
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