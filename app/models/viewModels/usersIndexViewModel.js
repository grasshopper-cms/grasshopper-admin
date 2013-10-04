define(['masseuseModel', 'computedProperty', 'resources'], function (Model, ComputedProperty, resources) {
    return Model.extend({
        defaults : {
            users : [],
            currentPage : new ComputedProperty(['users'], function (collection) {
                return collection.grab('currentPage');
            }, true),
            totalResults : new ComputedProperty(['users'], function (collection) {
                return collection.grab('totalResults');
            }, true),
            totalPages : new ComputedProperty(['users'], function (collection) {
                return collection.grab('totalPages');
            }, true),
            pages : new ComputedProperty(['users'], function (collection) {
                return collection.grab('pages');
            }, true),
            nextPage : new ComputedProperty(['users'], function (collection) {
                return collection.grab('nextPage');
            }, true),
            prevPage : new ComputedProperty(['users'], function (collection) {
                return collection.grab('prevPage');
            }, true),
            dropDownOptions : new ComputedProperty(['users'], function (collection) {
                return collection.grab('dropDownOptions');
            }, true),
            resources : resources
        }

    });


});
