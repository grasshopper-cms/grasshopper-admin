define(['constants', 'masseuse', 'jquery', 'underscore'], function (constants, Masseuse, $, _) {
    'use strict';

    var LocalStorage = Masseuse.localStorage;

    return {
        postNewAsset : postNewAsset
    };

    /// ------ Attempting with jquery-file-upload blueimp plug in ------
    //https://github.com/blueimp/jQuery-File-Upload/wiki/API
    function postNewAsset(nodeId, file) {
//        var token = LocalStorage.get('authToken');
//
//        $('#stage').fileupload('send',
//            {
//                files: file,
//                url: constants.api.assets.url.replace(':id', nodeId),
//                headers : {'Authorization' : 'Token ' + token}
//            })
//            .success(function(result, textStatus, jqXHR) {
//                console.log(result);
//            })
//            .error(function(jqXHR, textStatus, errorThrown) {
//                console.log(textStatus);
//            })
//            .complete(function(result, textStatus, jqXHR) {
//                console.log('yeahhhhh baby');
//            });

    }

    /////////  ---- Attempting manually with XHR objects ------



//    function postNewAsset(nodeId, file) {
//        addLoadingRow.call(this, file);
//        makePostRequest.call(this, nodeId, file)
//            .done(function(data) {
//                console.log(data);
//            });
//    }

//    function addLoadingRow(file) {
//        console.log(file);
//        var elementId = file.name.replace(/\s+/g, '').replace('.', '');
//
//        $('#assetDetailRow').append('<tr id="'+ elementId +'"><td>'+ file.name +'</td><td>File Size:'+ file.size +'</td><td colspan="2"><div class="progress"><span class="meter" style="width: 0;"></span></div></td></tr>');
//        fakeLoadingProcess.call(this, elementId);
//    }
//
//    function makePostRequest(nodeId, file) {
//        var token = LocalStorage.get('authToken'),
//            form_data = new FormData(),
//            $deferred = new $.Deferred();
//
//        form_data.append('file', file);
//
//        var request = new XMLHttpRequest();
//
//        request.upload.addEventListener('progress', function(e){
//            handleProgress.call(this, e);
//        }, false);
//
//        request.open('POST', constants.api.assets.url.replace(':id', nodeId));
//
//        request.setRequestHeader('Authorization', 'Token ' + token);
//        request.setRequestHeader('Accept', '*/*');
//
//        request.onreadystatechange = function(e) {
//            if(request.readyState !== 4) {
//                return;
//            }
//            if([200,304].indexOf(request.status) === -1) {
//                $deferred.reject(new Error('Server responded with a status of ' + request.status));
//            } else {
//                $deferred.resolve(JSON.parse(request.response).message);
//            }
//        };
//
//        console.log(request);
//
//        request.send(form_data);
//
//        return $deferred.promise();
//    }
//
//    function handleProgress(e) {
//        console.log(Math.ceil(e.loaded/e.total) * 100);
//    }
//
//    function handleSuccess() {
//
//    }
//
//    function fakeLoadingProcess(elementId) {
//        var progression = 0,
//            progress = setInterval(function()
//            {
//                $('.meter').css({'width':progression+'%'});
//                if(progression == 100) {
//                    clearInterval(progress);
//                    $('#' + elementId).fadeOut('slow', function() {
//                        //get the file from the server, append an asset detail view for it
//                        $('#' + elementId).remove();
//                    });
//                } else {
//                    progression += 2;
//                }
//            }, 100);
//    }

});