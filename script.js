let titleClicked = false;
let emojisAdded = 0;
let gifAdded = false;
$(document).ready(() => {
    $('body').keypress((event) => {
        if (event.which == 32) {
            $('h1').addClass('pinkColor');
            addLog('title color changed');
        }
        if (event.which == 101) {
            if (emojisAdded < 5) {
                $('body').append('🌈');
                emojisAdded++;
                addLog('emoji added');
            }
        }
        if (event.which == 119) {
            changeWeatherBackground();
        }
        if (event.which == 103) {
            if (!gifAdded){
                $('body').append($('<img/>').attr('src','https://media.giphy.com/media/14g4L6kXIdGHU4/giphy.gif').css('display','block'));
                gifAdded = !gifAdded;
                addLog('gif added');
            }
        }
    })
    
    $('h1').click(() => {
        addLog('body color changed');
        if (!titleClicked) {
            titleClicked = !titleClicked;
            $('body').css('color','#d9fcea')
        }
        else{
            titleClicked = !titleClicked;
            $('body').css('color','white')
        }
    })
});


function addLog(msg){
    if (msg) {
        let listItem = $('<li/>').text(msg);
        $('#list').append(listItem);   
    }
}

function searchWeather(){
    let city = $('#cityInput').val();
    if (city) {
        changeWeatherBackground(city);
    }
}


function changeWeatherBackground(city){
    if (!city) {
        city = "new york";
    }
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=e83b3c4c08285bf87b99f9bbc0abe3f0', (data) => {
                let weatherType = data.weather[0].main;
                console.log(weatherType);
                let backgroundUrl = '';
                switch (weatherType) {
                    case 'Clouds':
                        backgroundUrl = 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Cloudy_weather,nashik.jpg';
                        break;
                    case 'Rain':
                        backgroundUrl = 'http://efdreams.com/data_images/dreams/rain/rain-02.jpg';
                        break;
                    case 'Clear':
                        backgroundUrl = 'https://icons.wxug.com/data/wximagenew/k/Klockheed/2.jpg';
                        break;
                    
                    default:
                        backgroundUrl = 'https://upload.wikimedia.org/wikipedia/commons/2/22/New_York_City_at_night_HDR.jpg';
                }
                $('body').css('background-image', 'url("' + backgroundUrl + '")');
                addLog('weather background changed');
    });
}