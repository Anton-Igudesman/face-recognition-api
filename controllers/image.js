import knex from 'knex';
import Clarifai from 'clarifai';
let db;

const app = new Clarifai.App({
    apiKey: '11cb709cd82144048dd1063517bd22c5'
  });

const handleAPICall = (req, res) => {
   app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input) 
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'))
}

db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'face-recognition'
    }
  });

const handleImage = db => (req, res) => {
    const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries);
  }) 
  .catch(err => res.status(400).json('Cannot find entry'))
}

export {handleAPICall, handleImage}



