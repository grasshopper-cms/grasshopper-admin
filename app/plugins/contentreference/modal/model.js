define(['grasshopperModel', 'resources', 'grasshopperCollection', 'constants', 'masseuse', 'underscore', 'api',
        'plugins/contentReference/modal/contentModel'],
    function (Model, resources, grasshopperCollection, constants, masseuse, _, Api,
              contentReferenceModalContentModel) {

        'use strict';

        var ComputedProperty = masseuse.ComputedProperty;

        return Model.extend({
            initialize : initialize,
            idAttribute : '_id',
            defaults : {
                loading : true,
                nodeTreeType : 'content',
                inRoot : new ComputedProperty(['_id'], function(_id) {
                    return _id === '0';
                }),
                folderLabel : new ComputedProperty(['_id', 'label'], function(_id, label) {
                    return _id === '0' ? 'Root' : label;
                }),
                resources : resources
            },
            urlRoot : constants.api.node.url
        });

        function initialize() {
            var self = this;
            Model.prototype.initialize.apply(this, arguments);
            this.set('children', new (grasshopperCollection.extend({
                url : function() {
                    return constants.api.nodesChildren.url.replace(':id', self.get('_id'));
                }
            }))());

            this.set('content', new (grasshopperCollection.extend({
                model : contentReferenceModalContentModel,
                url : function() {
                    return constants.api.nodesContent.url.replace(':id', self.get('_id'));
                }
            }))());

            this.on('change:selectedContent', _getContentDetails.bind(this));
            this.on('change:selectedContentDetails', _getSelectedContentsContentType.bind(this));
            this.on('change:selectedContentsContentType', _setContentLabel.bind(this));
        }

        function _getContentDetails() {
            var self = this;

            Api.getContentDetail(this.get('selectedContent'))
                .done(function(contentDetails) {
                    self.set('selectedContentDetails', contentDetails);
                });
        }

        function _getSelectedContentsContentType() {
            this.set('selectedContentsContentType',
                _.findWhere(this.get('availableTypes'), { _id : this.get('selectedContentDetails').type }));
        }

        function _setContentLabel() {
            var firstFieldId = _.first(this.get('selectedContentsContentType').fields)._id;

            this.set('selectedContentLabel', this.get('selectedContentDetails').fields[firstFieldId]);
        }

    });


