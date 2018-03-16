'use strict';
angular.module('lvpBusquedaProductosApp')
.controller('NotificacionCtrl', function($scope, $uibModalInstance, items){

    $scope.titulo = items.titulo;
    $scope.mensaje = items.mensaje;
    $scope.fhCierre = items.fhCierre;
    $scope.fhOperacionNorm = items.fhOperacionNorm;
    $scope.mesActual = items.mesActual;

    $scope.cerrar = function () {
        $uibModalInstance.close();
    };
    $scope.aceptar = function () {
        $uibModalInstance.close();
    };
    $scope.cancelar = function () {
        $uibModalInstance.close();
    };

});
