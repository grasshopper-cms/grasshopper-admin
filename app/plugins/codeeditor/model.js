define(['grasshopperModel', 'resources', 'masseuse'], function (Model, resources, masseuse) {

    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return Model.extend({
        defaults : {
            resources : resources,
            possibleLanguages : [ // these live ace/mode/<name underscore>
                'javascript',
                'html',
                'css',
                'json',
                'markdown'
            ],
            possibleThemes : [ // these live ace/theme/<name underscore>
                'light', // => github
                'dark' // => monokai
            ],
            currentThemeLocation : new ComputedProperty(['options'], function(options) {
                if(options) {
                    return 'ace/theme/' + options.theme.replace('light', 'github').replace('dark', 'monokai');
                }
            }),
            currentModeLocation : new ComputedProperty(['options'], function(options) {
                if(options) {
                    return 'ace/mode/' + options.language.replace(' ', '_');
                }
            })
        }
    });

});