// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
        })

        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                    .state('app', {
                        url: "/app",
                        abstract: true,
                        templateUrl: "templates/menu.html",
                        controller: 'AppCtrl'
                    })

                    .state('app.chisiamo', {
                        url: "/chisiamo",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/chisiamo.html",
                                controller: 'ChiSiamoCtrl'
                            }
                        }
                    })

                    .state('app.contatti', {
                        url: "/contatti",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/contatti.html",
                                controller: 'MapController'
                            }
                        }
                    })

                    .state('app.categorie', {
                        url: "/categorie",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/categorie.html",
                                controller: 'CategorieCtrl'
                            }
                        }
                    })

                    .state('app.prodotti', {
                        url: "/prodotti/:categorieId",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/prodotti.html",
                                controller: 'ProdottiCtrl'
                            }
                        }
                    })

                    .state('app.prodotto', {
                        url: "/prodotti/:categoria/:prodottoId",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/prodotto.html",
                                controller: 'ProdottoCtrl'
                            }
                        }
                    })
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/categorie');
        });
