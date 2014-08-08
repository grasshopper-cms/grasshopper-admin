define(['grasshopperModel', 'resources', 'backbone', 'constants', 'grasshopperCollection', 'masseuse'],
    function (Model, resources, Backbone, constants, grasshopperCollection, masseuse) {

    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return Model.extend({
        defaults : {
            resources : resources,
            showTree : false,
            selectedContentHref : new ComputedProperty(['value'], function(contentId) {
                return constants.internalRoutes.contentDetail.replace(':id', contentId);
            }),
            selectedContentLabel : new ComputedProperty(['contentDetails'], function() {
                return this.get('contentDetails.fields.' + this.get('contentDetails.meta.labelfield'));
            }),
            _id : '0',
            nodeId : new ComputedProperty(['options'], function() {
                return this.get('options.defaultNode');
            })
        },
        urlRoot : constants.api.node.url
    });

});