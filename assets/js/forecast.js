function getForecast(citySearch) {
  
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?appid=" + APIKEY + "&q=" + citySearch + "&units=imperial";

    // console.log("Forecast URL: " + forecastURL);

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {

        // Start at index for 12 noon every day in 5-day forecast
        var forecastStart = 6;

        // i < 5 for cards for 5-day forecast
        for (let i = 0; i < 5; i++) {

            // For first card, display data from response.list[4]. For second card, display data from response.list[12]..and so on...

            // Where <div data-card="index">
            var forecastCard = $(`div[data-card|="${i}"]`);

            var forecastDay = moment(response.list[forecastStart].dt_txt).format('ddd');

            var forecastTemp = Math.round(response.list[forecastStart].main.temp);

            var forecastHumid = response.list[forecastStart].main.humidity;

            // Get icons for current weather
            var forecastIcon = response.list[forecastStart].weather[0].icon;

            // https://openweathermap.org/img/wn/10d@2x.png
            var iconURL = "https://openweathermap.org/img/wn/" + forecastIcon + ".png";

            var forecastDescription = response.list[forecastStart].weather[0].description;

            forecastCard.html(`
                <h4>${forecastDay}</h4>
                <p class="forecastNumber">${forecastTemp} <span class="units">&#176;F</span></p>
                <p class="weatherDescription">${forecastDescription}</p>
                <img src="${iconURL}">
                <p class="forecastHumid">${forecastHumid} <span class="units">%</span></p>
            `);

            forecastStart += 8;

        }
    });
};