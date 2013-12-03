/*global define:false*/
define(['baseView', 'text!views/modal/_imageModalView.html', 'text!views/modal/_inputModalView.html', 'text!views/modal/_addContentModalView.html', 'api', 'underscore'],
    function (BaseView, imageModalTemplate, inputModalTemplate, addContentTemplate, Api, _) {
    'use strict';

    var ModalView = BaseView.extend({
        initialize : initialize,
        beforeRender : beforeRender,
        confirmModal : confirmModal,
        cancelModal : cancelModal
    });

    function initialize(options) {
        switch (options.type) {
            case 'image':
                options.templateHtml = imageModalTemplate;
                break;
            case 'input':
                options.templateHtml = inputModalTemplate;
                break;
            case 'addContent':
                options.templateHtml = addContentTemplate;
                break;
        }
        BaseView.prototype.initialize.apply(this, arguments);
    }

    function beforeRender() {
        var self = this;
        if(this.options.type === 'addContent') {
            Api.getContentTypes()
                .done(function(data) {
                    _.each(data.results, function(result) {
                        if(_.contains(self.model.get('data'), result._id)) {
                            result.checked = true;
                        }
                    });
                    self.model.set('data', data);
                });
        }

    }

    function confirmModal() {
        this.options.$deferred.resolve(this.model.get('data'));
        _removeModal.call(this);
    }

    function cancelModal() {
        this.options.$deferred.reject();
        _removeModal.call(this);
    }

    function _removeModal() {
        this.remove();
    }

    return ModalView;
});