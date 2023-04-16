// Import the required modules
const { MongoClient } = require('mongoose');

// Connection URL and database name
const url = 'mongodb://localhost:27017'; // Replace with your MongoDB server URL
const dbName = 'Fotoflask'; // Replace with your database name

// Create a new MongoClient instance
const client = new MongoClient(url, { useNewUrlParser: true });

// Connect to the MongoDB server
client.connect((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB successfully!');

  // Access the database
  const db = client.db(dbName);

  // Perform CRUD operations on the database
  // Example: Insert a document into a collection
  const collection = db.collection('users'); // Replace with your collection name
  const document = { name: 'John', age: 30, city: 'New York' };
  collection.insertOne(document, (err, result) => {
    if (err) {
      console.error('Failed to insert document:', err);
      client.close();
      return;
    }
    console.log('Document inserted successfully:', result.ops[0]);
    client.close();
  });
});
