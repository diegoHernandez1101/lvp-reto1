'use strict';
angular.module('lvpBusquedaProductosApp')
  .service('BusquedaService',function ($http, $q, CONFIG) {


    this.recuperarProductos = function(s, d3106047a194921c01969dfdec083925) {
      var request = {
        method : "GET",
        headers :   {
          'Content-Type'  :   'application/json;charset=utf-8',

        },
        url     :   CONFIG.CONTEXTO ,
        params: {
          s      : s,
          d3106047a194921c01969dfdec083925      : d3106047a194921c01969dfdec083925
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
