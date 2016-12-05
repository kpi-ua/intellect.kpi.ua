'use strict';

describe('Controller: ProfilePublicationsCtrl', function () {

  // load the controller's module
  beforeEach(module('intellectApp'));

  var ProfilePublicationsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfilePublicationsCtrl = $controller('ProfilePublicationsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProfilePublicationsCtrl.awesomeThings.length).toBe(3);
  });
});
