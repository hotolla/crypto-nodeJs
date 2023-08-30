const { MongoClient } = require('mongodb');
require('dotenv').config();

const collectionName = 'users';
async function connectToMongoDB (newUser) {
  console.log(newUser);
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    console.log('Connected to MongoDB');

    const collection = MongoClient.db.collection(collectionName);

    const addedMongoUser = {
      username: newUser.name,
      email: newUser.email,
      password: newUser.password,
      confirmPassword: newUser.confirmPassword
    };
    try {
      const result = await collection.insertOne(addedMongoUser);
      console.log('New user added:', result.insertedId);
    } catch (err) {
      console.error('Error inserting document:', err);
    }

    await client.close();
    console.log('Connection to MongoDB closed');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}
async function fetchFromMongoDB (user) {
  try {
    const client = new MongoClient(url);
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const users = await collection.find({email: user.email, password: user.password}).toArray();

    if (users.length > 0) {
      const foundUser = user[0];
      res.json({message: foundUser});
    }
    await client.close();
    console.log('Connection to MongoDB closed');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    res.status(500).send('Something broke!');
  }
}

module.exports = connectToMongoDB;
module.exports = fetchFromMongoDB;
