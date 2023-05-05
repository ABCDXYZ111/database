const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectID } = require('mongodb');

const app = express();
const uri = 'mongodb+srv://tientran214002:S060490yj@ai.vtabwv4.mongodb.net/?retryWrites=true&w=majority';

app.use(bodyParser.json());
app.use(cors());
const corsOptions = {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.use(cors(corsOptions));


async function connectDB() {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  return client.db('Login_Logout');
}

app.get('/users', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('users')
  const users = await collection.find({name:'John Doe'}).toArray();
  console.log(users)
  res.send(users);
});

app.get('/users/:id', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('users');
  const user = await collection.findOne({ _id: new ObjectID(req.params.id) });
  res.send(user);
});

app.post('/users', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('users');
  const result = await collection.insertOne(req.body);
  res.send(result.ops[0]);
});

app.put('/users/:id', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('users');
  const result = await collection.updateOne(
    { _id: new ObjectID(req.params.id) },
    { $set: req.body }
  );
  res.send(result);
});

app.delete('/users/:id', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('users');
  const result = await collection.deleteOne({ _id: new ObjectID(req.params.id) });
  res.send(result);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
// app.use(cors());
// const corsOptions = {
//     origin: 'http://localhost:3001',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   };
  
//   app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
//   next();
// });

// Rest of your routes
