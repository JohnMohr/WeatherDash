//function to GET the current weather
function currentWeather(citySearch) {

const queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=" + APIKEY + "&q=" + citySearch + "&units=imperial";

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

        const currentIcon = response.weather[0].icon;
        const iconURL = "https://openweathermap.org/img/wn/" + currentIcon + ".png";
        $('#currentIcon').attr("src", iconURL);

        $("#currentDescription").text(response.weather[0].description)

    });
};

//function to grab the Latitude x Longitude of a location.
function getIndex(citySearch) {

const queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=" + APIKEY + "&q=" + citySearch;


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

        });
    });

};