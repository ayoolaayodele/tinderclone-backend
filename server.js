import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors'
// App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  'mongodb+srv://pecker:pecker123@cluster0.apf1s.mongodb.net/<dbname>?retryWrites=true&w=majority';

// Middlewares
app.use(express.json());
app.use(Cors())



const connectDB =  async () => {
  try {
    await mongoose.connect(
      connection_url,  {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true
        })
      console.log('MongoDB Connected')
    
  } catch (err) {
    console.error(err.message)
    // Exit process with failure
    process.exit(1)
  }
}

//ConnectDB
connectDB()



// API Endpoints
app.get('/', (req, res) => res.status(200).send('Hello Dude'));

app.post('/tinder/cards', (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get('/tinder/cards', (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listener
app.listen(port, () => console.log(`Listening on localhost. ${port}`));