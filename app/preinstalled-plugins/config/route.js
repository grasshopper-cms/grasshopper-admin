'use strict';

var jade = require('jade');

module.exports = route;

function route(router, db) {

    console.log('config router!!!!!!');
    router.route('/admin/config*')
        .get(function (req, res, next) {
            res.send(jade.compileFile(require.resolve('./index.jade'), {
                pretty : true
            })());
        });

    router.route('/admin/_config')
        .get(function(req, res, next) {
            db.collection('ghAdmin')
                .findOne({ "_id":"config" })
                .then(function(doc) {
                    res.status(200).json(doc);
                })
                .catch(function(e) {
                    res.status(500).send(e);
                })
        });
}