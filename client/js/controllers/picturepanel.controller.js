app.controller('picturePanelCtrl',['$scope','$stateParams','categoriesFactory', function ($scope, $stateParams, categoriesFactory) {
	$scope.picture = categoriesFactory.currentPicture;
    console.dir(categoriesFactory.currentPicture);

}]) ;

