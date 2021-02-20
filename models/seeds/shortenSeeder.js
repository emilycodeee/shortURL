const db = require('../../config/mongoose')
const ShortURL = require('../shorturl')
const dummyshorturl = require('./shorturl.json').results

db.once('open', () => {
  console.log('mongodb connected!')
  ShortURL.create(dummyshorturl)
    .then(() => {
      console.log('insert data done...')
      return db.close()
    })
    .then(() => {
      console.log('done creating recordseeder!')
    })
})