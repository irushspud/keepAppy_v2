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



.controller('moodCtrl', function($scope, $ionicSlideBoxDelegate, GetQustions) {

    var date = new Date();
    hours = date.getHours()
    $scope.data = null;

    //question popup times are fixed. 
    if( hours >= 9 && hours <15){
      $scope.data= GetQustions.morning.get();
    }
    else if ( hours >= 21 && hours < 23){
      $scope.data = GetQustions.evening.get();
    }
    
    console.log($scope.data)


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




.controller('NotificationController', function($scope, $cordovaLocalNotification, $ionicPlatform) {
     
    $ionicPlatform.ready(function () {
         
        
         
        $scope.scheduleDelayedNotification = function () {
          var now = new Date().getTime();
          var _10SecondsFromNow = new Date(now + 10 * 1000);
 
          $cordovaLocalNotification.schedule({
            id: 2,
            title: 'Warning',
            text: 'Im so late',
            at: _10SecondsFromNow
          }).then(function (result) {
            console.log('Notification 2 triggered');
          });
        };
   
         
        $scope.updateSingleNotification = function () {
          $cordovaLocalNotification.update({
            id: 2,
            title: 'Warning Update',
            text: 'This is updated text!'
          }).then(function (result) {
            console.log('Notification 1 Updated');
          });
        };  
 
        $scope.cancelSingleNotification = function () {
          $cordovaLocalNotification.cancel(3).then(function (result) {
            console.log('Notification 3 Canceled');
          });
        };      
         
    })})



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
});


