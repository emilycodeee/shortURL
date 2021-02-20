const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

const ShortURL = require('./models/shorturl')

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// require config profile
require('./config/mongoose')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/:shorten', (req, res) => {
  const shortenName = req.params.shorten
  return ShortURL.findOne({ shorten: shortenName })
    .lean()
    .then(relink => res.redirect(relink.origurl))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`express is listening 0n localhost:${port}`)
})