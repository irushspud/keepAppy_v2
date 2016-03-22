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

  // post object
  $scope.post = {
    title: '',
    content: ''
  }


  // default reset
   $scope.temp = {
    title: '',
    content: ''
  }


  // pushes new post onto the scope to show item
  $scope.save = function(){

    console.log($scope.postTitle)

    $scope.publicFeeds.push({
      title: $scope.post.title,
      content: $scope.post.content
    })

    // make request to api
    PublicFeed.create({
      publicfeed: $scope.post
    }, function(error){
        console.log(error)
    });

    // clean scope for next post
    $scope.post = $scope.temp

    // hide posting view
    $scope.modal.hide();

  }

  $scope.doRefresh = function() {
    $scope.publicFeeds = PublicFeed.query();
    $scope.$broadcast('scroll.refreshComplete');

  };



  $scope.updateEditor = function() {
    var element = document.getElementById("page_content");
    element.style.height = element.scrollHeight + "px";
  };

  $scope.addEntry = function (index) {
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


.controller('moodCtrl', function($scope, $ionicSlideBoxDelegate, $state, $ionicModal, GetQustions) {

    var date = new Date();
    hours = date.getHours()
    $scope.data = null;




    $ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
      $scope.modal = $ionicModal;
      },
      {
        scope: $scope,
        animation: 'slide-in-up'
      }
  );

    






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
      $scope.modal.show();
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
      $scope.articles = GetQustions.article.get();
      console.log($scope.articles);
      $state.go('tabs.article');
      
    }


})


.controller('loginCtrl', function($scope, $state) {

    $scope.login = function() {
      $state.go('tabs.mood');
      console.log('Sign-In', data.username);
    }; 
})


.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
});
