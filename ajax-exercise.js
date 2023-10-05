import axios from 'axios';

// PART 1: Show Dog Photo

function showDogPhoto(evt) {
  axios.get('https://dog.ceo/api/breeds/image/random')
  .then((res => {
    document.querySelector('#dog-image').innerHTML = `<img src="${res.data.message}">`
  }))
}

document.querySelector('#get-dog-image').addEventListener('click', showDogPhoto);

// PART 2: Show Weather

function showWeather(evt) {
  const zipcode = document.querySelector('#zipcode-field').value;
  axios.get(`/weather.txt?zipcode=${zipcode}`)
  .then((res) => {
    document.querySelector('#weather-info').innerText = res.data
  })

}

document.querySelector('#weather-button').addEventListener('click', showWeather);

// PART 3: Order Cookies

function orderCookies(evt) {
  evt.preventDefault()
  const cookieType = document.querySelector('#cookie-type-field').value
  const qty = document.querySelector('#qty-field').value
  axios.post('/order-cookies.json', {cookieType: cookieType, qty: qty})
  .then((res => {
    document.querySelector('#order-status').innerText = res.data.message
    if (res.data.resultCode === "ERROR") {
      document.querySelector('#order-status').style.color = "red"
    } else {
      document.querySelector('#order-status').style.color = "black"
    }
  }))
}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search

function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;
  const formData = {'term': searchTerm}
  const queryStr = new URLSearchParams(formData).toString()
  const url = `https://itunes.apple.com/search?${queryStr}`

  axios.get(url)
  .then((res) => {
    let display = ""
    for (const result of res.data.results) {
      display += `<li>Artist: ${result.artistName} Song: ${result.trackName}</li>`
    }
    document.querySelector("#itunes-results").innerHTML = display
  })
}
document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);
