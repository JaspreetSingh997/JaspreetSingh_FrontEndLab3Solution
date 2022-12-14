const appid = '4929392ca682f22f07131f59bbbd3906';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

function getWeather( city ) {
    fetch( `${baseUrl}?q=${city}&appid=${appid}&units=metric` )
        .then( response => {
            console.log( response );

            // throw error if server returns 4xx response
            if( !response.ok ) {
                alert("City not found!");
                throw new Error( response.statusText );
            }

            return response.json();
        })
        .then( data => {
            console.log( data );

            // display weather data
            showWeather( data );
        })
        .catch( error => console.log( error.message ) );
}

getWeather( 'Bangalore' );

function showWeather( data ) {

    const city = document.querySelector( '.city' );
    const date = document.querySelector( '.date' );
    const temp = document.querySelector( '.temp' );
    const weather = document.querySelector( '.weather' );
    const hilow = document.querySelector( '.hi-low' );
    const wind = document.querySelector('.wind');
    city.textContent = data.name;
    date.textContent = getFormattedDate( new Date( data.dt * 1000 ) );
    temp.innerHTML = `${data.main.temp} <span>°c</span>`;
    weather.textContent = data.weather[0].main;
    hilow.textContent = `${data.main.temp_min} °c / ${data.main.temp_max} °c`;
    wind.textContent=`${data.wind.deg}`;
}

function getFormattedDate( date ) {
    const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

document.querySelector( '.search-box' ).addEventListener( 'keypress', function( event ) {
    if( event.key === 'Enter' ) {
        getWeather( this.value );
    }

});