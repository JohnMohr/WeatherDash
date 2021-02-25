//main page forecast information
$("#currentDate").text("Today " + moment().format('ddd Do'));

for (let i = 0; i < 5; i++) {

    const startForecast = i + 1;
    const forecastCard = $(`div[data-card|="${i}"]`);

    forecastCard.html(`<h4> ${moment().add(startForecast, 'days').format('ddd Do')} </h4>`)
};

const APIKEY = "485a33a929a1db2dc1031920b9f05a3a"

let searchedCity;

// (bad code, bad code, Wat you gon' do) Wat you gon' do when city search is submitted (foo'?)
$(document).ready(function () {

    $(`#city-search`).submit(function () {
        event.preventDefault();
        searchedCity = $('#city-text').val().trim();
        currentWeather(searchedCity);
        getIndex(searchedCity);
        getForecast(searchedCity);
        addHistory(searchedCity);
    })
});