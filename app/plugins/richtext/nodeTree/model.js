define(['grasshopperModel', 'resources', 'grasshopperCollection', 'constants', 'masseuse',
    'plugins/richtext/fileDetailModel'],
    function (Model, resources, grasshopperCollection, constants, masseuse,
              fileDetailModel) {

    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return Model.extend({
        initialize : initialize,
        defaults : {
            resources : resources,
            loading : false,
            hasFetchedContent : false,
            folderOpen : false,
            folderClass : new ComputedProperty(['folderOpen'], function(folderOpen) {
                return folderOpen ? 'icon-folder-open' : 'icon-folder-close' ;
            })
        }
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