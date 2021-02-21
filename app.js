const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')


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
    .then(relink => res.redirect(relink.origurl))
    .catch(error => console.log(error))
})

//new 

app.post('/', (req, res) => {
  const origUrl = req.body.url
  console.log('origUrl', origUrl)
  // console.log(req.query)
  // return res.render('index', { originalUrl })
})

app.listen(port, () => {
  console.log(`express is listening on http://localhost:${port}`)
})