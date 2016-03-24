angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    database = new PouchDB('entries', {adapter : 'websql'});
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

	.state('settings', {
		url: '/settings',
		templateUrl: 'templates/settings.html',
    controller: 'settingsCtrl'
  })


  .state('tabs', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'AppCtrl'
  })

  .state('tabs.mood', {
    url: '/mood',
    views: {
      'tab-mood': {
        templateUrl: 'templates/tab-mood.html',
        controller: 'moodCtrl'
      }
    }
  })
  .state('tabs.login', {
    url: '/login',
    views: {
      'tab-mood': {
        templateUrl: 'templates/login-registration.html',
        controller: 'loginCtrl'
      }
    }
  })
  .state('tabs.article', {
    url: '/article',
    views: {
      'tab-mood': {
        templateUrl: 'templates/article.html',
        controller: 'moodCtrl'
      }
    }
  })

  .state('tabs.diary', {
      url: '/diary',
      views: {
        'tab-diary': {
          templateUrl: 'templates/tab-diary.html',
          controller: 'diaryCtrl'
        }
      }
    })
    .state('tabs.fed-detail', {
      url: '/feed/:fedId',
      views: {
        'tab-publicFeed': {
          templateUrl: 'templates/feed-detail.html',
          controller: 'fedDetailCtrl'
        }
      }
    })

  .state('tabs.publicFeed', {
    url: '/publicFeed',
    views: {
      'tab-publicFeed': {
        templateUrl: 'templates/tab-publicFeed.html',
        controller: 'publicFeedCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

});
