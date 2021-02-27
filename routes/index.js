
const express = require('express')
const router = express.Router()
const ShortURL = require('../models/shorturl')
const shortenGenerator = require('../shortenGenerator')


//home page 
router.get('/', (req, res) => {
  res.render('index')
})

// redirect 
router.get('/:shorten', (req, res) => {
  const shortenName = req.params.shorten
  ShortURL.find({ shorten: shortenName })
    .lean()
    .then((relink) => {
      if (relink) {
        res.status(301).redirect(relink[0].originUrl)
      }
    })
    .catch(() => { res.sendStatus(404) })
})


// generate shorten url - variable
const localhost = 'http://localhost:3000/'
const herokulink = 'https://intense-beyond-20199.herokuapp.com/'

const mainUrl = process.env.NODE_ENV ? herokulink : localhost
let newShorten = ''

// generate shorten url - post
router.post('/', (req, res) => {

  const newUrl = req.body.url

  ShortURL.find()
    .lean()
    .then((urlList) => {
      newShorten = urlList.find((eachUrl) => eachUrl.originUrl === newUrl)
      // check existed originURL
      if (newShorten) {
        newShorten = mainUrl + newShorten.shorten
        return res.render('success', { newShorten, newUrl })
      }

      let shorten = shortenGenerator()
      newShorten = mainUrl + shorten
      // check existed shorten
      while (urlList.some((eachUrl) => eachUrl.shorten === shorten)) {
        shorten = shortenGenerator()
      }
      // create new data
      return ShortURL.create({
        originUrl: newUrl,
        shorten: shorten
      })
    })
    .then(() => res.render('success', { newShorten, newUrl }))
    .catch(error => console.log(error))
})

module.exports = router