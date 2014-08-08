define(['grasshopperModel', 'resources', 'grasshopperCollection', 'paginatedCollection',
        'constants', 'masseuse', 'underscore', 'api', 'plugins/contentreference/modal/contentModel'],
    function (Model, resources, grasshopperCollection, paginatedCollection,
              constants, masseuse, _, api, contentReferenceModalContentModel) {

        'use strict';

        var ComputedProperty = masseuse.ComputedProperty;

        return Model.extend({
            initialize : initialize,
            idAttribute : '_id',
            defaults : {
                loading : true,
                nodeTreeType : 'content',
                nodeId : new ComputedProperty(['_id'], function(_id) {
                    return _id;
                }),
                breadcrumbs : [],
                inRoot : new ComputedProperty(['_id'], function(_id) {
                    return _id === '0';
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

            this.set('content', new (paginatedCollection.extend({
                model : contentReferenceModalContentModel,
                url : function() {
                    return constants.api.nodesContent.url.replace(':id', self.get('_id'));
                },
                limit : 10000,
                skip : parseInt(constants.pagination.defaultSkip, 10),
                nodeId : this.get('nodeId'),
                filtersKey : 'virtual.label',
                queryRequest : api.makeQuery
            }))());

            this.on('change:selectedContent', _getContentDetails.bind(this));
            this.on('change:selectedContentDetails', _setContentLabel.bind(this));
        }

        function _getContentDetails() {
            var self = this;

            api.getContentDetail(this.get('selectedContent'))
                .done(function(contentDetails) {
                    self.set('selectedContentDetails', contentDetails);
                });
        }

        function _setContentLabel() {
            this.set('selectedContentLabel',
                this.get('selectedContentDetails.fields.'+ this.get('selectedContentDetails').meta.labelfield));
        }

    });


