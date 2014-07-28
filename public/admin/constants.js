/*global define*/
define([], function() {
    'use strict';

    var apiEndpoint = '',
        version = '0.27.4',
        librariesVersions = '[{"name":"ScrollToFixed","version":"1.0.6"},{"name":"SparkMD5","version":"0.0.5"},{"name":"ace","version":"1.1.3"},{"name":"backbone-amd","version":"1.1.0"},{"name":"chai","version":"1.7.2"},{"name":"ckeditor","version":"4.3.5"},{"name":"datetimepicker","version":"2.3.2"},{"name":"font-awesome","version":"4.1.0"},{"name":"foundation","version":"5.0.2"},{"name":"jquery.ui","version":"1.10.4"},{"name":"jquery","version":"2.1.1"},{"name":"js-base64","version":"2.1.2"},{"name":"lodash-amd","version":"2.4.1"},{"name":"masseuse","version":"2.3.0"},{"name":"mocha","version":"1.12.1"},{"name":"modernizr","version":"2.8.3"},{"name":"moment","version":"2.5.1"},{"name":"requirejs-text","version":"2.0.10"},{"name":"requirejs","version":"2.1.14"},{"name":"rivets","version":"0.6.8"},{"name":"select2","version":"3.5.1"},{"name":"sinon-chai","version":"2.4.0"},{"name":"sinon","version":"1.7.3"}]';

    return {
        version : version,
        librariesVersions: librariesVersions,
        api : {
            base : {
                url : apiEndpoint
            },
            login : {
                url : apiEndpoint + '/token'
            },
            logout : {
                url : apiEndpoint + '/token/logout'
            },
            user : {
                url : apiEndpoint + '/user'
            },
            users : {
                url : apiEndpoint + '/users'
            },
            newUser : {
                url : apiEndpoint + '/users'
            },
            contentTypes : {
                url : apiEndpoint + '/contenttypes'
            },
            node : {
                url : apiEndpoint + '/node'
            },
            nodesChildren : {
                url : apiEndpoint + '/node/:id/children'
            },
            nodesContent : {
                url : apiEndpoint + '/node/:id/content'
            },
            assets : {
                url : apiEndpoint + '/node/:id/assets'
            },
            nodesContentTypes : {
                url : apiEndpoint + '/node/:id/contenttype'
            },
            content : {
                url : apiEndpoint + '/content'
            },
            contentQuery : {
                url : apiEndpoint + '/content/query'
            },
            version : {
                url : apiEndpoint + '/system'
            }
        },
        internalRoutes : {
            user : '#user',
            users : '#users',
            addUser : '#addUser',
            sysInfo: '#sysinfo',
            contentTypes : '#contentTypes',
            newContentType : '#contentTypes/new',
            contentTypeDetail : '#contentTypes/:id',
            content : '#items',
            contentDetail : '#item/:id',
            nodeDetail : '#items/nodeid/:id',
            login : '#login',
            logout : '#logout',
            about : '#about',
            createFolder : '#items/nodeid/:id/createFolder',
            addContent : '#items/nodeid/:id/createContent',
            createAssets : '#items/nodeid/:id/createAssets',
            forbidden : '#forbidden'
        },
        timeouts: {
            showSpinnerLoadingTimeout: 2000
        },
        fileExtensionsMap : {
            pdf : 'fa-file-pdf-o',
            doc : 'fa-file-word-o',
            docx : 'fa-file-word-o',
            xsl : 'fa-file-excel-o',
            xslx : 'fa-file-excel-o',
            txt : 'fa-file-text',
            zip : 'fa-file-archive-o',
            psd : 'fa-file-image-o',
            ai : 'fa-file-image-o',
            swf : 'fa-file-video-o'
        },
        imageExtensions : ['jpg', 'jpeg', 'png', 'bmp', 'webp', 'svg', 'gif'],
        pagination : {
            defaultLimit : 25,
            defaultSkip : 0,
            defaultPageSize : [25, 50, 100, 'all']
        }

    };

});