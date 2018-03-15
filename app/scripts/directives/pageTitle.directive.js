'use strict';
/**
 * @ngdoc directive
 * @name lvpBusquedaProductosApp.pageTitle.directive
 * @description
 * # pageTitle.directive
 * directive in the lvpBusquedaProductosApp.
 */

function pageTitle() {
  return {
    template: '<title></title>',
    restrict: 'A',
    link: function (scope, element) {
      var title = 'Liverpool | Búsqueda productos';
      element.text(title);
    }
  };
}
angular
    .module('lvpBusquedaProductosApp')
    .directive('pageTitle', pageTitle);
