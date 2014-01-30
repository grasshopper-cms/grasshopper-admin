/*global define:false*/
define(['grasshopperBaseView', 'resources', 'api', 'underscore', 'jquery'],
    function (GrasshopperBaseView, resources, Api, _, $) {
    'use strict';
    return GrasshopperBaseView.extend({
        beforeRender : beforeRender,
        afterRender : afterRender,
        prepareToDeleteContentType : prepareToDeleteContentType,
        handleRowClick : handleRowClick,
        addNewFieldToContentType : addNewFieldToContentType,
        saveContentType : saveContentType
    });

    function beforeRender ($deferred) {
        var self = this;
        if (!this.model.has('label')) {

            this.model.fetch()
                .done(function() {
                    _handleSuccessfulModelFetch.call(self, $deferred);
                })
                .fail($deferred.reject);
        } else {
            $deferred.resolve();
        }

    }

    function _handleSuccessfulModelFetch($deferred) {
        this.collection.reset(this.model.get('fields'));
        $deferred.resolve();
    }

    function afterRender() {
        // TODO: Because the dropdown options are riveted, I need to re-foundationize it afterRender.
        this.$el.foundation();
    }

    function prepareToDeleteContentType () {
        _getContentTypesContent.call(this)
            .then(_warnUserBeforeDeleting.bind(this))
            .then(_actuallyDeleteContentType.bind(this));
    }

    function _warnUserBeforeDeleting(associatedContent) {
        if(associatedContent) {
            return this.displayModal(
                {
                    msg : resources.contentType.deletionWarningWithAssociatedContent,
                    data : associatedContent,
                    type : 'list'
                });
        }

        return this.displayModal(
            {
                msg : resources.contentType.deletionWarningWithoutAssociatedContent
            });
    }

    function _getContentTypesContent() {
        var $deferred = new $.Deferred(),
            self = this;

        Api.makeQuery(
            {
                nodes : [],
                types : [],
                filters : [],
                options : {
                    fake : true
                }
            })
            .done(function(results) {
                var content = _.where(results, {type: self.model.get('_id')});
                if(content.length > 0) {
                    $deferred.resolve(_.pluck(content, 'label'));
                } else {
                    $deferred.resolve();
                }
            })
            .fail(function() {
                $deferred.reject();
            });

        return $deferred.promise();
    }

    function _actuallyDeleteContentType() {
        this.model.destroy(
            {
                success : _handleSuccessfulContentTypeDeletion.bind(this),
                error : _handleFailedContentTypeDeletion.bind(this)
            });
    }

    function _handleSuccessfulContentTypeDeletion(model) {
        this.displayTemporaryAlertBox(
            {
                msg : resources.contentType.successfullyDeletedPre + model.get('label') +
                    resources.contentType.successfullyDeletedPost,
                status : true
            }
        );
        this.remove();
    }

    function _handleFailedContentTypeDeletion(model) {
        this.displayAlertBox(
            {
                msg : resources.contentType.errorDeleted + model.get('label')
            }
        );
    }

    function handleRowClick (e) {
        e.stopPropagation();
        this.app.router.navigateTrigger(this.model.get('href'), {}, true);
    }

    function addNewFieldToContentType(e, context) {
        e.preventDefault();
        this.collection.add(context.field);
    }

    function saveContentType() {
        this.model.set('fields', this.collection.toJSON());
        this.model.save()
            .done(_handleSuccessfulModelSave.call(this))
            .fail(_handleFailedModelSave.call(this));
    }

    function _handleSuccessfulModelSave() {
        this.displayTemporaryAlertBox(
            {
                msg: resources.contentType.successfulSave,
                status: true
            }
        );
    }

    function _handleFailedModelSave() {
        this.displayAlertBox(
            {
                msg: resources.contentType.failedSave
            }
        );
    }

});