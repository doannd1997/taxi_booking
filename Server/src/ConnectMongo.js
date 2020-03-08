const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:12017';
 
// Database Name
const dbName = 'projectDB';
 
// insert method
const insertDocuments = function(db, collectionName, callback) {
    // Get the documents collection
    const collection = db.collection(collectionName);
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  };

const queryDocument= (db, collectionName, callback)=>  {
	const collection = db.collection(collectionName);
	collection.find({}, (err, result)=>{
		console.log();
		callback(result);
	})
}

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName, { useUnifiedTopology: true });
 /*
  insertDocuments(db, "dataName", (result)=>{
		console.log(result);
		queryDocument(db, "dataName", ()=>{
			console.log("query success " + result);
		})
	})

*/
	queryDocument(db, "tableName", ()=>{console.log()})
  client.close();
});



  