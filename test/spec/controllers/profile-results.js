'use strict';

describe('Controller: ProfileResultsCtrl', function () {

  // load the controller's module
  beforeEach(module('intellectApp'));

  var ProfileResultsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileResultsCtrl = $controller('ProfileResultsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProfileResultsCtrl.awesomeThings.length).toBe(3);
  });
});
