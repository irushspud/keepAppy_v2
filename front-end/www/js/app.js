angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova','Devise', 'chart.js'])

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

// login paths for authenication
  AuthProvider.loginPath('http://localhost:3000/api/v1/users/sign_in.json');
  AuthProvider.registerPath('http://localhost:3000/api/v1/registrations');
	AuthProvider.logoutPath('http://localhost:3000/api/v1/users/sign_out.json');

  $stateProvider

	.state('settings', {
		url: '/settings',
		templateUrl: 'templates/settings.html',
    controller: 'settingsCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
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
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
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

  .state('tabs.prog', {
    url: '/progress',
    views: {
      'tab-prog': {
        templateUrl: 'templates/tab-prog.html',
        controller: 'publicFeedCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
