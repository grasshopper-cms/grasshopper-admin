/*global define:false*/
define(['grasshopperBaseView', 'contentTypeDetailViewConfig', 'resources', 'api', 'underscore', 'jquery'],
    function (GrasshopperBaseView, contentTypeDetailViewConfig, resources, Api, _, $) {
    'use strict';
    return GrasshopperBaseView.extend({
        defaultOptions : contentTypeDetailViewConfig,
        beforeRender : beforeRender,
        afterRender : afterRender,
        prepareToDeleteContentType : prepareToDeleteContentType,
        handleRowClick : handleRowClick,
        addNewFieldToContentType : addNewFieldToContentType,
        saveContentType : saveContentType,
        removeFieldFromCollection : removeFieldFromCollection
    });

    function beforeRender ($deferred) {
        if (!this.model.has('label') && !this.model.isNew()) {
            this.model.fetch()
                .done(_handleSuccessfulModelFetch.bind(this, $deferred))
                .fail($deferred.reject);
        } else {
            this.collection.reset();
            $deferred.resolve();
        }
    }

    function _handleSuccessfulModelFetch($deferred) {
        this.collection.reset(this.model.get('fields'));
        $deferred.resolve();
    }

    function afterRender() {
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

        console.log(this);
        this.model.save()
            .done(_handleSuccessfulModelSave.bind(this))
            .fail(_handleFailedModelSave.bind(this));
    }

    function _handleSuccessfulModelSave() {
        this.displayTemporaryAlertBox(
            {
                msg: resources.contentType.successfulSave,
                status: true
            }
        );
    }

    function _handleFailedModelSave(xhr) {
        console.log(xhr);
        this.displayAlertBox(
            {
                msg: resources.contentType.failedSave
            }
        );
    }

    function removeFieldFromCollection(e, context) {
        var self = this;
        this.displayModal({
            msg : resources.contentType.removeFieldWarning
        })
            .done(function() {
                self.collection.remove(context.field);
            });
    }

});