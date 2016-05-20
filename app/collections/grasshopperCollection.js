define([
    'backbone', 'resources', 'constants',
    'underscore', 'helpers', 'moment'
], function (Backbone, resources, constants, _, helpers, moment) {

    'use strict';

    var BaseCollection = Backbone.Collection,
        oldSet = Backbone.Collection.prototype.set,
        LocalStorage = helpers.localStorage;

    return BaseCollection.extend({
        initialize : initialize,
        fetch : fetch,
        save : save,
        destroy : destroy,
        saveToCsv : saveToCsv
    });

    function initialize() {
        BaseCollection.prototype.set = function (data, options) {
            if (data && data.results) {
                data = data.results;
            }
            oldSet.call(this, data, options);
        };
    }

    function fetch (options) {
        var token = LocalStorage.get('authToken'),
            args = Array.prototype.slice.call(arguments, 0),
            fetchOptions = {
                data : {},
                headers : {
                    'Authorization' : token
                },
                success : function () {

                }
            };

        if (options) {
            _.extend(fetchOptions.data, options.data);
            _.extend(fetchOptions.headers, options.headers);
            _.extend(fetchOptions.success, options.success);
        }

        args[0] = fetchOptions;
        return Backbone.Collection.prototype.fetch.apply(this, args);
    }

    function save () {
        var saveOptions = {headers : {
            'Authorization' : LocalStorage.get('authToken')
        }};
        return Backbone.Collection.prototype.save.call(this, null, saveOptions);
    }

    function destroy (options) {
        options = options || {};
        options.headers = _.extend({}, options.headers, {
            'Authorization' : LocalStorage.get('authToken')
        });
        return Backbone.Collection.prototype.destroy.call(this, options);
    }

    function saveToCsv(downloadName) {
        var data = [],
            header = [],
            link = document.createElement('a'),
            csvContent = 'data:text/csv;charset=utf-8,',
            encodedUri;

        downloadName = downloadName ? downloadName : 'CSV data [date]';

        downloadName = downloadName.replace('[date]', moment().format('YYYY-MM-DD-hhmmss'));

        if( this.length === 0 ) {
            return window.console.log('No data to export');
        }

        data = this
            .map(function(model) {
                var flattenedModel = model.csvData(),
                    flattenedModelKeys = _.keys(flattenedModel),
                    newRow = [];

                header = _.unique(header.concat(flattenedModelKeys));

                flattenedModelKeys
                    .forEach(function(key) {
                        newRow[_.indexOf(header, key)] = flattenedModel[key];
                    });

                return newRow;
            });

        data.unshift(header);

        data.forEach(function(infoArray, index){
            var dataString = infoArray
                .map(function(value) {
                    return value.toString();
                })
                .join(',');

            csvContent += index < data.length ? dataString+ '\n' : dataString;
        });

        encodedUri = encodeURI(csvContent);

        link.setAttribute('href', encodedUri);
        link.setAttribute('download', downloadName+'.csv');

        link.click();
    }

});




/*

define([
    'backbone', 'resources', 'constants',
    'underscore', 'helpers', 'moment'
], function (Backbone, resources, constants, _, helpers, moment) {

    'use strict';

    var BaseCollection = Backbone.Collection,
        oldSet = Backbone.Collection.prototype.set,
        LocalStorage = helpers.localStorage;

    return BaseCollection.extend({
        initialize : initialize,
        fetch : fetch,
        save : save,
        destroy : destroy,
        saveToCsv : saveToCsv
    });

    function initialize() {
        BaseCollection.prototype.set = function (data, options) {
            if (data && data.results) {
                data = data.results;
            }
            oldSet.call(this, data, options);
        };
    }

    function fetch (options) {
        var token = LocalStorage.get('authToken'),
            args = Array.prototype.slice.call(arguments, 0),
            fetchOptions = {
                data : {},
                headers : {
                    'Authorization' : token
                },
                success : function () {

                }
            };

        if (options) {
            _.extend(fetchOptions.data, options.data);
            _.extend(fetchOptions.headers, options.headers);
            _.extend(fetchOptions.success, options.success);
        }

        args[0] = fetchOptions;
        return Backbone.Collection.prototype.fetch.apply(this, args);
    }

    function save () {
        var saveOptions = {headers : {
            'Authorization' : LocalStorage.get('authToken')
        }};
        return Backbone.Collection.prototype.save.call(this, null, saveOptions);
    }

    function destroy (options) {
        options = options || {};
        options.headers = _.extend({}, options.headers, {
            'Authorization' : LocalStorage.get('authToken')
        });
        return Backbone.Collection.prototype.destroy.call(this, options);
    }

    function saveToCsv(downloadName) {
        var data = [],
            header = [],
            rows = [],
            csvContent = 'data:text/csv;charset=utf-8,';

        downloadName = downloadName ? downloadName : 'CSV data [date]';

        downloadName = downloadName.replace('[date]', moment().format('YYYY-MM-DD-hhmmss'));

        if( this.length === 0 ) {
            return window.console.log('No data to export');
        }

        header = _.keys(this.first().csvData());

        rows = this
            .map(function(model) {
                var flattenedModel = model.csvData();

                header = header.concat(_.keys(flattenedModel));

                return flattenedModel;
            });

        header = _.unique(header);

        rows.forEach(function(flattenedModel) {
            var newRow = [];
            _.chain(flattenedModel)
                .keys()
                .each(function(key) {
                    newRow[_.indexOf(header, key)] = flattenedModel[key];
                });

            data.push(newRow);
        });

        data.unshift(header);

        data.forEach(function(infoArray, index){
            var dataString = infoArray
                .map(function(value) {
                    return value.toString();
                })
                .join(',');

            csvContent += index < data.length ? dataString+ '\n' : dataString;
        });

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', downloadName+'.csv');

        link.click();
    }

});

*/
