/*global define*/
define([], function() {
    'use strict';

    var apiEndpoint = '<%= apiEndpoint %>',
        version = '<%= version %>',
        libraryVersions = '<%= JSON.stringify(libraryVersions) %>';

    return {
        version : version,
        libraryVersions: libraryVersions,
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
            },
            google : {
                url : apiEndpoint + '/googleurl'
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
            forbidden : '#forbidden',
            notFound : '#notFound'
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
        contentSearchThrottle: 1000,
        pagination : {
            defaultLimit : 25,
            defaultSkip : 1,
            defaultPagesLimit : 7,
            defaultPageSize : [25, 50, 100, 'all'],
            defaultAllLimit : 100000
        },
        controlKeyCodeMap : {
            13 : 'enter',
            16 : 'shift',
            17 : 'cntrl',
            18 : 'alt',
            20 : 'capsLock',
            27 : 'esc',
            37 : 'lArr',
            38 : 'tArr',
            39 : 'rArr',
            40 : 'bArr',
            91 : 'leftCMD',
            93 : 'rightCMD'
        },
        // https://github.com/josdejong/jsoneditor/blob/master/docs/api.md

        jsoneditor : {
            mode: 'tree',
            modes:['code', 'tree']
        }

    };

});