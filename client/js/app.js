var app = angular.module("app", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider)  {

    $urlRouterProvider.otherwise("/gallery");

    $stateProvider
        //.state('locations', {
        //    url: '/?cat',
        //    templateUrl: 'templates/locations-list.html',
        //    controller: 'locationsController',
        //})

        .state('gallery', {
            url: '/gallery',
            templateUrl: '../views/gallery.html',
            controller: 'galleryCtrl',
        })

});