function getForecast(citySearch) {
    const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?appid=" + APIKEY + "&q=" + citySearch;

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
            const forecastIcon = response.list[forecastStart].weather(0).icon;
            const iconURL = "https://openweathermap.org/img/wn/" + forecastIcon + ".png";
            forecastCard.html(`
                <h4>${forecastDay}</h4>
                <p class="forecastNumber">${forecastTemp} <span class="units">&#176;F</span></p>
                <p class="weatherDescription">${forecastInfo}</p>
                <img src="${iconURL}">
                <p class="forecastHumid">${forecastHumid} <span class="units">%</span></p>

            `)

            forecastStart += 8;
        }
    })
}