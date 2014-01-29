/*global define:false*/
define(['grasshopperBaseView', 'resources', 'plugins', 'api', 'underscore', 'jquery'],
    function (GrasshopperBaseView, resources, plugins, Api, _, $) {
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
        if (!this.model.has('label')) {
            this.model.fetch()
                .done($deferred.resolve)
                .fail($deferred.reject);
        } else {
            $deferred.resolve();
        }
        this.model.set('plugins', plugins);
    }

    function afterRender() {
        this.$el.foundation();
    }

    function prepareToDeleteContentType () {
        _warnUserBeforeDeleting.call(this)
            .then(_actuallyDeleteContentType.bind(this));
    }

    function _warnUserBeforeDeleting() {
        var $deferred = new $.Deferred(),
            self = this;

        _getContentTypesContent.call(this)
            .done(function(content) {
                self.displayModal(
                    {
                        msg : resources.contentType.deletionWarningWithAssociatedContent,
                        data : content,
                        type : 'list'
                    })
                    .done(function() {
                        $deferred.resolve();
                    })
                    .fail(function() {
                        $deferred.reject();
                    });
            })
            .fail(function() {
                self.displayModal(
                    {
                        msg : resources.contentType.deletionWarningWithoutAssociatedContent
                    })
                    .done(function() {
                        $deferred.resolve();
                    })
                    .fail(function() {
                        $deferred.reject();
                    });
            });

        return $deferred.promise();
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
                    $deferred.reject();
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
        console.log(this);
        console.log(e);
        console.log(context);
    }

    function saveContentType() {
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