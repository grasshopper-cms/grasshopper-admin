/*global define:false*/
define(['grasshopperBaseView', 'svg-edit-embed-api'],
    function (GrasshopperBaseView) {
        'use strict';

        return GrasshopperBaseView.extend({
            initializeSvgEdit : initializeSvgEdit,
            loadSvg : loadSvg,
            saveSvg : saveSvg
        });

        function initializeSvgEdit() {
            var iframe = document.getElementById('svgEdit'),
                svgCanvas = new window.EmbeddedSVGEdit(iframe),
                doc = iframe.contentDocument || iframe.contentWindow.document,
                mainButton = doc.getElementById('main_button');

            mainButton.style.display = 'none';
            this.svgCanvas = svgCanvas;
        }

        function loadSvg() {
//            var svgexample = '<svg width="640" height="480" xmlns:xlink="http://www.w3.org/1999/xlink"
// xmlns="http://www.w3.org/2000/svg"><g><title>Layer 1<\/title><rect stroke-width="5" stroke="#000000"
// fill="#FF0000" id="svg_1" height="35" width="51" y="35" x="32"/><ellipse ry="15" rx="24" stroke-width="5" stroke="#000000" fill="#0000ff" id="svg_2" cy="60" cx="66"/><\/g><\/svg>';
//            svgCanvas.setSvgString(svgexample);
        }

        function saveSvg() {
//            svgCanvas.getSvgString()(handleSvgData);
        }



    });


//$(function () {'use strict';
//
//    var svgCanvas = null;
//
//    initEmbed = function () {
//        var doc, mainButton,
//            frame = document.getElementById('svgedit');
//        svgCanvas = new EmbeddedSVGEdit(frame);
//        // Hide main button, as we will be controlling new, load, save, etc. from the host document
//        doc = frame.contentDocument || frame.contentWindow.document;
//        mainButton = doc.getElementById('main_button');
//        mainButton.style.display = 'none';
//    };
//
//    function handleSvgData(data, error) {
//        if (error) {
//            alert('error ' + error);
//        } else {
//            alert('Congratulations. Your SVG string is back in the host page, do with it what you will\n\n' + data);
//        }
//    }
//
//    // Add event handlers
//    $('#load').click(loadSvg);
//    $('#save').click(saveSvg);
//    $('body').append(
//        $('<iframe src="svg-editor.html?extensions=ext-xdomain-messaging.js' +
//            window.location.href.replace(/\?(.*)$/, '&$1') + // Append arguments to this file onto the iframe
//            '" width="900px" height="600px" id="svgedit" onload="initEmbed();"></iframe>'
//        )
//    );
//});