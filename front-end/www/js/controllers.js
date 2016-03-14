angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {})

//.controller('moodCtrl', function($scope, ArticlesService) {
  //$scope.articles = ArticlesService.query()
  //console.log($scope.articles)
//})

.controller('diaryCtrl', function($scope, $stateParams, $ionicModal, dataStore) {
	dataStore.initDB();
	$scope.entires;

	dataStore.getEverything().then(function(entries) {
				$scope.entires = entries;
	});

	$scope.removeItem = function (entry) {
		dataStore.removeEntry(entry);
  };


  $scope.addEntry = function () {
		$scope.entry = {'positivity': "50"};
		$scope.title = 'Create A Diary Entry';
		$scope.create = true;
		$scope.modal.show();
  };

	$scope.editEntry = function (entry) {
		$scope.entry = entry
		$scope.title = 'Edit A Diary Entry';
		$scope.create = false;
		$scope.modal.show();
  };

	$scope.saveEntry = function (){
		if($scope.create){
			dataStore.insertEntry($scope.entry);
		}
		else{
			dataStore.updateEntry($scope.entry);
		}
		$scope.modal.hide();
	}

	$ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
      $scope.modal = $ionicModal;
	    },
			{
        scope: $scope,
        animation: 'slide-in-up'
			}
	);
})


.controller('publicFeedCtrl', function($scope, PublicFeed) {
	  $scope.articles = PublicFeed.query()
})

.controller('settingsCtrl', function($scope, $stateParams, dataStore) {
  $scope.removeData = function () {
		alert("hello");
		dataStore.dumpAll();
	}
})



.controller('moodCtrl', function($scope, $timeout, $ionicSlideBoxDelegate, Mood) {
    $scope.quotes = Mood.query()

    $scope.mood = [];

    $ionicSlideBoxDelegate.enableSlide(false);


    $scope.init = function () {
      $ionicSlideBoxDelegate.update();
    }
    $scope.lockSlide = function () {
      $ionicSlideBoxDelegate.enableSlide( false );
    }

    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
    }
    $scope.previousSlide = function() {
      $ionicSlideBoxDelegate.previous();
    }
})


/*
.directive('preventDrag', function($ionicGesture, $ionicSlideBoxDelegate) {
  return {
    restrict :  'A',

    link : function(scope, elem, attrs, e) {

      var reportEvent = function (e){

        if  (e.target.tagName.toLowerCase() == 'input'){
          $ionicSlideBoxDelegate.enableSlide(false);
        }
        else{
          $ionicSlideBoxDelegate.enableSlide(true);
        }
      };


      $ionicGesture.on('drag', reportEvent, elem);
    }
  }})
*/


.controller('pubFeedDeetsCtrl', function($scope, $stateParams, Feed) {
  $scope.fed = Feed.get($stateParams.fedId);
})

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
})
