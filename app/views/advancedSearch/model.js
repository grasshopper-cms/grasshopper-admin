define(['grasshopperModel', 'resources', 'advancedSearch/content/model'], function(Model, resources, ContentSearchModel) {
    'use strict';

    return Model.extend({
        initialize : initialize,
        defaults : {
            resources : resources
        }
    });

    function initialize() {
        Model.prototype.initialize.apply(this, arguments);

        this.set('contentSearchModel', new ContentSearchModel());
    }
});