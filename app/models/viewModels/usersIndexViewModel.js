define(['masseuse', 'resources', 'constants', 'grasshopperCollection'],
    function (masseuse, resources, constants, grasshopperCollection) {

    'use strict';

    var Model = masseuse.MasseuseModel;
//        ComputedProperty = masseuse.ComputedProperty;

    return Model.extend({
        initialize : initialize,
        defaults : {
//            currentPage : new ComputedProperty(['users'], function (collection) {
//                return collection.grab('currentPage');
//            }, true),
//            totalResults : new ComputedProperty(['users'], function (collection) {
//                return collection.grab('totalResults');
//            }, true),
//            totalPages : new ComputedProperty(['users'], function (collection) {
//                return collection.grab('totalPages');
//            }, true),
//            pages : new ComputedProperty(['users'], function (collection) {
//                return collection.grab('pages');
//            }, true),
//            nextPage : new ComputedProperty(['users'], function (collection) {
//                return collection.grab('nextPage');
//            }, true),
//            prevPage : new ComputedProperty(['users'], function (collection) {
//                return collection.grab('prevPage');
//            }, true),
//            dropDownOptions : new ComputedProperty(['users'], function (collection) {
//                return collection.grab('dropDownOptions');
//            }, true),
//            selected : new ComputedProperty(['users'], function (collection) {
//                return collection.paginationConfig.pageSize;
//            }, true),
//            defaultLimit : constants.userCollection.pageSize,
//            defaultPage : constants.userCollection.page,
            resources : resources
        }

    });

    function initialize() {
        Model.prototype.initialize.apply(this, arguments);
        this.set('users', new (grasshopperCollection.extend({
            url : function() {
                return constants.api.users.url
            }
        }))());
    }


});