define(['grasshopperModel', 'resources', 'constants', 'masseuse', 'underscore'],
    function (GrasshopperModel, resources, constants, masseuse, _) {
    'use strict';

    var ProxyProperty = masseuse.ProxyProperty;

    return GrasshopperModel.extend({
        initialize : initialize,
        defaults : {
            resources : resources,
            fields : null
        },
        urlRoot : constants.api.content.url
    });

    function initialize() {
        this.on('change:schema', _findAndProxyLabel, this);
    }

    function _findAndProxyLabel() {
        var propertyName = _.first(this.get('schema'))._id;

        this.set('label', new ProxyProperty('fields.' + propertyName, this));
    }
});