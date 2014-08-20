define(['jquery', 'underscore', 'resources', 'constants', 'api'],
    function ($, _, resources, constants, Api) {
        'use strict';

        var clipboardContent = {};
        var subscribers = [];

        return {
            cutContent: cutContent,
            copyContent: copyContent,
            pasteContent: pasteContent,
            subscribe: subscribe,
            clear: clear,
            resources: resources
        };

        function _notify () {
            _.each(subscribers, function (that) {
                // see http://stackoverflow.com/questions/9909799/backbone-js-change-not-firing-on-model-change
                that.unset('clipboardContent', {silent: true});
                that.set({'clipboardContent': clipboardContent});

            });
        }

        function subscribe (that) {
            subscribers.push(that);
        }

        function cutContent (ctx, content) {
            clipboardContent = {op: 'move', values: [content]};
            _notify();
        }

        function copyContent (ctx, content) {
            clipboardContent = {op: 'copy', values: [content]};
            _notify();
        }

        function clear () {
            clipboardContent = {};
            _notify();
        }

        function _getIds (values) {
            return _.map(values, function (item) {
                return {
                    id: item.id,
                    type: item.type
                };
            });
        }

        function _prepareMoveRequest (clipboardContent, folderInfo) {
            return {
                op: clipboardContent.op,
                from: _getIds(clipboardContent.values),
                to: folderInfo.id
            };
        }

        function _pasteContent (ctx, clipboardContent, folderInfo, $deferred) {
            Api.moveContent(_prepareMoveRequest(clipboardContent, folderInfo))
                .then(
                    _clearAndResolve.bind(null, $deferred),
                    _rejectAndTriggerWarning.bind(null, $deferred, ctx)
                );
        }

        function _pasteAsset (ctx, clipboardContent, folderInfo, $deferred) {

            var $deferreds = _.map(clipboardContent.values, function (item) {
                var parts = item.id.split(/\/|\\/), nodeId = parts[0], fileName = parts[1];
                if (clipboardContent.op == 'copy') {

                    return Api.copyAsset({nodeid: nodeId, filename: fileName, newnodeid: folderInfo.id});
                } else if (clipboardContent.op == 'move') {
                    return Api.moveAsset({nodeid: nodeId, filename: fileName, newnodeid: folderInfo.id});
                }
            });

            $.when($deferreds)
                .done(_clearAndResolve.bind(null, $deferred))
                .fail($deferred.reject);
        }

        function pasteContent (ctx, ids, folderInfo) {
            var $deferred = new $.Deferred(), valueTypes = _.pluck(clipboardContent.values, 'type');

            if (clipboardContent && clipboardContent.op) {
                var msg = resources.clipboard.warningPaste;
                msg = msg.replace(':op', clipboardContent.op);
                msg = msg.replace(':nr_items', clipboardContent.values.length);
                msg = msg.replace(':items', 'item' + (clipboardContent.values.length !== 1 ? 's' : ''));
                msg = msg.replace(':folder', folderInfo.name ? folderInfo.name : 'ROOT');


                if (_.unique(valueTypes).length != 1) {
                    $deferred.reject(resources.clipboard.differentContentTypesWarning + valueTypes.join(', '));
                    _displayError.call(this, ctx, resources.clipboard.differentContentTypesWarning);
                } /*else if (valueTypes[0]) {

                 }*/ else {
                    _displayPasteWarning.call(this, ctx, msg).then(function () {
                        if (valueTypes[0] == 'asset') {
                            _pasteAsset(ctx, clipboardContent, folderInfo, $deferred);
                        } else if (valueTypes[0] == 'node' || valueTypes[0] == 'content') {
                            _pasteContent(ctx, clipboardContent, folderInfo, $deferred);

                        }
                    }, function (err) {
                        $deferred.reject(err);
                    });
                }

            }
            else {
                $deferred.reject(resources.clipboard.noOperationSpecified);
            }
            return $deferred.promise();
        }

        function _displayPasteWarning (view, msg) {
            return view.displayModal(
                {
                    header: resources.warning,
                    type: 'warning',
                    msg: msg
                });
        }

        function _displayError (view, msg) {
            return view.displayModal(
                {
                    header: resources.error,
                    type: 'error',
                    msg: msg
                });
        }

        function _clearAndResolve ($deferred, data) {
            clear();
            $deferred.resolve(data);
        }

        function _rejectAndTriggerWarning ($deferred, ctx, err) {
            $deferred.reject(err);
            _displayError.call(this, ctx, ( err && err.responseJSON) ? err.responseJSON.message : resources.clipboard.cannotCompleteOperation);
        }

    }
)
;