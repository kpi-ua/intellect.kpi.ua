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
      .when('/notfound', {
        templateUrl: 'views/notfound.html',
        controller: 'NotfoundCtrl',
        controllerAs: 'notfound'
      })
      .when('/profile-conference', {
        templateUrl: 'views/profile-conference.html',
        controller: 'ProfileConferenceCtrl',
        controllerAs: 'profileConference'
      })
      .when('/profile-execution', {
        templateUrl: 'views/profile-execution.html',
        controller: 'ProfileExecutionCtrl',
        controllerAs: 'profileExecution'
      })
      .when('/profile-publications', {
        templateUrl: 'views/profile-publications.html',
        controller: 'ProfilePublicationsCtrl',
        controllerAs: 'profilePublications'
      })
      .when('/profile-results', {
        templateUrl: 'views/profile-results.html',
        controller: 'ProfileResultsCtrl',
        controllerAs: 'profileResults'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
