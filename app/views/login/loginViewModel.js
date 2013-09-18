define(['selfValidatingModel'], function (Model) {
    return Model.extend({
        validate: validate
    });

    function validate() {
        console.log('VALIDATION NATION!!');
        console.log(this.attributes);
    }
});
