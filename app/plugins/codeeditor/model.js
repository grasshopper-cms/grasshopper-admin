define(['grasshopperModel', 'resources'], function (Model, resources) {
    'use strict';

    return Model.extend({
        defaults : {
            resources : resources,
            defaultTheme : 'ace/theme/monokai',
            defaultMode : 'ace/mode/javascript',
            possibleThemes : [
                'red',
                'blue',
                'green',
                'black',
                'purple'
            ],
            possibleLanguages : [
                'javs',
                'bluesld',
                'lkdjhlkjd',
                'euheuhe',
                'lkjss'
            ]
        }
    });

});