define(['grasshopperModel', 'resources', 'masseuse'], function (Model, resources, masseuse) {

    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return Model.extend({
        defaults : {
            resources : resources,
            defaultTheme : 'ace/theme/monokai',
            defaultMode : 'ace/mode/javascript',
            possibleLanguages : [ // these live ace/mode/<name underscore>
                'javascript',
                'html',
                'css'
            ],
            possibleThemes : [ // these live ace/theme/<name underscore>
                    'ambiance',
                    'chaos',
                    'chrome',
                    'clouds',
                    'clouds midnight',
                    'cobalt',
                    'crimson editor',
                    'dawn',
                    'dreamweaver',
                    'eclipse',
                    'github',
                    'idle fingers',
                    'katzenmilch',
                    'kr theme',
                    'kuroir',
                    'merbivore',
                    'merbivore soft',
                    'mono industrial',
                    'monokai',
                    'pastel on dark',
                    'solarized dark',
                    'solarized light',
                    'terminal',
                    'textmate',
                    'tomorrow',
                    'tomorrow night',
                    'tomorrow night blue',
                    'tomorrow night bright',
                    'tomorrow night eighties',
                    'twilight',
                    'vibrant ink',
                    'xcode'
            ],
            currentThemeLocation : new ComputedProperty(['options.theme'], function(themeName) {
                return 'ace/theme/' + themeName.replace(' ', '_');
            }),
            currentModeLocation : new ComputedProperty(['options.language'], function(languageName) {
                return 'ace/mode/' + languageName.replace(' ', '_');
            })
        }
    });

});