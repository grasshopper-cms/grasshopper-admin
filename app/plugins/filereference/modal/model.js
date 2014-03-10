define(['grasshopperModel', 'resources', 'grasshopperCollection', 'constants', 'masseuse', 'underscore',
    'plugins/filereference/fileDetailModel'],
    function (Model, resources, grasshopperCollection, constants, masseuse, _,
              fileDetailModel) {

        'use strict';

        var ComputedProperty = masseuse.ComputedProperty;

        return Model.extend({
            initialize : initialize,
            idAttribute : '_id',
            defaults : {
                loading : true,
                inRoot : new ComputedProperty(['_id'], function(_id) {
                    return _id === '0';
                }),
                folderLabel : new ComputedProperty(['_id', 'label'], function(_id, label) {
                    return _id === '0' ? 'Root' : label;
                }),
                selectedFileName : new ComputedProperty(['selectedFile'], function(selectedFile) {
                    return (selectedFile) ? _.last(selectedFile.split('/')) : '';
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

            this.set('files', new (grasshopperCollection.extend({
                model : fileDetailModel,
                url : function() {
                    return constants.api.assets.url.replace(':id', self.get('_id'));
                }
            }))());

        }
    });