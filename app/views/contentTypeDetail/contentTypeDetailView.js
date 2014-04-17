/*global define:false*/
define(['grasshopperBaseView', 'contentTypeDetailViewConfig',
    'resources', 'api', 'underscore', 'jquery', 'breadcrumbWorker', 'plugins', 'constants'],
    function (GrasshopperBaseView, contentTypeDetailViewConfig,
              resources, Api, _, $, breadcrumbWorker, plugins, constants) {
    'use strict';

    return GrasshopperBaseView.extend({
        defaultOptions : contentTypeDetailViewConfig,
        beforeRender : beforeRender,
        afterRender : afterRender,
        prepareToDeleteContentType : prepareToDeleteContentType,
        handleRowClick : handleRowClick,
        addNewFieldToContentType : addNewFieldToContentType,
        saveContentType : saveContentType
    });

    function beforeRender ($deferred) {
        if (!this.model.has('label') && !this.model.isNew()) {
            this.model.fetch()
                .done(_handleSuccessfulModelFetch.bind(this, $deferred))
                .fail($deferred.reject);
        } else if (this.model.isNew()) {
            _handleNewContentType.call(this, $deferred);
        } else {
            $deferred.resolve();
        }
    }

    function afterRender() {
        this.$el.foundation();

        _initializeSortableAccordions.call(this);
    }

    function _handleSuccessfulModelFetch($deferred) {
        this.collection.reset(this.model.get('fields'));
        _updateMastheadBreadcrumbs.call(this, $deferred, false);
    }

    function _handleNewContentType($deferred) {
        var textboxModelData = _.clone(_.findWhere(plugins.fields, { type : 'textbox' }).config.modelData);

        textboxModelData.label = 'Title';
        this.collection.reset(textboxModelData);
        _updateMastheadBreadcrumbs.call(this, $deferred, true);
    }

    function prepareToDeleteContentType () {
        _getContentTypesContent.call(this)
            .then(_warnUserBeforeDeleting.bind(this))
            .then(_actuallyDeleteContentType.bind(this));
    }

    function _warnUserBeforeDeleting(associatedContentCount) {
        var inflectedMessage;

        if(associatedContentCount) {
            inflectedMessage = (associatedContentCount > 1) ? 'pieces' : 'piece';
            inflectedMessage = associatedContentCount + ' ' + inflectedMessage;

            return this.displayModal(
                {
                    header : resources.warning,
                    msg : resources.contentType.deletionWarningWithAssociatedContent.replace(':count', inflectedMessage)
                });
        }

        return this.displayModal(
            {
                header : resources.warning,
                msg : resources.contentType.deletionWarningWithoutAssociatedContent
            });
    }

    function _getContentTypesContent() {
        var $deferred = new $.Deferred(),
            self = this,
            content;

        // TODO: This needs to be made more specific, Only get THIS types content. Maybe just make a new enpoint
        // GET contenttype/:id/content
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
                content = _.where(results, {type: self.model.get('_id')});

                if(content.length) {
                    $deferred.resolve(content.length);
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
                header : resources.success,
                style : 'success',
                msg : resources.contentType.successfullyDeletedPre + model.get('label') +
                    resources.contentType.successfullyDeletedPost
            }
        );
        this.remove();
    }

    function _handleFailedContentTypeDeletion(model) {
        this.fireErrorModal(resources.contentType.errorDeleted + model.get('label'));
    }

    function handleRowClick (e) {
        e.stopPropagation();
        this.app.router.navigateTrigger(this.model.get('href'), {}, true);
    }

    function addNewFieldToContentType(e, context) {
        var model = context.field.config.modelData;

        _collapseAccordion.call(this);
        model.isNew = true;
        this.collection.add(model);
        _initializeSortableAccordions.call(this);
    }

    function _collapseAccordion() {
        this.$el.find('.ui-accordion-header-active').each(function() {
            this.click();
        });
    }

    function saveContentType() {
        this.model.set('fields', this.collection.toJSON());

        this.model.save()
            .done(_handleSuccessfulModelSave.bind(this))
            .fail(_handleFailedModelSave.bind(this));
    }

    function _handleSuccessfulModelSave() {
        _collapseAccordion.call(this);
        this.displayTemporaryAlertBox(
            {
                header : resources.success,
                msg: resources.contentType.successfulSave,
                style : 'success'
            }
        );

        this.app.router.navigateNinja(
            constants.internalRoutes.contentTypeDetail.replace(':id', this.model.get('_id')));

        breadcrumbWorker.resetBreadcrumb.call(this);
        _updateMastheadBreadcrumbs.call(this);

    }

    function _handleFailedModelSave() {
        this.fireErrorModal(resources.contentType.failedSave);
    }

    function _updateMastheadBreadcrumbs($deferred, isNew) {
        breadcrumbWorker.contentTypeBreadcrumb.call(this, $deferred, (isNew));
    }

    function _initializeSortableAccordions() {
        var $accordion = this.$('#contentTypeFieldAccordion');

        $accordion
            .sortable(
            {
                handle : '.fieldAccordion',
                revert : true,
                axis : 'y',
                stop : _applyCollectionSort.bind(this, $accordion)
            }
        );
    }

    function _applyCollectionSort($accordion) {
        var fields = [],
            self = this;

        $accordion.find('.fieldAccordion').each(function() {
            fields.push(self.collection.get($(this).attr('modelid')));
        });

        this.collection.reset(fields, { silent : true });
    }

});