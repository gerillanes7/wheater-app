'use strict'

window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/6a99a726ef23b37596b2d4def21ba38f/${lat},${long}`;

            fetch(api)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    const { temperature, summary, icon } = data.currently;
                    
                    //formula for celsius
                    let celsius = (temperature - 32) * (5 / 9);

                    //set DOM Elements from the API
                    temperatureDegree.textContent = Math.floor(celsius);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //set icon
                    setIcons(icon, document.querySelector('.icon'));

                })
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }
})