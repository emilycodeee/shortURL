const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: false }))

// require routes & config profile
const routes = require('./routes')
require('./config/mongoose')

// routes setting - Read
app.use(routes)

app.listen(port, () => {
  console.log(`express is listening on http://localhost:${port}`)
})

