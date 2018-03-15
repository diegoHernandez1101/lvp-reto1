'use strict';
angular.module('lvpBusquedaProductosApp')
  .service('BusquedaService',function ($http, $q, CONFIG) {


    this.recuperarProductos = function(nomProducto) {
      var request = {
        method : "GET",
        headers :   {
          'Content-Type'  :   'application/json;charset=utf-8',

        },
        url     :   CONFIG.CONTEXTO ,
        params: {
          nomProducto      : nomProducto
        }

      }
      return $http(request)
        .success(function(response) {
          return response;
        })
        .error(function(response) {
          return $q.reject(response);
        })

    }

  });
