'use strict';

describe('Service: exampleService.service', function () {

  // load the service's module
  beforeEach(module('lvpBusquedaProductosApp'));

  // instantiate service
  var exampleService.service;
  beforeEach(inject(function (_exampleService.service_) {
    exampleService.service = _exampleService.service_;
  }));

  it('should do something', function () {
    expect(!!exampleService.service).toBe(true);
  });

});
