'use strict';

describe('Service: exampleFactory.factory', function () {

  // load the service's module
  beforeEach(module('lvpBusquedaProductosApp'));

  // instantiate service
  var exampleFactory.factory;
  beforeEach(inject(function (_exampleFactory.factory_) {
    exampleFactory.factory = _exampleFactory.factory_;
  }));

  it('should do something', function () {
    expect(!!exampleFactory.factory).toBe(true);
  });

});
