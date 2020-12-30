require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const routeNavigation = require('./src/routeNavigation')

const app = express()
app.use(morgan('dev'))
app.use(express.static('uploads'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/', routeNavigation)

app.get('*', (request, response) => {
  response.status(404).send('Path not Found !')
})

app.listen(process.env.PORT, () => {
  console.log(`Express app listening on Port:${process.env.PORT}`)
})
