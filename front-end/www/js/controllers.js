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

    if($scope.post.title == '') {
      alert("Please enter a valid title");
    }
    else if($scope.post.content == '') {
      alert("Please enter valid content");
    }
    else {

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


.controller('moodCtrl', function($scope, $ionicSlideBoxDelegate, $state, $ionicModal, $http, GetQustions) {

    var date = new Date();
    hours = date.getHours()
    $scope.data = null;


		//example of getting array and running a query against it
		$scope.result = ["strange","cool","art"];
    $scope.tagsTemp = $scope.result.toString();


    // *** Get all articles with the 'cool' tag
    $scope.articles = GetQustions.article.get({tag: $scope.tagsTemp});


    $scope.quotes = GetQustions.quote.get();

    //console.log($scope.articles);
    console.log($scope.quotes);

    $scope.values = [];
    $scope.tags = [];


    //question popup times are fixed.
    if( hours >= 0 && hours <12){
      //$scope.data= GetQustions.morning.get();
      $http.get('data/morning.json').success(function(data) {
        $scope.data = data;
        //console.log($scope.data.questions[0].tags[0])
      });
    }
    else if ( hours >= 12 && hours <= 23){
      //$scope.data = GetQustions.evening.get();
      $http.get('data/evening.json').success(function(data) {
        $scope.data = data;
        //console.log($scope.data.questions[0].tags[0])
      });
    }

    console.log($scope.data);


    $scope.init = function () {
      $ionicSlideBoxDelegate.$getByHandle('questionSlideBox').update();
      //console.log("$scope.init");
      $scope.modal.show();
      $ionicSlideBoxDelegate.$getByHandle('questionSlideBox').enableSlide(false);
    }
    $scope.initArt = function () {
      $ionicSlideBoxDelegate.$getByHandle('articleSlideBox').update();
      $ionicSlideBoxDelegate.$getByHandle('articleSlideBox').enableSlide(true);
    }
    $scope.initQuo = function () {
      $ionicSlideBoxDelegate.$getByHandle('articleSlideBox').update();
      $ionicSlideBoxDelegate.$getByHandle('articleSlideBox').enableSlide(true);
    }

    $scope.lockSlide = function () {
      $ionicSlideBoxDelegate.$getByHandle('questionSlideBox').enableSlide( false );
    }

    $scope.nextSlide = function() {

      var currentQuestion = $ionicSlideBoxDelegate.$getByHandle('questionSlideBox').currentIndex();
      var sliderValueIndex = Math.floor($scope.data.mood / 10);

      //push the corresponding tag into the array
      $scope.tags.push($scope.data.questions[currentQuestion].tags[sliderValueIndex]);

      //reset the next slider value
      $scope.data.mood = 50;


      //Close the questions dialog after the last slide
      if($ionicSlideBoxDelegate.$getByHandle('questionSlideBox').currentIndex() == $ionicSlideBoxDelegate.$getByHandle('questionSlideBox').slidesCount() - 1) {
        $scope.modal.hide();
        console.log($scope.tags);
      }


      $ionicSlideBoxDelegate.$getByHandle('questionSlideBox').next();
    }
    $scope.previousSlide = function() {
      $ionicSlideBoxDelegate.$getByHandle('questionSlideBox').previous();
    }
/*
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
*/

    $ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
      $scope.modal = $ionicModal;
      $scope.modal.show();
      },
      {
        scope: $scope,
        animation: 'slide-in-up'
      }
  );

})

.controller('loginCtrl', function($scope, $state, $stateParams, Auth) {
		  $scope.login = function(){
				var credentials = {
            email: 'a@a.com',
            password: 'password1'
        };
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };

				Auth.login(credentials, config).then(function(user) {
	            console.log(user); // => {id: 1, ect: '...'}
	        }, function(error) {
	            console.log("you failed to login")
	        });

			}
})

.controller('registerCtrl', function($scope, $state, $stateParams) {

    $scope.login = null;

    $scope.register = function() {
      console.log("username:", $scope.register.username);
      console.log("password:", $scope.register.password1);
      console.log("password:", $scope.register.password2);

      if($scope.register.username === undefined) {
        alert("Please enter a username");
      }
      else if($scope.register.password1 === undefined || $scope.register.password2 === undefined) {
        alert("Please enter a password in both fields");
      }
      else if($scope.register.password1 != $scope.register.password2) {
        alert("Password mismatch! Please re-enter your password")
      }
      else {
        console.log("Registered!")
        $scope.register.username = '';
        $scope.register.password1 = '';
        $scope.register.password2 = '';
        $state.go('tabs.mood');
      }

    };
})


.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
});
