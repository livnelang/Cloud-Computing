app.factory('categoriesFactory', function($http, $q) {
    console.log('factory loaded');
    var url = 'http://localhost:3000/';
    var _prodFactory = {};
    _prodFactory.pictures = {};

    $http.post(url + 'api/picture/picturesByCategory').then( function(response) {
        _prodFactory.items = response.data;
    });



    _prodFactory.getPictures = function() {
        return $http.post(url + 'api/picture/picturesByCategory');
            //return response.data;

    };


    //console.log(_prodFactory.getProducts());
    return _prodFactory;
});