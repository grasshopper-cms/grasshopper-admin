'use strict';

var express = require('express'),
    path = require('path');

module.exports = function() {
    var adminRouter = express.Router();

    adminRouter.use(express.static(path.join(__dirname, '_public')));

    require('./content-types/route')(adminRouter);
    require('./forbidden/route')(adminRouter);
    require('./help/route')(adminRouter);
    require('./items/route')(adminRouter);
    require('./item/route')(adminRouter);
    require('./login/route')(adminRouter);
    require('./logout/route')(adminRouter);
    require('./sys-info/route')(adminRouter);
    require('./users/route')(adminRouter);
    require('./user/route')(adminRouter);

    return adminRouter;
};