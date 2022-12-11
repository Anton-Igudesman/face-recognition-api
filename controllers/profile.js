import knex from 'knex';

let db;

db = knex({
    client: 'pg',
    connection: {
      host : 'dpg-ceb2tq5a4996med0knn0-a',
      user : 'facerecognition_me3f_user',
      port: 5432,
      password : 'JKigNqtmHsHZlaUoEFZZiD5UEGEbKXhn',
      database : 'facerecognition_me3f'
    }
  });

const handleGetProfile = (db) => (req, res) => {
    const { id } = req.params;
    
    db.select('*').from('users').where({id})
    .then(user => {
        if (user.length) {
         res.json(user[0]) 
        } else {
           res.status(400).json('error getting user')
        }
       
    })
    .catch(err => res.status(400).json('Not Found')) 
    
}

export default handleGetProfile;