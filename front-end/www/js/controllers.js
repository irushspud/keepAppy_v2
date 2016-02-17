angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {})

.controller('moodCtrl', function($scope) {})

.controller('diaryCtrl', function($scope, $stateParams) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
	$scope.settings = {
    enableFriends: true
  };

})


.controller('publicFeedCtrl', function($scope, Feed) {
	  $scope.feed = Feed.all();
  $scope.remove = function(fed) {
    Feed.remove(fed);
  };  


})

.controller('pubFeedDeetsCtrl', function($scope, $stateParams, Feed) {
  $scope.fed = Feed.get($stateParams.fedId);
})

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
})
