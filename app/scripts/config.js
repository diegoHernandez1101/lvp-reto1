'use strict';
function config ($routeProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;
    // Tough luck: the default cookie-to-header mechanism is not working for cross-origin requests!
    $httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN'; // The name of the cookie sent by the server
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN'; // The default header name picked up by Spring Security

    $routeProvider
        .when('/index/busqueda', {
            templateUrl: 'views/productos/busquedaProductos.html',
            controller : 'BusquedaCtrl'
        })
        .when('/', {
            templateUrl: 'views/cotizacion/busquedaProductos.html'
        })

}
angular
.module('lvpBusquedaProductosApp')
.config(config)
//.run(function($rootScope, $route, AutorizacionService, $location, blockUI, TransicionService){
.run(function($rootScope, $route, $location, blockUI){

    //console.debug($route);

});
