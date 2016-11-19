angular.module('starter.controllers', [])

        .service("GlobalCache", ["$rootScope", function ($rootScope) {

                var categories = [
                    {title: 'Valvole Rotative', id: 'valvole_rotative'},
                    {title: 'Valvole Deviatrici', id: 'valvole_deviatrici'},
                    {title: 'Valvole a Farfalla', id: 'valvole_farfalla'},
                    {title: 'Microdosatore', id: 'microdosatore'},
                    {title: 'Raccordi di Giunzione', id: 'raccordi_giunzione'}
                ];

                var currentCategory;
                var currentCategoryDescription;

                this.getCategories = function () {
                    return categories || null;
                };

                this.setCurrentCategory = function (category) {

                    currentCategory = category.id;
                    currentCategoryDescription = category.title;
                };

                this.getCurrentCategory = function () {

                    return currentCategory;
                };

                this.getCurrentCategoryDescription = function () {

                    return currentCategoryDescription;
                };

            }])

        .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

        })

        .controller('ChiSiamoCtrl', function ($scope, $ionicModal, $timeout) {

            var width = window.innerWidth;

            $scope.width_header = width;
            $scope.image1_width = width / 3;
            $scope.image2_width = width / 5;

        })

       .controller('CategorieCtrl', ["$scope", "GlobalCache", function ($scope, GlobalCache) {

            $scope.categories = GlobalCache.getCategories();

	    $scope.setCategoria = function (id) {

            	GlobalCache.setCurrentCategory(id);
            };
        }])

        .controller('ProdottiCtrl', 
                ["$scope", "$http", "GlobalCache", "$stateParams", function ($scope, $http, GlobalCache, $stateParams) {

			$scope.categoria = $stateParams.categorieId;
			$scope.descrizione = GlobalCache.getCurrentCategoryDescription();
			$scope.items = [];
			$scope.larghezza = 0;

			$http.get('data/' + $scope.categoria + '.json')
				    .then(function (res) {

				        $scope.items = res.data.images;
				    });
			}])



        .controller('ProdottoCtrl',
                ["$scope", "$sce", "$stateParams", "$http", "GlobalCache", function ($scope, $sce, $stateParams, $http, GlobalCache) {

                        $scope.items = [];
                        $scope.categoria = GlobalCache.getCurrentCategory();
			
                        console.log(GlobalCache);
                        $scope.descrizione = GlobalCache.getCurrentCategoryDescription();
                        $scope.indice = $stateParams.prodottoId;
                        $scope.image = null;

                        $http.get('data/' + $scope.categoria + '.json')
                                .then(function (res) {

                                    $scope.items = res.data.images;
                                    $scope.image = $scope.items[$scope.indice];


                                    $http.get($scope.image.descrizione)
                                            .then(function (res) {

                                                $scope.trustedHtml = $sce.trustAsHtml(res.data);
                                            });
                                });

                        $scope.onSwipeRight = function () {

                            $scope.indice = ($scope.indice - 1);
                            if ($scope.indice < 0) {

                                $scope.indice = $scope.items.length - 1;
                            }
                            $scope.image = $scope.items[$scope.indice];
                            $http.get($scope.image.descrizione)
                                            .then(function (res) {

                                                $scope.trustedHtml = $sce.trustAsHtml(res.data);
                                            });
                        };

                        $scope.onSwipeLeft = function () {

                            $scope.indice = ($scope.indice + 1) % $scope.items.length;
                            $scope.image = $scope.items[$scope.indice];
                            $http.get($scope.image.descrizione)
                                            .then(function (res) {

                                                $scope.trustedHtml = $sce.trustAsHtml(res.data);
                                            });
                        };
                    }])
        .controller('MapController', function ($scope, $ionicLoading) {

            $scope.init = function () {

                var myLatlng = new google.maps.LatLng(44.561072, 7.710745);

                var mapOptions = {
                    center: myLatlng,
                    zoom: 8,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById("map"), mapOptions);

                var myLocation = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: "Olocco S.r.l."
                });

//                navigator.geolocation.getCurrentPosition(function (pos) {
//                    map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
//                    var myLocation = new google.maps.Marker({
//                        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
//                        map: map,
//                        title: "My Location"
//                    });
//                });

                $scope.map = map;
            };

        });

