app.controller('galleryCtrl',['$scope','$stateParams','$location', 'categoriesFactory', function ($scope, $stateParams,$location, categoriesFactory) {
    var cat = $stateParams['cat'];
    $scope.pictures = categoriesFactory.pictures[cat];

    /**
    * when user has clicked single image,
    * he should be redirected to picturePanel Page
    */
    $scope.editPicture = function(picture) {
    	// console.dir(picture);
    	categoriesFactory.currentPicture = picture;
    	$location.path("picturePanel");
    }

}]) ;

