/*global define*/
define([
    'backbone',
    'masseuseRouter',
    'api',
    'underscore',
    'baseView',
    'resources',
    'headerView',
    'headerViewConfig',
    'constants',
    'LocalStorage',
    'titleIndexView',
    'titleIndexViewConfig',
    'titleWorker',
    'activateView',
    'activateViewConfig',
    'loadingView',
    'loadingViewConfig',
    'input',
    'settingsView',
    'settingsViewConfig',
    'titleDetailView',
    'titleDetailViewConfig',
    'userModel'
],
    function (Backbone, MasseuseRouter, Api, _, BaseView, resources, HeaderView, headerViewConfig, constants, LocalStorage, TitleIndexView, titleIndexViewConfig, titleWorker, ActivateView, activateViewConfig, LoadingView, loadingViewConfig, input, SettingsView, settingsViewConfig, TitleDetailView, titleDetailViewConfig, UserModel) {

        var userModel = new UserModel(),
            currentView,
            spinner = $('#spinnerImage'),
            showHeader = _.after(2, function () {
                $('#header').show();
                $('#stage').addClass('fadeIn');
            }),
            ignoreFromTimer = [
                'loadingView'
            ];

        /**
         * @class Router
         * @extends MasseuseRouter
         */
        var Router = MasseuseRouter.extend({
            initialize : initialize,
            start : start,

            routes : {
                'home' : 'displayApp',
                'films/categories/:category/genres' : 'displayCategory',
                'films/category/:category/genre/:genre' : 'displayGenre',
                'activate' : 'displayActivation',
                'settings(/:subsection)' : 'displaySettings',
                'film/:id' : 'displayFilm',
                '*path' : 'goHome'

            },

            onRouteFail : onRouteFail,
            beforeRouting : beforeRouting,
            excludeFromBeforeRouting : [''],
            goBack : goBack,

            navigateTrigger : navigateTrigger,
            navigateNinja : navigateNinja,
            navigateDeferred : navigateDeferred,

            goHome : goHome,
            displayApp : displayApp,
            displayCategory : displayCategory,
            displayGenre : displayGenre,
            displayFilm : displayFilm,
            displaySettings : displaySettings,
            navigate : navigate

        });

        function onRouteFail () {
            this.navigateTrigger('login');
        }

        function beforeRouting () {
            var $deferred = new $.Deferred(),
                self = this;

            this.headerView.channels.views.trigger('breadCrumb:remove', []);

//            if (LocalStorage.get('authToken')) {
//
//                if (!this.user.get('_id')) {
//                    Api.authenticateToken(LocalStorage.get('authToken'))
//                        .done(function (data) {
//                            self.user.set({
//                                _id : data._id,
//                                email : data.email,
//                                enabled : data.enabled,
//                                login : data.login,
//                                name : data.name,
//                                password : data.password,
//                                role : data.role
//                            });
//                            $deferred.resolve();
//                        })
//                        .fail(function () {
//                            $deferred.reject();
//                        });
//                } else {
//                    $deferred.resolve();
//                }
//
//            } else {
//                $deferred.reject();
//            }
            $deferred.resolve();
            return $deferred.promise();
        }

        function navigateTrigger (fragment, options) {
            options = options || {};
            options.trigger = true;
            this.navigate(fragment, options);
        }

        function navigateNinja (fragment, options) {
            options = options || {};
            options.replace = true;
            this.navigate(fragment, options);
        }

        function navigateDeferred (fragment, options) {
            options = options || {};
            options.deferred = true;
            this.navigate(fragment, options);
        }

        function navigate (fragment, options) {
            // TODO: Move in to masseuse parts that we can
            if (currentView instanceof Backbone.View) {
                // (and override destroy in GH to remove alerts)
                currentView.hideAlertBox();
            }
            Backbone.Router.prototype.navigate.apply(this, arguments);

        }

        function initialize () {
            MasseuseRouter.prototype.initialize.apply(this, arguments);

            input.initialize({
                channels : BaseView.prototype.channels
            });

            BaseView.prototype.app = {
                router : this,
                input : input,
                user : userModel
            };
        }

        function start () {
            loadMainContent(LoadingView, loadingViewConfig);

            // TODO: this token is fake, because we cant get tokens yet, make sure this goes away sometime
            LocalStorage.set('authToken', '1221222343214141423');

            this.headerView = new HeaderView(headerViewConfig);
            this.headerView.start();
        }

        function goBack() {
            if(Backbone.history.breadCrumb.length > 1) {
                this.navigate(Backbone.history.breadCrumb.pop(), {trigger: true});
            } else {
                this.navigate('home', {trigger:true});
            }
        }

        function goHome () {
            this.navigateTrigger('home');
        }

        function displayApp () {
            loadMainContent(TitleIndexView, _.extend(titleIndexViewConfig,
                {
                    modelData: {
                        category: 'featured'
                    }
                }), true);
        }

        function displayCategory (category) {
            loadMainContent(TitleIndexView, _.extend(titleIndexViewConfig,
                {
                    modelData: {
                        category: category
                    }
                }), true);
        }

        function displayGenre (category, genre) {
            loadMainContent(TitleIndexView, _.extend(titleIndexViewConfig,
                {
                    modelData: {
                        category: category,
                        genre: genre
                    }
                }), true);
        }

        function displayFilm (id) {
            loadMainContent(TitleDetailView, _.extend(titleDetailViewConfig,
                {
                    modelData: {
                        id: id
                    }
                }));
        }

        function displaySettings (subsection) {
            loadMainContent(SettingsView, settingsViewConfig)
                .done(function(newView){
                    newView.goToSection(subsection);
                });
        }

        function loadMainContent (ViewType, config, bypass) {
            var $deferred = new $.Deferred(),
                newView = new ViewType(config),
                self = this;

            if(currentView && ! _.contains(ignoreFromTimer, currentView.options.name)) {
                spinnerTimer($deferred, newView);
            }

            if (currentView && currentView.options.name === config.name && !bypass) {
                return $deferred.resolve(currentView)
                    .promise();
            }

            newView.start()
                .progress(function (event) {
                    switch (event) {
                    case BaseView.beforeRenderDone:
                        if (currentView) {
                            currentView.remove();
                        }

                        currentView = newView;
                        break;
                    }
                })
                .done(function () {
                    $deferred.resolve(newView);
                    showHeader();
                })
                .fail(function () {
                    $deferred.reject();
                });

            return $deferred.promise();
        }

        function spinnerInit ($el) {
            $el.addClass('spinner');
            spinner.show();

        }

        function spinnerDeInit (timer, $el) {
            clearTimeout(timer);
            spinner.hide();
            $el.removeClass('spinner');
        }

        // Creates a loading spinner and opacity change on a view until a deferred is resolved or failed
        function spinnerTimer ($deferred, view) {
            var $el = view.$el,
                timer = setTimeout(function () {
                    spinnerInit($el);
                }, constants.universalTimerTimout);

            $deferred.always(function () {
                spinnerDeInit(timer, $el);
            });
        }


        return Router;
    });