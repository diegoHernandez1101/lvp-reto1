'use strict';
angular.module('lvpBusquedaProductosApp')
.service('AutorizacionInterceptor', function ($rootScope, $cookieStore, $location, $q, blockUI) {

    return {

        request: function (config) {
            return config;
        },
        responseError: function (response) {

            if (response.status == 401) {

                $cookieStore.remove("JSESSIONID");
                $cookieStore.remove("CSRF-TOKEN");
                delete $rootScope.usuario;

                blockUI.stop();
                $location.path("/login");

            }else if (response.status == 403) {

                $location.path("/estado/403");
                blockUI.stop();

            }

            return $q.reject(response);

        }

    };

});
