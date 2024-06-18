const request = require('request')

const forecast = ({ longitude, latitude, place } = {}, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=6fa5fcb9aa79fafa65d39e3882d09362&query=${latitude},${longitude}&units=m`

  request({ url, json: true }, (error, response) => {
    if (error) callback('Unable to connect to weather service!', undefined)
    else if (response.body.error) callback('Unable to find location. Try another search.', undefined)
    else callback(undefined, {
      location: place,
      description: response.body.current.weather_descriptions[0],
      temperature: response.body.current.temperature
    })
  })
}

module.exports = forecast