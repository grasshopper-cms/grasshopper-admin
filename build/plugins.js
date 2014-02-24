/*global define*/
define(["plugins/checkbox/config.js","plugins/checkbox/view.js","plugins/contentreference/config.js","plugins/contentreference/view.js","plugins/datetime/config.js","plugins/datetime/view.js","plugins/dropdown/config.js","plugins/dropdown/view.js","plugins/embeddedtype/config.js","plugins/embeddedtype/view.js","plugins/keyvalue/config.js","plugins/keyvalue/view.js","plugins/password/config.js","plugins/password/view.js","plugins/radio/config.js","plugins/radio/view.js","plugins/readonly/config.js","plugins/readonly/view.js","plugins/ref/config.js","plugins/ref/view.js","plugins/textarea/config.js","plugins/textarea/view.js","plugins/textbox/config.js","plugins/textbox/view.js"],
    function(checkboxConfig,checkboxView,contentreferenceConfig,contentreferenceView,datetimeConfig,datetimeView,dropdownConfig,dropdownView,embeddedtypeConfig,embeddedtypeView,keyvalueConfig,keyvalueView,passwordConfig,passwordView,radioConfig,radioView,readonlyConfig,readonlyView,refConfig,refView,textareaConfig,textareaView,textboxConfig,textboxView) {
        return {
            fields : [
				{
					type: "checkbox", 
					id: 1, 
					config: checkboxConfig, 
					helpText: "checkbox Help Text", 
					name: "Checkbox", 
					view: checkboxView
				},
				{
					type: "contentreference", 
					id: 2, 
					config: contentreferenceConfig, 
					helpText: "Content Reference Help Text", 
					name: "Content Reference", 
					view: contentreferenceView
				},
				{
					type: "datetime", 
					id: 3, 
					config: datetimeConfig, 
					helpText: "DateTime Help Text", 
					name: "Date Time", 
					view: datetimeView
				},
				{
					type: "dropdown", 
					id: 4, 
					config: dropdownConfig, 
					helpText: "Dropdown Help Text", 
					name: "Dropdown", 
					view: dropdownView
				},
				{
					type: "embeddedtype", 
					id: 5, 
					config: embeddedtypeConfig, 
					helpText: "embedded type Help Text", 
					name: "Embedded Type", 
					view: embeddedtypeView
				},
				{
					type: "keyvalue", 
					id: 6, 
					config: keyvalueConfig, 
					helpText: "keyvalue Help Text", 
					name: "Key : Value", 
					view: keyvalueView
				},
				{
					type: "password", 
					id: 7, 
					config: passwordConfig, 
					helpText: "password Help Text", 
					name: "Password", 
					view: passwordView
				},
				{
					type: "radio", 
					id: 8, 
					config: radioConfig, 
					helpText: "radio Help Text", 
					name: "Radio", 
					view: radioView
				},
				{
					type: "readonly", 
					id: 9, 
					config: readonlyConfig, 
					helpText: "Readonly Help Text", 
					name: "Readonly", 
					view: readonlyView
				},
				{
					type: "ref", 
					id: 10, 
					config: refConfig, 
					helpText: "REF Help Text", 
					name: "Ref", 
					view: refView
				},
				{
					type: "textarea", 
					id: 11, 
					config: textareaConfig, 
					helpText: "TextArea Help Text", 
					name: "TextArea", 
					view: textareaView
				},
				{
					type: "textbox", 
					id: 12, 
					config: textboxConfig, 
					helpText: "TextBox Help Text", 
					name: "TextBox", 
					view: textboxView
				}
            ]
        };
    });
