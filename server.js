import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controllers/register.js'
import handleSignIn from './controllers/signin.js'
import handleGetProfile from './controllers/profile.js'
import {handleImage, handleAPICall} from './controllers/image.js'


let db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      port: 5432,
      password : 'test',
      database : 'face-recognition'
    }
  });

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users)
})

//signin
app.post('/signin', handleSignIn(db, bcrypt))

//register
app.post('/register', handleRegister(db, bcrypt))

//profile
app.get('/profile/:id', handleGetProfile(db))

//increasing entries count
app.put('/image', handleImage(db))

app.post('/imageurl', handleAPICall)

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})



