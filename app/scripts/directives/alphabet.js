'use strict';

/**
 * @ngdoc directive
 * @name intellectApp.directive:alphabet
 * @description
 * # alphabet
 */
angular.module('intellectApp')
  .directive('alphabet', function () {
    return {
      templateUrl: 'views/alphabet.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        scope.alphabet = ("А Б В Г Д Е Є Ж З И І Ї Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ю Я").split(" ");
        scope.selectedLetter = '';

      }
    };
  });
