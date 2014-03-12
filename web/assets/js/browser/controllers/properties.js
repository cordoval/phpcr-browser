(function(angular, app) {
  'use strict';

  app.controller('mbPropertiesCtrl', ['$scope', '$log', 'mbRouteParametersConverter',
    function($scope, $log, mbRouteParametersConverter) {

      mbRouteParametersConverter.getCurrentNode().then(function(node) {
        $scope.currentNode = node;
      }, function(err) {
        $log.error(err);
      });
    }]);
})(angular, angular.module('browserApp'));
