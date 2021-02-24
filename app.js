const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const shortenGenerator = require('./shortenGenerator')

const app = express()
const port = 3000

const ShortURL = require('./models/shorturl')

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: false }))


// require config profile
require('./config/mongoose')

app.get('/', (req, res) => {
  res.render('index')
})

// redirect 
app.get('/:shorten', (req, res) => {
  const shortenName = req.params.shorten
  ShortURL.find({ shorten: shortenName })
    .lean()
    .then((relink) => {
      if (relink) {
        res.redirect(relink[0].originUrl)
      }
    })
    .catch(error => console.log(error))
})

//new 

const mainUrl = 'http://localhost:3000/'
let newShorten = ''

app.post('/', (req, res) => {

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

app.listen(port, () => {
  console.log(`express is listening on http://localhost:${port}`)
})

