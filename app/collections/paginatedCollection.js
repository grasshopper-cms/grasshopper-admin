define(['grasshopperModel', 'grasshopperCollection'],
    function (Model, Collection) {
        'use strict';

        return Collection.extend({
            model : Model
        });

    });
