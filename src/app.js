const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

// Define paths for Express config
const staticDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

// Setup static directory
app.use(express.static(staticDirectoryPath))

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Rafał Wojtkowiak'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us',
    name: 'Rafał Wojtkowiak'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Rafał Wojtkowiak'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) return res.send({ error: 'You must provide an address!' })

  const address = req.query.address

  geocode(address, (error, data) => {
    if (error) return res.send({ error })

    forecast(data, (error, { location, description, temperature } = {}) => {
      if (error) return res.send({ error })
      else res.send({ location, description, temperature })
    })
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Rafał Wojtkowiak'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})


