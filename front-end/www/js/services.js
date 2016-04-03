angular.module('starter.services', ['ngResource'])

.factory('ArticlesService', ['$resource', function($resource){
  return $resource('https://thawing-badlands-37385.herokuapp.com/api/v1/articles', {}, {
    get: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  });
}])


.factory('PublicFeed', ['$resource', function($resource){
  return $resource('https://thawing-badlands-37385.herokuapp.com/api/v1/publicfeeds', {}, {
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  });
}])


.factory('GetQustions', ['$resource', function($resource){
  return {
    morning: $resource('data/morning.json', {}, { get: { method: 'GET', isArray: false }}),
    evening: $resource('data/evening.json', {}, { get: { method: 'GET', isArray: false }}),
    article: $resource('https://thawing-badlands-37385.herokuapp.com/api/v1/articles', {}, { get: { method: 'GET', params: {tag: '@tag'}, isArray: true }}),
    quote: $resource('https://thawing-badlands-37385.herokuapp.com/api/v1/quotes', {}, { get: { method: 'GET', isArray: true }})
  };
}])

// this factory controls the local database service
.factory('dataStore', ['$q', function($q) {

    var database;
    var entries;

    return {
        initDB: initDB,
        insertEntry: insertEntry,
        getEverything: getEverything,
        dumpAll: dumpAll,
        updateEntry: updateEntry,
        removeEntry: removeEntry
    };

    // Setup the local pouch db database.
    function initDB() {
        database = new PouchDB('entries', {
            adapter: 'websql'
        });
    };

    // this function removes all of the items in the database.
    function dumpAll() {
        return $q.when(database.destroy().then(function(response) {
                database = new PouchDB('entries', {
                    adapter: 'websql'
                });
            })
            .catch(function(err) {
                alert("Something Went Wrong :|");
            })
        );
    }

    //add a entry to the database
    function insertEntry(entry) {
        return $q.when(database.post(entry));
    };

    // remove an entry to the database
    function removeEntry(entry) {
        return $q.when(database.remove(entry));
    };

    //update an entry in the database.
    function updateEntry(entry) {
        return $q.when(database.put(entry));
    };

    // returns all the entries contained in the database.
    function getEverything() {

        // check if data is present.
        if (!entries) {
            return $q.when(database.allDocs({
                    include_docs: true
                }))
                .then(function(docs) {
                    entries = docs.rows.map(function(row) {
                        return row.doc;
                    });
                    database.changes({
                            live: true,
                            since: 'now',
                            include_docs: true
                        })
                        .on('change', dbManipulation);

                    return entries;
                });
        } else {
            // resolve the promise and return data.
            return $q.when(entries);
        }
    };

    /* handle the change of a database item appropiately. Help provided from the following article.
    http://gonehybrid.com/how-to-use-pouchdb-sqlite-for-local-storage-in-your-ionic-app/ */

    function dbManipulation(change) {
        var index = findIndex(entries, change.id);
        var entry = entries[index];

        if (change.deleted) {
            if (entry) {
                // do this when a entry is deleted
                entries.splice(index, 1);
            }
        } else {
            if (entry && entry._id === change.id) {
                // do this when an entry is updated
                entries[index] = change.doc;
            } else {
                // do this when an entry is inserted for the first time
                entries.splice(index, 0, change.doc)
            }
        }
    }

    /* out of all the entries find the item which has been
    manipulated */
    function findIndex(array, id) {
        var low = 0;
        var high = array.length;
        var mid;

        while (low < high) {
            mid = (low + high) >>> 1;
            array[mid]._id < id ? low = mid + 1 : high = mid
        }
        return low;
    }
}]);
