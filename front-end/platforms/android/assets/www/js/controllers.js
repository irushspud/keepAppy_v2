angular.module('starter.controllers', ['ionic', 'ngCordova'])

.controller('AppCtrl', function($scope) {
})


//This controller is responsible for looking after the diary tab within the application
.controller('diaryCtrl', function($scope, $stateParams, $ionicModal, dataStore) {

	$scope.updateEditor = function() {
    var element = document.getElementById("page_content");
    element.style.height = element.scrollHeight + "px";
	};

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

.controller('settingsCtrl', function($scope, $stateParams, dataStore) {
	  $scope.removeData = function () {
	    // dataStore.dumpAll();
			console.log($scope.entries)
			$scope.entries = {};
	  }
})


.controller('publicFeedCtrl', function($scope, $stateParams, $ionicModal, PublicFeed) {

  $scope.publicFeeds = PublicFeed.query();
  console.log($scope.publicFeeds);


  $scope.updateEditor = function() {
    var element = document.getElementById("page_content");
    element.style.height = element.scrollHeight + "px";
  };

  $scope.addEntry = function () {
    $scope.modal.show();
  };

  $ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
      $scope.modal = $ionicModal;
      },
      {
        scope: $scope,
        animation: 'slide-in-up'
      }
  );
})


.controller('moodCtrl', function($scope, $ionicSlideBoxDelegate, $state, GetQustions) {

    var date = new Date();
    hours = date.getHours()
    $scope.data = null;

    //question popup times are fixed.
    if( hours >= 0 && hours <12){
      $scope.data= GetQustions.morning.get();
    }
    else if ( hours >= 12 && hours <= 23){
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

    $scope.showArticle = function() {
      $scope.article = GetQustions.article.get();

      $state.go('tabs.article');
      console.log($scope.article);
    }


})


.controller('loginCtrl', function($scope, $state) {

    $scope.login = function(user) {
      console.log('Sign-In', user);
      $state.go('tabs.mood');
    };
})



// .controller('NotificationController', function($scope, $cordovaLocalNotification) {
//
//     $scope.add = function() {
//         var alarmTime = new Date();
//         alarmTime.setMinutes(alarmTime.getMinutes() + 1);
//         $cordovaLocalNotification.add({
//             id: "1234",
//             date: alarmTime,
//             message: "This is a message",
//             title: "This is a title",
//             autoCancel: true,
//             sound: null
//         }).then(function () {
//             console.log("The notification has been set");
//         });
//     };
//
//     $scope.isScheduled = function() {
//         $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
//             alert("Notification 1234 Scheduled: " + isScheduled);
//         });
//     }
//
//     $scope.scheduleInstantNotification = function () {
//       $cordovaLocalNotification.schedule({
//       id: 1,
//       text: 'Instant Notification',
//       title: 'Instant'
//     }).then(function () {
//       alert("Instant Notification set");
//     });
//   };
//
// })
/*
      *** NEEDS PERMISSIONS FOR iOS ***
      $ionicPlatform.ready(function() {
    if(device.platform === "iOS") {
        window.plugin.notification.local.promptForPermission();
    }
});
*/






.controller('pubFeedDeetsCtrl', function($scope, $stateParams, Feed) {
  $scope.fed = Feed.get($stateParams.fedId);
})

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
});
