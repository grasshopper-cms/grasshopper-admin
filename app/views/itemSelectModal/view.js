/*global define:false*/
define(['grasshopperBaseView', 'itemSelectModal/config', 'jquery', 'breadcrumbWorker', 'resources', 'assetWorker', 'underscore'],
    function (GrasshopperBaseView, config, $, breadcrumbWorker, resources, assetWorker, _) {

        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : config,
            initialize : initialize,
            beforeRender : beforeRender,
            confirmModal : confirmModal,
            cancelModal : cancelModal,
            navigateToFolder : navigateToFolder,
            startUploadWorkflow : startUploadWorkflow
        });

        function initialize(options) {
            switch (options.type) {
                case 'file':
                    options.template = config.fileTemplate;
                    break;
                case 'content':
                    options.template = config.contentTemplate;
                    break;
                default:
                    options.template = config.contentTemplate;
                    break;
            }

            this.options = options;
            GrasshopperBaseView.prototype.initialize.apply(this, arguments);
        }

        function beforeRender($deferred) {
            _setBreadcrumbs.call(this);
            $.when(_fetchChildNodes.call(this),
                    _fetchChildContentOrAssets.call(this))
                .done($deferred.resolve);
        }

        function _fetchChildNodes() {
            return this.model.get('childNodes').fetch();
        }

        function _fetchChildContentOrAssets() {
            if(this.options.type === 'file') {
                return this.model.get('assets').fetch();
            } else {
                return this.model.get('content').fetch();
            }
        }

        function confirmModal () {
            this.$deferred.resolve(this.model.get('value'));
            _removeModal.call(this);
        }

        function cancelModal () {
            this.$deferred.reject();
            _removeModal.call(this);
        }

        function _removeModal () {
            this.remove();
        }

        function _setBreadcrumbs() {
            var $deferred = new $.Deferred(),
                self = this;

            $deferred.done(function() {
                self.model.set('breadcrumbs', self.breadcrumbs);
            });

            breadcrumbWorker.contentBrowse.call(this, $deferred, { trigger : false });
        }

        function navigateToFolder(e) {
            this.model.set('_id', $(e.target).attr('nodeId'));

            breadcrumbWorker.resetBreadcrumb.call(this);

            _setBreadcrumbs.call(this);
            _fetchChildNodes.call(this);
            _fetchChildContentOrAssets.call(this);
        }

        function startUploadWorkflow() {
            var nodeId = this.model.get('_id'),
                promises = [],
                self = this;

            _toggleUploading.call(this);

            _getFilesFromUser.call(this)
                .done(function(files) {

                    _.each(files, function(file) {
                        promises.push(assetWorker.postNewAsset(nodeId, file));
                    });

                    $.when(promises)
                        .then(_fetchChildContentOrAssets.bind(self))
                        .then(_toggleUploading.bind(self));

                });
        }

        function _getFilesFromUser() {
            var $deferred = $.Deferred();

            this.displayModal(
                {
                    header : resources.asset.uploadAssetModalMsg,
                    type : 'upload',
                    data : {}
                })
                .done(function(modalData) {
                    $deferred.resolve(modalData.files);
                });

            return $deferred.promise();
        }

        function _toggleUploading() {
            this.model.toggle('uploading');
        }

    });



//'filter-by-allowed-types' :  function(el, model) {
//                    var allowedTypes = model.get('allowedTypes'),
//                            thisModelsType = model.get('type');
//
//                        if (!_.isEmpty(allowedTypes) && !_.contains(allowedTypes, thisModelsType)) {
//                            $(el).hide();
//                        }
//                }
