app.controller('galleryCtrl',['$scope','categoriesFactory', function ($scope, categoriesFactory) {
 var catgs = ['sports', 'nature','music', 'cartoons'];
 console.log('hi gallery cloud panel ..');
 //$scope.items = categoriesFactory.items;

 categoriesFactory.getPictures().then(function(data)  {
  console.log('data is here');
  $scope.items = data.data;
  $scope.setCategories();
 });


 /**
  * Set Pictures categories
  */
 $scope.setCategories = function() {
  for (var name in catgs) {
    for (var item in $scope.items) {
     if (name == item['_id']) {
       console.log('match');
     }
    }
   }
 }


}]) ;

