const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const routeNavigation = require('./src/routeNavigation')

const app = express()
app.use(morgan('dev'))
app.use(express.static('uploads'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routeNavigation)

app.get('*', (request, response) => {
  response.status(404).send('Path not Fund !')
})

app.listen(3000, () => {
  console.log('Express app listening on Port:3000')
})
