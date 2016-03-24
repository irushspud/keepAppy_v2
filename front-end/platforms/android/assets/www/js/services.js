angular.module('starter.services', ['ngResource'])

.factory('ArticlesService', ['$resource', function($resource){
  return $resource('https://aqueous-hamlet-97427.herokuapp.com/api/v1/articles', {}, {
    get: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  });
}])

.factory('Mood Evening', ['$resource', function($resource){
 return $resource('http://localhost:8100/data/evening.json', {}, {
   query: { method: 'GET', isArray: false },
   create: { method: 'POST' }
 });
}])

.factory('Mood Morning', ['$resource', function($resource){
 return $resource('http://localhost:8100/data/morning.json', {}, {
   query: { method: 'GET', isArray: false },
   create: { method: 'POST' }
 });
}])

.factory('PublicFeed', ['$resource', function($resource){
  return $resource('https://aqueous-hamlet-97427.herokuapp.com/api/v1/quotes', {}, {
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  });
}])


.factory('GetQustions', ['$resource', function($resource){
  return {
    morning: $resource('data/morning.json', {}, { get: { method: 'GET', isArray: false }}),
    evening: $resource('data/evening.json', {}, { get: { method: 'GET', isArray: false }}),
    article: $resource('https://aqueous-hamlet-97427.herokuapp.com/api/v1/articles', {}, { get: { method: 'GET', isArray: true }})
  };
}])


.factory('dataStore', ['$q', function($q) {

    var database;
    var entries;

    return  {
        initDB: initDB,
        insertEntry: insertEntry,
        getEverything: getEverything,
        dumpAll: dumpAll,
        updateEntry: updateEntry,
        removeEntry: removeEntry
    };

    function initDB() {
        database = new PouchDB('entries', {adapter : 'websql'});
    };

    function dumpAll(){
      return $q.when(database.destroy().then(function (response) {
            database = new PouchDB('entries', {adapter : 'websql'});
        })
        .catch(function (err) {
            alert("Something Went Wrong :|");
        })
      );
    }

    function insertEntry(entry) {
        return $q.when(database.post(entry));
    };

    function removeEntry(entry) {
        return $q.when(database.remove(entry));
    };

    function updateEntry(entry) {
        return $q.when(database.put(entry));
    };

    function getEverything() {

      if (!entries) {
          return $q.when(database.allDocs({ include_docs: true}))
                    .then(function(docs) {
                      entries = docs.rows.map(function(row) {
                          return row.doc;
                      });
                      database.changes({ live: true, since: 'now', include_docs: true})
                         .on('change', onDatabaseChange);

                     return entries;
                   });
      } else {
          return $q.when(entries);
      }
    };

    function onDatabaseChange(change) {
            var index = findIndex(entries, change.id);
            var entry = entries[index];

            if (change.deleted) {
                if (entry) {
                    entries.splice(index, 1); // delete
                }
            } else {
                if (entry && entry._id === change.id) {
                    entries[index] = change.doc; // update
                } else {
                    entries.splice(index, 0, change.doc) // insert
                }
            }
        }

        function findIndex(array, id) {
          var low = 0, high = array.length, mid;
          while (low < high) {
            mid = (low + high) >>> 1;
            array[mid]._id < id ? low = mid + 1 : high = mid
          }
          return low;
        }
}]);
