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
                return calculateNextButton(attribute);
            }, true),
            prevPage : new ComputedProperty(['users'], function (attribute) {
                return calculatePrevButton(attribute);
            }, true)

        }
    });

    function calculateNextButton (collection) {
        var returnObj = {
                disabled : true,
                link : '#users',
                onClick : 'return false;'
            };

        if (collection.grab('currentPage') < collection.grab('totalPages')) {
            returnObj = {
                disabled : false,
                link : '#users/page/' + (collection.grab('currentPage') + 1),
                onClick : ''
            };
        }

        return returnObj;
    }

    function calculatePrevButton (collection) {
        var returnObj = {
                disabled : true,
                link : '#users',
                onClick : 'return false;'
            };

        if (collection.grab('currentPage') > 1) {
            returnObj = {
                disabled : false,
                link : '#users/page/' + (collection.grab('currentPage') - 1),
                onClick : ''
            };
        }

        return returnObj;
    }

});
