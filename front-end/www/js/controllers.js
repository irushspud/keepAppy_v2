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

    $scope.articles = GetQustions.article.get();
    $scope.quotes = GetQustions.quote.get();

    $scope.values = [];
    $scope.tags = [];


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

    $ionicSlideBoxDelegate.enableSlide(false);


    $scope.init = function () {
      $ionicSlideBoxDelegate.update();
      console.log("$scope.init");
      $scope.modal.show();
    }
    $scope.lockSlide = function () {
      $ionicSlideBoxDelegate.enableSlide( false );
    }

    $scope.nextSlide = function() {

      //push the slider value into an array
      $scope.values.push($scope.data.mood);

      //reset the next slider value
      $scope.data.mood = 50;


      // *** Needs to be changed to show all questions dynamically ***
      if($ionicSlideBoxDelegate.currentIndex() == 3) {
        $scope.modal.hide();
        $scope.getTags();
      }

      $ionicSlideBoxDelegate.next();
    }
    $scope.previousSlide = function() {
      $ionicSlideBoxDelegate.previous();
    }

    $scope.getTags = function() {

      //iterate though the slider values and match them with tags
      for(var i = 0; i < $scope.values.length; i++) {
        switch (Math.floor($scope.values[i] / 10)) {
          case 0:
            $scope.tags.push('a');
            break;

          case 2:
            $scope.tags.push('b');
            break;

          case 3:
            $scope.tags.push('c');
            break;

          case 4:
            $scope.tags.push('d');
            break;

          case 5:
            $scope.tags.push('e');
            break;

          case 6:
            $scope.tags.push('f');
            break;

          case 7:
            $scope.tags.push('g');
            break;

          case 8:
            $scope.tags.push('h');
            break;

          case 9:
            $scope.tags.push('i');
            break;

          case 10:
            $scope.tags.push('j');
            break;

          default:
            //debuging code
            console.log("Default");
            console.log(Math.floor($scope.values[i] / 10));
        }
      }
      console.log($scope.tags);
    }

})


.controller('loginCtrl', function($scope, $state, $stateParams) {

    $scope.login = null;
    
    $scope.login = function() {
      console.log("username", $scope.login.username);
      console.log("password", $scope.login.password);
      $state.go('tabs.mood');
    }; 
})


.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
});
