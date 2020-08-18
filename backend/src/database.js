const mongoose = require('mongoose')
const config = require('./config')


const URI = `mongodb+srv://${config.username}:${config.password}@cluster0.ra5ze.mongodb.net/${config.dbName}?retryWrites=true&w=majority`

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(db => console.log('Conectado con éxito a MongoAtlas'))
    .catch(err => console.log('No hemos podido conectarnos a MongoAtlas, lo sentimos:', err.message))

