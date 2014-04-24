define(['grasshopperModel', 'constants', 'resources', 'masseuse', 'underscore'],
    function (GrasshopperModel, constants, resources, masseuse, _) {

        'use strict';

        var ComputedProperty = masseuse.ComputedProperty;

        return GrasshopperModel.extend({
            idAttribute : '_id',
            defaults : {
                resources : resources,
                enabled : true,
                fullname : new ComputedProperty(['firstname', 'lastname'], function(firstname, lastname) {
                    return firstname + ' ' + lastname;
                }),
                href : new ComputedProperty(['_id'], function(_id) {
                    return constants.internalRoutes.user + '/' + _id;
                }),
                saving : false
            },
            toJSON : toJSON,
            urlRoot : constants.api.users.url,
            url : function() {
                if(this.has('userModel') && this.get('_id') === this.get('userModel')._id) {
                    return constants.api.user.url; //Admin editing their own (/user)
                } else {
                    return constants.api.users.url + '/' + this.get('_id'); //admin editing someone else (/users/id)
                }
            }
        });

        function toJSON() {
            var json = GrasshopperModel.prototype.toJSON.apply(this);

            return _.omit(json, ['swapElement', 'swapText']);
        }
    });