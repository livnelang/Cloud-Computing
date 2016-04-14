/******************************
 *
 * Header
 *
 ******************************/
app.directive('adminHeader',function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/admin-header.html',
    };
});


/******************************
 *
 * Sidebar
 *
 ******************************/
app.directive('gallerySidebar',function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/gallery-sidebar.html',
        compile: function(tElem,attrs) {
            return function(scope,elem,attrs) {

            };
        }
    };
});

/******************************
 *
 * Content
 *
 ******************************/
app.directive('adminContent',function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/admin-content.html',
        compile: function(tElem,attrs) {
            return function(scope,elem,attrs) {

            };
        }
    };
});

/******************************
 *
 * Footer
 *
 ******************************/
app.directive('adminFooter',function(){
    return {
        restrict: 'E',
        replace: true,
        scope:{
            courses :'=',
        },
        templateUrl: 'templates/admin-footer.html',
        compile: function(tElem,attrs) {
            return function(scope,elem,attrs) {

            };
        }
    };
});