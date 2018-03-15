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

        $httpProvider.interceptors.push('AutorizacionInterceptor');

}
angular
.module('lvpBusquedaProductosApp')
.config(config)
//.run(function($rootScope, $route, AutorizacionService, $location, blockUI, TransicionService){
.run(function($rootScope, $route, $location, blockUI){

    //console.debug($route);
    var detenerFlujo = true;
    $rootScope.showSpinner = true

    $rootScope.$on('$routeChangeStart', function (event, current, previous, rejection) {
        //console.debug("--inicio-routeChangeStart--");
        //console.debug(event);
        //console.debug(current);
        //console.debug(previous);
        //console.debug(rejection);

        var currentOriginalPath = current.originalPath;
        var previousPriginalPath = "";

        if(previous !== undefined){
            previousPriginalPath = previous.originalPath;
        }

        //console.debug(detenerFlujo);

        if(detenerFlujo && currentOriginalPath !== "/index/busqueda" && previousPriginalPath !== "/index/busqueda" && currentOriginalPath !== "/estado/cierre"){

            detenerFlujo = false;
            event.preventDefault();

            //AutorizacionService.recuperarDatosUsuario(currentOriginalPath);

        }else{

            //console.debug("config-actual: " + currentOriginalPath);

            // if(currentOriginalPath === "/index/emision/contratante" || currentOriginalPath === "/index/emision/vehiculo" ||
            //     currentOriginalPath === "/index/cotizacion/coberturas" || currentOriginalPath === "/index/emision/pago"){
            //
            //     var poliza = TransicionService.getPoliza();
            //
            //     if(poliza === undefined || poliza === null){
            //
            //         $location.path("/index/cotizacion");
            //
            //     }
            //
            // }

        }

        //console.debug("--fin-routeChangeStart--");
    });

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous, rejection) {
        //console.debug("--inicio-routeChangeSuccess--");
        //console.debug(event);
        //console.debug(current);
        //console.debug(previous);
        //console.debug(rejection);

        $rootScope.showSpinner = false;

        var currentOriginalPath = current.originalPath;
        var previousPriginalPath = "";

        if(previous !== undefined){
            previousPriginalPath = previous.originalPath;
        }

        // //console.debug($rootScope.usuario);
        // //console.debug(currentOriginalPath);
        // if(currentOriginalPath === '/' && $rootScope.usuario === undefined){
        //
        //     $location.path('/index/busqueda');
        //     blockUI.stop();
        //
        // }else{
        //
        //     var autorizacion;
        //
        //     if($rootScope.usuario !== undefined){
        //
        //         if(currentOriginalPath === "/index/busqueda"){
        //             $location.path('/');
        //         }
        //
        //     }
        //
        //     //console.debug(current.acceso);
        //     if(current.acceso !== undefined){
        //
        //         if(currentOriginalPath !== '/'){
        //
        //             autorizacion = AutorizacionService.autorizar(current.acceso.requiereAutenticacion, current.acceso.requierePermisos);
        //
        //             if(autorizacion === 1){
        //                 $location.path('/');
        //             }else if(autorizacion === 2) {
        //                 $location.path('/estado/403');
        //                 blockUI.stop();
        //             }
        //
        //         }
        //
        //     }
        //
        // }

        //console.debug("--fin-routeChangeSuccess--");
    });

});
