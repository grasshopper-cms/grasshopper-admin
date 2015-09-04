/*global define*/
define(<%= defineBlock %>,
    function(<%= argumentsBlock %>) {
        'use strict';
        return {
            fields : [
                {
                    type: "<%= type %>",
                    id: '<%= id %>',
                    config: '<%= config + "Config" %>',
                    helpText: '<%= helpText %>',
                    name: '<%= name %>',
                    view: '<%= view + "View" %>'
                }
            ]
        };
    });
