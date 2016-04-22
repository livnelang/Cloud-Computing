app.controller('galleryCtrl',['$scope','$stateParams','categoriesFactory', function ($scope, $stateParams, categoriesFactory) {
    var cat = $stateParams['cat'];
    $scope.pictures = categoriesFactory.pictures[cat];

    $scope.name = "asdasdsa";
    angular.forEach($scope.pictures, function(p) {
        console.log('src: ' + p.src);
    });
}]) ;

