'use strict';

/**
 * @ngdoc overview
 * @name intellectApp
 * @description
 * # intellectApp
 *
 * Main module of the application.
 */
angular
  .module('intellectApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-carousel'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/page/about', {
        templateUrl: 'views/about.html',
        controller: 'PageCtrl',
        controllerAs: 'about'
      })
      .when('/page/contacts', {
        templateUrl: 'views/contacts.html',
        controller: 'PageCtrl',
        controllerAs: 'page'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
