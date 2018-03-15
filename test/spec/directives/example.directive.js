'use strict';

describe('Directive: example.directive', function () {

  // load the directive's module
  beforeEach(module('lvpBusquedaProductosApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<example.directive></example.directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the example.directive directive');
  }));
});
