/*global define:false*/
define(['grasshopperBaseView', 'jquery', 'helpers', 'svg-edit-embed-api'],
    function (PluginBaseView, $, helpers) {
        'use strict';

        var LocalStorage = helpers.localStorage;

        return PluginBaseView.extend({
            beforeRender : beforeRender,
            initializeSvgEdit : initializeSvgEdit,
            saveSvg : saveSvg
        });

        function beforeRender($deferred) {
            LocalStorage.remove('svgedit-default')
                .done($deferred.resolve);
        }

        function initializeSvgEdit() {
            var iframe = document.getElementById('svgEdit'),
                $iframe = this.$(iframe),
                svgCanvas = new window.EmbeddedSVGEdit(iframe),
                $mainButton = $iframe.contents().find('#main_button');

            if(this.model.get('value')) {
                svgCanvas.setSvgString(this.model.get('value'));
            }

            this.svgCanvas = svgCanvas;

            $iframe.contents().mouseup(this.saveSvg.bind(this));

            $mainButton.find('#tool_save').hide();
        }


        function saveSvg() {
            var self = this;

            _getSvgString.call(this)
                .done(function(actualSvg) {
                    self.model.set('value', actualSvg);
                })
                .fail();
        }

        function _getSvgString() {
            var $deferred = new $.Deferred();

            this.svgCanvas.getSvgString()(function(data, err) {
                if(err) {
                    $deferred.reject(err);
                    return;
                }
                $deferred.resolve(data);
            });

            return $deferred.promise();
        }

    });
