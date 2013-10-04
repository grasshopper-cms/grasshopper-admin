define(['masseuseModel', 'computedProperty'], function (Model, ComputedProperty) {
    return Model.extend({
        defaults : {
            users : [],
            currentPage : new ComputedProperty(['users'], function (attribute) {
                return attribute.grab('currentPage');
            }, true),
            totalResults : new ComputedProperty(['users'], function (attribute) {
                return attribute.grab('totalResults');
            }, true),
            totalPages : new ComputedProperty(['users'], function (attribute) {
                return attribute.grab('totalPages');
            }, true),
            pages : new ComputedProperty(['users'], function (attribute) {
                return attribute.grab('pages');
            }, true),
            nextPage : new ComputedProperty(['users'], function (attribute) {
                return attribute.grab('nextPage');
            }, true),
            prevPage : new ComputedProperty(['users'], function (attribute) {
                return attribute.grab('prevPage');
            }, true),
            dropDownOptions : new ComputedProperty(['users'], function (attribute) {
                return attribute.grab('dropDownOptions');
            }, true)

        }

    });


});
