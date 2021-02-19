const APIKEY = "485a33a929a1db2dc1031920b9f05a3a"


//search function
const searchedCity;

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

//main page forecast
$("#currentDate").text("Today " + moment().format('ddd Do'));

for (let i = 0; i < 5; i++) {

    const startForecast = i +1;
    const forecastCard = $(`div[data-card|="${i}"]`);

    forecastCard.html(`<h4> ${moment().add(startForecast, 'days').format('ddd')} </h4>`)
};


