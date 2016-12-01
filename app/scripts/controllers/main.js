'use strict';

/**
 * @ngdoc function
 * @name intellectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the intellectApp
 */
angular.module('intellectApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.content = '';
    $scope.slides = [];

    function init() {
      var url = '/static/2016-02-23.html';

      $http.get(url).then(function (response) {
        $scope.content = response.data;
      });

      $scope.slides = [
        {img : '/static/slides/b1.jpg', id: 1},
        {img : '/static/slides/b2.jpg', id: 2},
        {img : '/static/slides/b3.jpg', id: 3},
        {img : '/static/slides/b4.jpg', id: 4},
        {img : '/static/slides/b5.jpg', id: 5}
      ];
    }

    init();

  });
