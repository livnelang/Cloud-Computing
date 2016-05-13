var app = angular.module("app", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider)  {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('gallery', {
            url: '/gallery?cat',
            templateUrl: '../views/gallery.html',
            controller: 'galleryCtrl'
        })
        .state('home', {
            url: '/home',
            templateUrl: '../views/home.html',
            controller: ''
        });
});

/**
 * app mainController
 * 1. init first data from aws server
 * 2. set Accurate categories in $rootScope
 * 3. Set default Pictures
 */
app.controller('mainController',['$scope','$location','categoriesFactory','$state', function ($scope,$location, categoriesFactory, $state) {
    $scope.name = "livne";
    var catgs = ['sports', 'nature','music', 'cartoons'];
    console.log('mainController panel ..');

    categoriesFactory.getPictures().then(function(data)  {
        console.log('data is here');
        $scope.data = data.data;
        $scope.setCategories();
    });


    /**
     * Set Pictures categories
     */
    $scope.setCategories = function() {
        angular.forEach(catgs, function(name) {
                angular.forEach($scope.data, function(item) {
                    if (name == item['_id']) {
                        categoriesFactory.pictures[name] = item.items;
                    }
                });
        });
        console.log('setCategories done');
        //set default pictures category for the view
        categoriesFactory.currentPictures = categoriesFactory.pictures['sports'];
    };

    /**
     * When selecting a new category
     */
    $scope.changeCategory = function(cat) {
        console.log('inside changeCategory: ' + cat);
        //TODO
        categoriesFactory.currentPictures = $scope.pictures[cat];
        console.log('current location: ' + $location.path());
        $location.path( "gallery" );
    };


    $scope.toggleMenu = function() {
        $(".main-sidebar").toggleClass("expand");
    }
}]) ;