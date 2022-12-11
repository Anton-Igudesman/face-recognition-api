import knex from 'knex';

let db;

db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      port: 5432,
      password : 'test',
      database : 'face-recognition'
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