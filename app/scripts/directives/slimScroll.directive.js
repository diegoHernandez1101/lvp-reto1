'use strict';
/**
 * @ngdoc directive
 * @name lvpBusquedaProductosApp.slimScroll.directive
 * @description
 * # slimScroll.directive
 * directive in the lvpBusquedaProductosApp.
 */
function slimScroll($timeout){
  return {
    restrict: 'A',
    scope: {
      boxHeight: '@'
    },
    link: function(scope,element) {
    $timeout(function(){
      $(element).slimScroll({
        height: scope.boxHeight,
        railOpacity: 0.9
      });
    });
    }
  };
}
angular
.module('lvpBusquedaProductosApp')
.directive('slimScroll', slimScroll);
