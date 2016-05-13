app.factory('categoriesFactory', function($http, $q) {
    console.log('factory loaded');
    var url = 'http://localhost:3000/';
    var _prodFactory = {};
    _prodFactory.pictures = {};

    $http.post(url + 'api/picture/picturesByCategory').then( function(response) {
        _prodFactory.items = response.data;
    });


    /**
    * Get All pictures from API divided by their categories
    */
    _prodFactory.getPictures = function() {
        return $http.post(url + 'api/picture/picturesByCategory');
    };

    /**
    * Sets the current editable picturem for picturePanel UI Page
    */
    _prodFactory.setEditPicture = function() {
        return $http.post(url + 'api/picture/picturesByCategory');
    };


    return _prodFactory;
});