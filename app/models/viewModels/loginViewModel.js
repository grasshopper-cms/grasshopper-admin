define(['selfValidatingModel'], function (Model) {
    return Model.extend({
        validate: validate
    });

    function validate(attributes, options) {
        console.log('VALIDATION NATION!!');
        console.log(attributes);
        console.log(this.attributes);
        // TODO: do validation here on the potential new settings
        // http://backbonejs.org/#Model-validate
        // return something if the validation fails
        // and update the set('error', ... if it fails
        //   update using the overrid
        // .set('error', 'blah', {validate: false})
        // fail: return "whoops";
        // pass: return undefined
    }
});
