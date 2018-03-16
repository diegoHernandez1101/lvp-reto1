'use strict';
//function BusquedaCtrl($scope,$filter,blockUI,CatalogosService,BusquedaService,CotizacionService,TransicionService,$location,NotificacionService,$uibModal, $rootScope, $route) {
function BusquedaCtrl($scope,$filter,blockUI,BusquedaService,NotificacionService,$location,$uibModal, $rootScope, $route) {

  $scope.s = null;

        $scope.definirModelo = function (){
          $scope.idModelo = $scope.split($scope.modelo.valor, 1);
      };

      $scope.recuperarProductos = function(){
        if ($('#formBusqueda').smkValidate('') && $('#formBusquedaResp').smkValidate('')) {
          $.smkRemoveError($("input"));
          $scope.nomLocalProducto = null;


          if($scope.s != null){
            $scope.nomLocalProducto = ($scope.s);
            $scope.nomDummy = ("json");
          }


          blockUI.start("Recuperando");

          BusquedaService.recuperarProductos($scope.nomLocalProducto, $scope.nomDummy).then(function(success){

              $scope.productos = success.data;

              //$scope.iniciaTablaEntidades();

              blockUI.stop();

            }, function(error){

              blockUI.stop();

              if(error.status === -1 || error.status === 12029 || error.status === 0){
                NotificacionService.modalError("Error al ejecutar la acción", "El servicio no se encuentra disponible. Por favor, intentar más tarde.");
              }else if(error.status != 401 && error.status != 403) {
                //NotificacionService.modalError("Error al ejecutar la acción | " + error.status, error.data.mensaje);
                NotificacionService.modalInformacion("Recuperar", error.data.mensaje);
              }

            });

        }
      };

}

  angular
  .module('lvpBusquedaProductosApp')
  .controller('BusquedaCtrl', BusquedaCtrl);
