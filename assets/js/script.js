

let cityList = [];


     




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

        $("#currentDescription").text(response.weather[0].description)

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
        $('#searchHistory').append(`
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
$('#city-search').on('click', function (event) {
    event.preventDefault();


    // the target of the innextText is now itemText
    const itemText = event.target.innerText;
    //ItemText is used as the value to execute
    $('city-text').val(itemText);
    // THE SKY
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

