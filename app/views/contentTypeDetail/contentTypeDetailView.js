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
        saveContentType : saveContentType,
        saveAndClose : saveAndClose,
        newContentType : newContentType,
        refreshAccordion : refreshAccordion,
        collapseAccordion : collapseAccordion,
        openSpecificAccordion : openSpecificAccordion
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

    function prepareToDeleteContentType (e) {
        e.stopPropagation();
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
        var model = _.result(context.field.config, 'modelData');

        this.collapseAccordion();
        model.isNew = true;
        this.collection.add(model);
        this.refreshAccordion();
        _openLastAccordion.call(this);
    }

    function collapseAccordion() {
        this.$('#contentTypeFieldAccordion').accordion({ active : false });
    }

    function _openLastAccordion() {
        this.$('#contentTypeFieldAccordion').find(
            '.accordionHeader[modelid="'+ this.collection.last().cid +'"]').click();
    }

    function refreshAccordion() {
        this.$('#contentTypeFieldAccordion').accordion('refresh');
    }

    function openSpecificAccordion(index) {
        this.$('#contentTypeFieldAccordion').find(
            '.fieldAccordion[modelid="'+ this.collection.at(index).cid +'"]').click();
    }

    function saveContentType(e) {
        _swapSavingTextWithSpinner.call(this, e);
        this.model.toggle('saving');
        _saveContentTypeWorkflow.call(this, {});
    }

    function saveAndClose() {
        _saveContentTypeWorkflow.call(this, { close : true });
    }

    function _saveContentTypeWorkflow(options) {
        this.model.set('fields', this.collection.toJSON());

        this.model.save()
            .done(_handleSuccessfulModelSave.bind(this, options))
            .fail(_handleFailedModelSave.bind(this));
    }

    function _handleSuccessfulModelSave(options) {
        this.collapseAccordion();
        this.displayTemporaryAlertBox(
            {
                header : resources.success,
                msg: resources.contentType.successfulSave,
                style : 'success'
            }
        );

        if(options.close) {
            this.app.router.navigateTrigger(constants.internalRoutes.contentTypes);
        } else {
            this.model.toggle('saving');

            _swapSavingTextWithSpinner.call(this);

            this.app.router.navigateNinja(
                constants.internalRoutes.contentTypeDetail.replace(':id', this.model.get('_id')));

            breadcrumbWorker.resetBreadcrumb.call(this);
            _updateMastheadBreadcrumbs.call(this);
        }
    }

    function _handleFailedModelSave() {
        this.model.toggle('saving');

        _swapSavingTextWithSpinner.call(this);
        this.fireErrorModal(this.model.validationError ? this.model.validationError : resources.contentType.failedSave);
    }

    function _updateMastheadBreadcrumbs($deferred, isNew) {
        breadcrumbWorker.contentTypeBreadcrumb.call(this, $deferred, (isNew));
    }

    function _initializeSortableAccordions() {
        var $accordion = this.$('#contentTypeFieldAccordion');

        $accordion
            .accordion(
            {
                header : '.accordionHeader',
                icons : false,
                active : false,
                collapsible : true,
                disabled : false,
                heightStyle : 'content'
            })
            .sortable(
            {
                handle : '.fieldAccordion',
                revert : true,
                axis : 'y',
                start : _toggleAccordionEnabledDisabled.bind(this, $accordion),
                stop : _applyCollectionSort.bind(this, $accordion)
            }
        );
    }

    function _applyCollectionSort($accordion) {
        var fields = [],
            elements = {},
            $children = $accordion.children(),
            childLength = $children.length,
            i,
            self = this;

        $accordion.find('.fieldAccordion').each(function() {
            fields.push(self.collection.get($(this).attr('modelid')));
        });

        $children.each(function() {
            elements[$(this).attr('sortIndex')] = this;
        });

        for(i = 0; i < childLength; ++i) {
            $accordion.append(elements['sort'+ i]);
            $accordion.accordion('refresh');
        }

        this.collection.reset(fields);

        _toggleAccordionEnabledDisabled.call(this, $accordion);

    }

    function _toggleAccordionEnabledDisabled($accordion) {
        if($accordion.accordion( 'option', 'disabled' )) {
            $accordion.accordion( { disabled : false});
            $accordion.accordion( { active : false});
            $accordion.accordion('refresh');
        } else {
            $accordion.accordion( { disabled : true });
            $accordion.accordion('refresh');
        }
    }

    function newContentType() {
        if(this.model.isNew()) {
            this.app.router.displayContentTypeDetail();
        } else {
            this.app.router.navigateTrigger(constants.internalRoutes.newContentType);
        }
    }

    function _swapSavingTextWithSpinner(e) {
        var currentWidth,
            $currentTarget;

        if(e) {
            $currentTarget = $(e.currentTarget);
            this.model.set('swapElement', $currentTarget);
            this.model.set('swapText', $currentTarget.text());
            currentWidth = $currentTarget.width();
            $currentTarget.empty().width(currentWidth).append('<i class="fa fa-refresh fa fa-spin"></i>');
        } else {
            $(this.model.get('swapElement')).empty().text(this.model.get('swapText'));
        }
    }

});