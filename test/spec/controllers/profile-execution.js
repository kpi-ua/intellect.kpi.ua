'use strict';

describe('Controller: ProfileExecutionCtrl', function () {

  // load the controller's module
  beforeEach(module('intellectApp'));

  var ProfileExecutionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileExecutionCtrl = $controller('ProfileExecutionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProfileExecutionCtrl.awesomeThings.length).toBe(3);
  });
});
