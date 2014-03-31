/*global define:false*/
define(['grasshopperBaseView', 'fieldAccordionConfig', 'underscore', 'resources'],
    function(grasshopperBaseView, fieldAccordionConfig, _, resources) {
        'use strict';

        return grasshopperBaseView.extend({
            defaultOptions : fieldAccordionConfig,
            beforeRender : beforeRender,
            changeFieldType : changeFieldType
        });

        function beforeRender() {
//            console.log(this);
        }

        function changeFieldType(currentModel, newType) {
            var plugins = this.model.get('plugins'),
                previousType = this.model.previousAttributes().type,
                previousModelComplexity = _getModelDataTypeFromPlugins.call(this, plugins, previousType),
                currentModelComplexity = _getModelDataTypeFromPlugins.call(this, plugins, newType);

            if(currentModelComplexity !== previousModelComplexity) {
                _warnUserBeforeChangingComplexTypes.call(this)
                    .done(_actuallyChangeFieldPluginType.bind(this, newType))
                    .fail(_returnFieldPluginTypeToPreviousType.bind(this, previousType));
            }
        }

        function _actuallyChangeFieldPluginType(newType) {
            var newModel = _.findWhere(this.model.get('plugins'), { type : newType }).config.modelData,
                thisModel = this.model.pick('label', 'min', 'max', 'multi', 'helpText', 'required', 'validation', '_id');

            _.extend(newModel, thisModel, {
                active : 'active'
            });

            this.parent.collection.remove(this.model);
            this.parent.collection.add(newModel);
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

        function _returnFieldPluginTypeToPreviousType(previousType) {
            this.model.set('type', previousType, {silent: true});
        }

    });