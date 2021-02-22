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
  return ShortURL.findOne({ shorten: shortenName })
    .lean()
    .then(relink => res.redirect(relink.originUrl))
    .catch(error => console.log(error))
})

//new 

const mainUrl = 'http://localhost:3000/'

app.post('/', (req, res) => {
  const origUrl = req.body.url

  const shorten = shortenGenerator()
  const newShorten = mainUrl + shorten

  return ShortURL.create({
    originUrl: origUrl,
    shorten: shorten
  })
    .then(() => res.render('success', { newShorten, origUrl }))

  // console.log(req.query)
  // return res.render('index', { originalUrl })
})

app.listen(port, () => {
  console.log(`express is listening on http://localhost:${port}`)
})