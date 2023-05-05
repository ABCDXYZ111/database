const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://tientran214002:S060490yj@ai.vtabwv4.mongodb.net/?retryWrites=true&w=majority';

async function connectDB() {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    return client.db('Login_Logout');
  }
  
  async function createDocument() {
    const db = await connectDB();
    const collection = db.collection('users');
    const newDocument = { name: 'John Doe', email: 'john@example.com' };
    const result = await collection.insertOne(newDocument);
    console.log('1 document inserted');
    return result;
  }
  async function readDocuments() {
    const db = await connectDB();
    const collection = db.collection('users');
    const result = await collection.find({}).toArray();
    console.log(result);
    return result;
  }
  
  async function updateDocument() {
    const db = await connectDB();
    const collection = db.collection('users');
    const query = { name: 'John Doe' };
    const update = { $set: { email: 'newemail@example.com' } };
    const result = await collection.updateOne(query, update);
    console.log('1 document updated');
    return result;
  }
  
  async function deleteDocument() {
    const db = await connectDB();
    const collection = db.collection('users');
    const query = { name: 'John Doe' };
    const result = await collection.deleteOne(query);
    console.log('1 document deleted');
    return result;
  }
  


  async function run() {
    try {
    //   await createDocument();
    //   await readDocuments();
      await updateDocument();
    //   await deleteDocument();
    } catch (error) {
      console.error(error);
    } finally {
      const db = await connectDB();
      db.close();
    }
  }
  
  run();