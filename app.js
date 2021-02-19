const express = require('express')
const exphbs = require('express-handlebars')



const app = express()
const port = 3000

//view engine 
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`express is listening 0n localhost:${port}`)
})