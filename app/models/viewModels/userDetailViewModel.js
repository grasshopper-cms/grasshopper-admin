define(['masseuseModel', 'computedProperty', 'constants'], function (Model, ComputedProperty, constants) {
    return Model.extend({
        defaults: {
            name : '',
            role : '',
            enabled : '',
            email : '',
            login : '',
            password : '',
            enabledText : new ComputedProperty(['enabled'], setEnabledText),
            id : ''
        },
        urlRoot : constants.api.users.url,
        url : url
    });

    function setEnabledText(attribute) {
        // Returns the text Enabled or Disabled to set the enabledText for use in the drop downs in the view.
        // TODO This is firing too late. It is triggering a change on the model. An thus an animation.
        return attribute === 'true' ? 'enabled' : 'disabled';
    }

    function url() {
        return this.urlRoot;
    }
});



