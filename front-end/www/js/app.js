angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova','Devise'])

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

.config(function($stateProvider, $urlRouterProvider, AuthProvider) {

// new path
  AuthProvider.loginPath('https://thawing-badlands-37385.herokuapp.com/api/v1/users/sign_in.json');
  AuthProvider.registerPath('https://thawing-badlands-37385.herokuapp.com/api/v1/registrations');

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
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })
  .state('tabs.register', {
    url: '/register',
    views: {
      'tab-mood': {
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
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
