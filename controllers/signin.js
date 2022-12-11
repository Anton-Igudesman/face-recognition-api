import bcrypt from 'bcrypt-nodejs';
import knex from 'knex';

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

const handleSignIn = (db, bcrypt) => (req, res) => {
    const { email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission')
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

export default handleSignIn