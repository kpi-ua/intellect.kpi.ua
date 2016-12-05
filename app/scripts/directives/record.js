'use strict';

/**
 * @ngdoc directive
 * @name intellectApp.directive:record
 * @description
 * # record
 */
angular.module('intellectApp')
  .directive('record', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the record directive');
      }
    };
  });
