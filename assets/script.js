const APIKEY = "485a33a929a1db2dc1031920b9f05a3a"
const queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=" + APIKEY + "&q=" + citySearch + "&units=imperial";

function currentWeather(citySearch) {

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        $(".city").html(response.name);
        $("#currentDate").text(moment(responst.dt).format('ddd Do'));

        const temp = Math.round(response.main.temp);
        $(".temp").html(`${temp}`);
        $(".temp").append(`<span class="units">&#176;F</span>`);

        $(".humidity").html(`${response.main.humidity} `);
        $(".humidity").append(`<span class"units">%</span>`);

        const wind = Math.round(response.wind.speed);
        $(".wind").html(`${wind} `);
        $(".wind").append(`<span class"units">MPH</span>`);

        $("#currentInfo").text(response.weather[0].description)

    })
}

function getIndex(citySearch) {

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        
        const cityLon = response.coord.lon;
        const cityLat = response.coord.lat;

        var queryIndex = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + cityLat + "&lon=" + cityLon;

        $.ajax({
            url: queryIndex,
            method: "GET"
        }).then(function (response) {

            $('.UV').html(`${response.value}`);

            if (response.value <= 2) {
                $('.UV').css('background-color', '#8DC443');
                $('.UV').css('color', 'white');
            } else if (response.value > 2 && response.value <= 5) {
                $('.UV').css('background-color', '#FDD835');
                $('.UV').css('color', 'white');
            } else if (response.value > 5 && response.value <= 7) {
                $('.UV').css('background-color', '#FFB301');
                $('.UV').css('color', 'white');
            } else if (response.value > 7 && response.value <= 10) {
                $('.UV').css('background-color', '#D1394A');
                $('.UV').css('color', 'white');
            } else if (response.value > 10) {
                $('.UV').css('background-color', '#954F71');
                $('.UV').css('color', 'white');
            }
        
        })
    })

}

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

    const startForecast = i + 1;
    const forecastCard = $(`div[data-card|="${i}"]`);

    forecastCard.html(`<h4> ${moment().add(startForecast, 'days').format('ddd')} </h4>`)
};


