(function(angular) {
  'use strict';

  angular.module('browserApp', ['ui.router', 'ui.keypress', 'restangular', 'talker', 'toaster', 'xeditable'])
  .value('$anchorScroll', angular.noop)
  .config(function($stateProvider, $urlRouterProvider, RestangularProvider){
    RestangularProvider.setDefaultHttpFields({cache: true});
    $urlRouterProvider
      .when('', '/')
      .otherwise('/');

    $stateProvider
      .state('repositories', {
        url:'/',
        templateUrl: '/assets/js/browser/views/repositories.html'
      })
      .state('repository', {
        url: '/:repository',
        templateUrl: '/assets/js/browser/views/repository.html'
      })
      .state('workspace', {
        url: '/:repository/:workspace{path:(?:/.*)?}',
        templateUrl: '/assets/js/browser/views/workspace.html'
      });
  })
  .config(function($provide) {
    $provide.decorator('$window', ['$delegate', function($delegate) {
      $delegate.requestAnimFrame = (function(){
        return (
            $delegate.requestAnimationFrame       ||
            $delegate.webkitRequestAnimationFrame ||
            $delegate.mozRequestAnimationFrame    ||
            $delegate.oRequestAnimationFrame      ||
            $delegate.msRequestAnimationFrame     ||
            function(/* function */ callback){
              $delegate.setTimeout(callback, 1000 / 60);
            }
        );
      })();
      return $delegate;
    }]);
  })
  .run(['$rootScope', '$log', 'toaster', 'editableOptions', 'mbEventBridge', function($rootScope, $log, toaster, editableOptions) {
    editableOptions.theme = 'bs3';

    $log.before('error', function(message, toast, display) {
      display = display === undefined ? true : display;
      if (display) {
        if (toast) { message = toast; }
        toaster.pop('error', 'An error occured', message);
      }
    });
    $log.before('log', function(message, toast, display) {
      display = display === undefined ? true : display;
      if (display) {
        if (toast) { message = toast; }
        toaster.pop('success', 'Success', message);
      }
    });
    $log.before('info', function(message, toast, display) {
      display = display === undefined ? true : display;
      if (display) {
        if (toast) { message = toast; }
        toaster.pop('note', 'Information', message);
      }
    });
    $log.before('warn', function(message, toast, display) {
      display = display === undefined ? true : display;
      if (display) {
        if (toast) { message = toast; }
        toaster.pop('warning', 'Warning', message, display);
      }
    });

    $log.decorate(function(message) {
      return [message]; // To remove toast in the log
    });
  }]);
})(angular);
