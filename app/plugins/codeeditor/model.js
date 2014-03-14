define(['grasshopperModel', 'resources'], function (Model, resources) {
    'use strict';

    return Model.extend({
        defaults : {
            resources : resources,
            defaultTheme : 'ace/theme/monokai',
            defaultMode : 'ace/mode/javascript'
        }
    });

});