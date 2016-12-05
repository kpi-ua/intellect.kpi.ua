'use strict';

describe('Controller: ProfileConferenceCtrl', function () {

  // load the controller's module
  beforeEach(module('intellectApp'));

  var ProfileConferenceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileConferenceCtrl = $controller('ProfileConferenceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProfileConferenceCtrl.awesomeThings.length).toBe(3);
  });
});
