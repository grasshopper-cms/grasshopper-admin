/*global define:false*/
define(['grasshopperBaseView', 'contentTypeDetailViewConfig',
    'resources', 'api', 'underscore', 'jquery', 'breadcrumbWorker'],
    function (GrasshopperBaseView, contentTypeDetailViewConfig,
              resources, Api, _, $, breadcrumbWorker) {
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
        } else if (this.model.isNew()) {
            this.collection.reset();
            _updateMastheadBreadcrumbs.call(this, $deferred, true);
        } else {
            $deferred.resolve();
        }
    }

    function afterRender() {
        this.$el.foundation();

        this.listenTo(this.collection, 'change:type', _changeFieldPluginType);

        _initializeSortableAccordions.call(this);

        _addClickListenersToAccordion.call(this);
    }

    function _handleSuccessfulModelFetch($deferred) {
        _hydrateFieldsWithDefaultTypeFromPlugin.call(this);
        this.collection.reset(this.model.get('fields'));
        _updateMastheadBreadcrumbs.call(this, $deferred, false);
    }

    function _hydrateFieldsWithDefaultTypeFromPlugin() {
        var plugins = this.model.get('plugins');

        _.each(this.model.get('fields'), function(field) {
            console.log(_.findWhere(plugins, { type : field.type }));
            field.dataType = _.findWhere(plugins, { type : field.type }).config.modelData.dataType;
        });
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
        var model = context.field.config.modelData;

        _collapseAccordion.call(this);
        model.active = 'active';
        this.collection.add(model);
        _initializeSortableAccordions.call(this);
    }

    function _collapseAccordion() {
        this.$el.find('.accordionHeader').removeClass('activeHeader');
        this.$el.find('.accordionContent').hide(
            {
                effect : 'blind'
            }
        );
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
            header : resources.warning,
            msg : resources.contentType.removeFieldWarning
        })
            .done(function() {
                self.collection.remove(context.field);
            });
    }

    function _updateMastheadBreadcrumbs($deferred, isNew) {
        breadcrumbWorker.contentTypeBreadcrumb.call(this, $deferred, (isNew));
    }

    function _changeFieldPluginType(currentModel, newType) {
        var plugins = this.model.get('plugins'),
            previousType = currentModel.previousAttributes().type,
            previousModelComplexity = _getModelDataTypeFromPlugins.call(this, plugins, previousType),
            currentModelComplexity = _getModelDataTypeFromPlugins.call(this, plugins, newType);

        if(currentModelComplexity !== previousModelComplexity) {
            _warnUserBeforeChangingComplexTypes.call(this)
                .done(_actuallyChangeFieldPluginType.bind(this, currentModel, newType))
                .fail(_returnFieldPluginTypeToPreviousType.bind(this, currentModel, previousType));
        }
    }

    function _getModelDataTypeFromPlugins(plugins, type) {
        return _.findWhere(plugins, {
            type : type
        }).config.modelData.dataType;
    }

    function _warnUserBeforeChangingComplexTypes() {
        return this.displayModal(
            {
                header : resources.warning,
                msg : resources.contentType.switchingBetweenSimpleAndComplexTypesWarning
            });
    }

    function _actuallyChangeFieldPluginType(currentModel, newType) {
        var newTypeModel = _.findWhere(this.model.get('plugins'), { type : newType }).config.modelData;

        this.collection.remove(currentModel);

        _collapseAccordion.call(this);

        _.extend(newTypeModel, {
            active : 'active',
            label : currentModel.get('label'),
            min : currentModel.get('min'),
            max : currentModel.get('max'),
            multi : currentModel.get('multi'),
            helpText : currentModel.get('helpText'),
            required : currentModel.get('required')
        });

        this.collection.add(newTypeModel);

        _initializeSortableAccordions.call(this);
    }

    function _returnFieldPluginTypeToPreviousType(currentModel, previousType) {
        currentModel.set('type', previousType, {silent: true});
    }

    function _addClickListenersToAccordion() {
        var self = this;

        this.$el.find('.accordionHeader').on('click', function(e) {
            var $currentTarget = $(e.currentTarget),
                $accordionHeaders = self.$el.find('.accordionHeader');

            if($currentTarget.hasClass('activeHeader')) {
                $accordionHeaders.removeClass('activeHeader');
            } else {
                $accordionHeaders.removeClass('activeHeader');
                $currentTarget.addClass('activeHeader');
            }
        });
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
                heightStyle : 'content'
            })
            .sortable(
            {
                handle : '.accordionHeader',
                axis : 'y',
                stop : _applyCollectionSort.bind(this, $accordion)
            }
        );
    }

    function _applyCollectionSort($accordion) {
        var fields = [],
            self = this;

        $accordion.find('.accordionHeader').each(function() {
            fields.push(self.collection.get($(this).attr('modelid')));
        });

        this.collection.reset(fields, { silent : true });
    }

});