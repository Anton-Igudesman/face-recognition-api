import bcrypt from 'bcrypt-nodejs';
import knex from 'knex';

let db = knex({
  client: 'pg',
  connection: {
    host : 'dpg-ceb2tq5a4996med0knn0-a',
    user : 'facerecognition_me3f_user',
    port: 5432,
    password : 'JKigNqtmHsHZlaUoEFZZiD5UEGEbKXhn',
    database : 'facerecognition_me3f'
  }
});

  const handleRegister = (db, bcrypt) => (req, res) => {
    const { email, name, password} = req.body;
    if (!email || !name || !password) {
      return res.status(400).json('incorrect form submission')
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
            })
        .then(user => {
            res.json(user[0]);
            })  
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('Unable to register'))
}

export default handleRegister