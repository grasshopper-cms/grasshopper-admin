/*global define:false*/
define(['baseView', 'resources','tinymce','codemirror','codemirrorjs'], function (BaseView, resources, tinymce, codemirror, codemirrorjs) {

    var contentEditView = BaseView.extend({
        beforeRender : beforeRender,
        afterRender : afterRender,
        displaySuccessfulSave : displaySuccessfulSave,
        displaySaveError : displaySaveError,
        updateModel : updateModel,
        updateNameInHeader : updateNameInHeader
    });

    function beforeRender () {
        this.model.set('isAdmin', this.app.user.get('isAdmin'));
        this.model.attributesToIgnore = ['isAdmin', 'resources', 'id', 'roles', 'possibleStatus', 'statusOptions'];
    }

//      TODO: Turn this into a mixin
    function afterRender () {
        this.rivetView();
        this.$el.foundation('forms');
        tinymce.init({
            selector: 'textarea.wysiwyg',
            theme: 'modern',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor'
            ],
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor emoticons',
            image_advtab: true
        });

        $('.code-editor').each(function(index) {
            $(this).attr('id', 'code-' + index);
            CodeMirror.fromTextArea(document.getElementById('code-' + index), {
                    mode: 'javascript',
                    lineNumbers: true,
                    theme: '3024-night'
                }
            );
        });
    }

    function updateModel (model) {
        var self = this;

        this.model.attributes = _.omit(this.model.attributes, this.model.attributesToIgnore);
        this.model.save()
            .done(function (model, response, options) {
                displaySuccessfulSave();
                updateNameInHeader.call(self, self.model);
            }).fail(function (odel, xhr, options) {
                displaySaveError.call(self, xhr);
            });

        return false;
    }

    function updateNameInHeader (model) {
        if (userWorker.isThisMyProfile(model, this.app.user.get('_id'))) {
            this.app.user.set('name', model.get('name'));
        }
    }

    function displaySuccessfulSave () {
        var progressBar = $('.progress-bar');

        progressBar.addClass('active');
        progressBar.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
            progressBar.addClass('disappear');
            progressBar.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
                progressBar.removeClass('active').removeClass('disappear');
            });
        });
    }

    function displaySaveError (xhr) {
        var message = '';
        if (xhr.status === 500) {
            message = $.parseJSON(xhr.responseText).message;
        } else {
            message = resources.user.errors[xhr.status];
        }
        this.displayAlertBox(message);
    }

    return contentEditView;
});