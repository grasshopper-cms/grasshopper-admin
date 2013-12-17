define(['constants', 'masseuse', 'jquery'], function (constants, Masseuse, $) {
    'use strict';

    var LocalStorage = Masseuse.localStorage;

    return {
        postNewAsset : postNewAsset
    };

    function postNewAsset(nodeId, file) {
        var token = LocalStorage.get('authToken'),
            form_data = new FormData(),
            $deferred = new $.Deferred(),
            request;

        form_data.append('file', file);

        request = new XMLHttpRequest();

        request.upload.addEventListener('progress', function(e){
            $deferred.notify((e.loaded/e.total) * 100 + '%');
        }, false);

        request.open('POST', constants.api.assets.url.replace(':id', nodeId));

        request.setRequestHeader('Authorization', 'Token ' + token);
        request.setRequestHeader('Accept', '*/*');

        request.onreadystatechange = function() {
            if(request.readyState !== 4) {
                return;
            }
            if([200,304].indexOf(request.status) === -1) {
                $deferred.reject(request.status);
            } else {
                $deferred.resolve(JSON.parse(request.response).message);
            }
        };

        console.log(request);

        request.send(form_data);

        return $deferred.promise();
    }

});