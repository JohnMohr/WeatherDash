const APIKEY = "485a33a929a1db2dc1031920b9f05a3a"
const queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=" + APIKEY + "&q=" + citySearch + "&units=imperial";

const cityList = [];
const searchedCity;



//main page forecast information
$("#currentDate").text("Today " + moment().format('ddd Do'));

for (let i = 0; i < 5; i++) {

    const startForecast = i + 1;
    const forecastCard = $(`div[data-card|="${i}"]`);

    forecastCard.html(`<h4> ${moment().add(startForecast, 'days').format('ddd')} </h4>`)
};

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


//function to GET the current weather
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

//function to grab the Latitude x Longitude of a location.
function getIndex(citySearch) {

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        
        const cityLon = response.coord.lon;
        const cityLat = response.coord.lat;

        var queryIndex = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKEY + "&lat=" + cityLat + "&lon=" + cityLon;

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

function getForecast(citySearch) {
    const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?appid=" + APIKEY + "&q=" + citySearch + "&units=imperial";

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {

        var forecastStart = 6;

        for (let i = 0; i < 5; i++) {

            const forecastCard = $(`div[data-card|="${i}"]`);
            const forecastDay = moment(response.list[forecastStart].dt_txt).format('ddd');
            const forecastTemp = Math.round(response.list[forecastStart].main.temp);
            const forecastHumid = response.list[forecastStart].main.humidity;
            const forecastInfo = response.list[forecastStart].weather[0].description;

            forecastCard.html(`
                <h4>${forecastDay}</h4>
                <p class="forecastNumber">${forecastTemp} <span class="units">&#176;F</span></p>
                <p class="weatherInfo">${forecastInfo}</p>
                <p class="forecastHumid">${forecastHumid} <span class="units">%</span></p>

            `)

            forecastStart += 8;
        }
    })
}


// if there's no cities in local storage than load new-default cityList
// else grab the local storage cities and do work on them
if (localStorage.getItem('Cities') === null) {

    // new-default cityList
    cityList = ["Atlanta", "Chicago", "Austin", "New York", "San Francisco", "Portland", "Seattle"]
    //stringify them cities
    localStorage.setItem('Cities', JSON.stringify(cityList));
    //KOBE the strings
    cityList.forEach(element => {
        $(`$searchHistory`).append(`
        <li class="searchItem">${element}</li>
        `);
    });
    // execute functions to tell user what's up with the weather(it's the sky.)
    currentWeather(cityList[0]);
    getIndex(cityList[0]);
    getForecast(cityList[0])

} else {
    // parse the local storage cities
    cityList = JSON.parse(localStorage.getItem('Cities'));
    //KOBE them
    cityList.forEach(element => {

        $('#searchHistory').append(`
            <li class="searchItem">${element}</li>
        `)
    });
    // THE SKY
    currentWeather(cityList[0]);
    getIndex(cityList[0]);
    getForecast(cityList[0]);
}
// when .searchitem is clicked execute this event function
$('.searchItem').on('click', function (event) {
    // the target of the innextText is now itemText
    const itemText = event.target.innerText;
    //ItemText is used as the value to execute
    $('city-text').val(itemText);
    currentWeather(itemText);
    getIndex(itemText);
    getForecast(itemText);

});

// It puts the search history on the page or it gets the lotion again.
function addHistory() {

    $('#searchHistory').prepend(`
        <li class="searchItem">${searchedCity}</li>
    `);

    cityList.unshift(searchedCity);

    localStorage.setItem('Cities', JSON.stringify(cityList));
};

