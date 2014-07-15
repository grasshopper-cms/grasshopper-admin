/* jshint loopfunc:true */
define(['jquery', 'underscore'],
    function ($, _) {

        'use strict';

        var fileExtensionsMap = {
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
        };

        return {
            checkfileextension : {
                bind : function() {},
                unbind : function() {},
                routine : function(el, model) {

                    var fileExtension = _.last(model.split('.'));

                    if ( _.has(fileExtensionsMap, fileExtension) ) {
                        $(el).removeClass('hide').addClass('fileExtension');
                        $(el).children().addClass(fileExtensionsMap[fileExtension]);
                    }
                }
            },
            checkfileextensionbutton : {
                bind : function() {},
                unbind : function() {},
                routine : function(el, model) {

                    var fileExtension = _.last(model.split('.'));

                    if ( _.has(fileExtensionsMap, fileExtension) ) {
                        $(el).removeClass('hide');
                    }
                }
            }
        };



    });