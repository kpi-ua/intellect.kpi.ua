'use strict';

describe('Directive: record', function () {

  // load the directive's module
  beforeEach(module('intellectApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<record></record>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the record directive');
  }));
});
