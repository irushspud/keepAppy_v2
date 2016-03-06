angular.module('starter.services', ['ngResource'])

.factory('ArticlesService', ['$resource', function($resource){
  return $resource('https://stormy-retreat-84839.herokuapp.com/api/v1/articles', {}, {
    query: { method: 'GET', isArray: false },
    create: { method: 'POST' }
  });
}])

.factory('PublicFeed', ['$resource', function($resource){
  return $resource('https://stormy-retreat-84839.herokuapp.com/api/v1/articles', {}, {
    query: { method: 'GET', isArray: false },
    create: { method: 'POST' }
  });
}])

.factory('Mood', ['$resource', function($resource){
  return $resource('https://stormy-retreat-84839.herokuapp.com/api/v1/quotes', {}, {
    query: { method: 'GET', isArray: false },
    create: { method: 'POST' }
  });
}])

.factory('DiaryStore', ['$q', function($q) {

    var db;
    return  {
        initDB: initDB,
        insertEntry: insertEntry
    };

    function initDB() {
        // Creates the database or opens if it already exists
        db = new PouchDB('dbname', {adapter : 'websql'});
    };

    function insertEntry(entry) {
        return $q.when(db.post(entry));
    };

    db.changes().on('change', function() {
      console.log('Ch-Ch-Changes');
    });

}]);
