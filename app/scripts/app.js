'use strict';

/**
 * @ngdoc overview
 * @name lvpBusquedaProductosApp
 * @description
 * # lvpBusquedaProductosApp
 *
 * Main module of the application.
 */
angular.module('lvpBusquedaProductosApp', [
                                        'ngAnimate',
                                        'ngCookies',
                                        'ngResource',
                                        'ngRoute',
                                        'ngSanitize',
                                        'ngTouch',
                                        'ui.bootstrap',
                                        'blockUI',
                                        'summernote'
])
.constant('CONFIG',{
                        //CONTEXTO          :   "http://localhost:8084/lvp-productos-services/",
                        //FRONT             :   "http://localhost:9001/buscador-productos/"
                        CONTEXTO          :   "http://www.liverpool.com.mx/tienda",
                        //FRONT             :   "http://localhost:9001/buscador-productos/"
});
