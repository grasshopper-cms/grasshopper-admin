define(['masseuseModel', 'computedProperty'], function (Model, ComputedProperty) {
    return Model.extend({
        defaults: {
            name : '',
            role : '',
            enabled : '',
            email : '',
            login : '',
            password : '',
            enabledText : new ComputedProperty(['enabled'], setEnabledText)
        },
        initialize : function() {}
    });

    function setEnabledText(attribute) {
        // Returns the text Enabled or Disabled to set the enabledText for use in the drop downs in the view.
        return attribute === 'true' ? 'enabled' : 'disabled';
    }

});