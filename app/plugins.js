/*global define*/
define({
    fields : [
        {
            name : 'Text Box',
            type : 'textbox',
            helpText : 'Text Box Help Text!',
            id : 1,
            view : './plugins/textBox/textBoxPlugin.js',
            config : './plugins/textBox/textBoxPluginConfig.js'
        },
        {
            name : 'Text Area',
            type : 'textarea',
            helpText : 'text Area Help Text',
            id : 2,
            view : './plugins/textArea/textAreaPlugin.js',
            config : './plugins/textArea/textAreaPluginConfig.js'
        },
        {
            name : 'Dropdown',
            type : 'dropdown',
            helpText : 'Dropdown Help Text',
            id : 3,
            view : './plugins/dropdown/dropdownPlugin.js',
            config : './plugins/dropdown/dropdownPluginConfig.js'
        },
        {
            name : 'Readonly',
            type : 'readonly',
            helpText : 'Readonly Help Text',
            id : 4,
            view : './plugins/readonly/readonlyPlugin.js',
            config : './plugins/readonly/readonlyPluginConfig.js'
        },
        {
            name : 'Reference',
            type : 'ref',
            helpText : 'Reference Help Text',
            id : 5,
            view : './plugins/textBox/textBoxPlugin.js',
            config : './plugins/textBox/textBoxPluginConfig.js'
        }
    ]
});