/*global define:false*/
define(['grasshopperBaseView', 'jquery', 'svg-edit-embed-api'],
    function (GrasshopperBaseView, $) {
        'use strict';

        return GrasshopperBaseView.extend({
            initializeSvgEdit : initializeSvgEdit,
            saveSvg : saveSvg,
            showEditor : showEditor,
            hideEditor: hideEditor
        });

        function initializeSvgEdit() {
            var iframe = document.getElementById('svgEdit'),
                $iframe = this.$(iframe),
                svgCanvas = new window.EmbeddedSVGEdit(iframe),
                $mainButton = $iframe.contents().find('#main_button');

            if(this.model.get('value')) {
                svgCanvas.setSvgString(this.model.get('value'));
            }

            $mainButton.find('#tool_save').hide();

            this.svgCanvas = svgCanvas;
        }

        function showEditor() {
            this.model.toggle('editing');
        }

        function hideEditor() {
            this.model.toggle('editing');
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