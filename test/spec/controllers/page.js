'use strict';

describe('Controller: PageCtrl', function () {

  // load the controller's module
  beforeEach(module('intellectApp'));

  var PageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PageCtrl = $controller('PageCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PageCtrl.awesomeThings.length).toBe(3);
  });
});
