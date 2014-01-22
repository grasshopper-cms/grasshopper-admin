/*global define*/
define({
    fields : [
        {
            name : 'Text Box',
            type : 'textbox',
            helpText : 'Text Box Help Text!',
            id : 1,
            view : './plugins/textbox/view.js',
            config : './plugins/textbox/config.js'
        },
        {
            name : 'Text Area',
            type : 'textarea',
            helpText : 'text Area Help Text',
            id : 2,
            view : './plugins/textbox/view.js',
            config : './plugins/textbox/config.js'
        },
        {
            name : 'Dropdown',
            type : 'dropdown',
            helpText : 'Dropdown Help Text',
            id : 3,
            view : './plugins/textbox/view.js',
            config : './plugins/textbox/config.js'
        },
        {
            name : 'Readonly',
            type : 'readonly',
            helpText : 'Readonly Help Text',
            id : 4,
            view : './plugins/textbox/view.js',
            config : './plugins/textbox/config.js'
        },
        {
            name : 'Reference',
            type : 'ref',
            helpText : 'Reference Help Text',
            id : 5,
            view : './plugins/textbox/view.js',
            config : './plugins/textbox/config.js'
        }
    ]
});