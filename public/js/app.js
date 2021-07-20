console.log('JS client side content loaded')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')
const weatherForm = document.querySelector('#weather-form')
const weatherInput = document.querySelector('#address')

const showWeather = (e) => {
  e.preventDefault()

  messageOne.textContent = "Loading..."
  messageTwo.textContent = ""

  const address = weatherInput.value

  fetch(`/weather?address=${address}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        return messageOne.textContent = data.error
      }

      messageOne.textContent = data.location
      messageTwo.textContent = `${data.description}. It is currently ${data.temperature} degrees.`
    })
}

weatherForm.addEventListener('submit', showWeather)

