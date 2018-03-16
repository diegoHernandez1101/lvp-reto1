'use strict';
angular.module('lvpBusquedaProductosApp')
.service('NotificacionService',function ($uibModal, $sce) {

    this.modalError = function(titulo, mensaje){

        var msjError = "Error al ejecutar la acción.";
        var msjTitulo = "Error al ejecutar la acción";

        if(mensaje !== undefined && mensaje !== ""){
            msjError = mensaje;
        }

        if(titulo !== undefined && titulo !== ""){
            msjTitulo = titulo;
        }

        $uibModal.open({
            animation : true,
            templateUrl : "views/notificacion/error.html",
            controller : "NotificacionCtrl",
            resolve : {
                items: function () {
                     return {
                         titulo : titulo,
                         mensaje : $sce.trustAsHtml(mensaje)
                     };
                }
            },
            backdrop    :   'static'
        });

    };


    this.modalInformacion = function(titulo, mensaje){

        $uibModal.open({
            animation : true,
            templateUrl : "views/notificacion/informacion.html",
            controller : "NotificacionCtrl",
            resolve : {
                items: function () {
                     return {
                         titulo : titulo,
                         mensaje : mensaje
                     };
                }
            },
            backdrop    :   'static'
        });
    };
    
});
