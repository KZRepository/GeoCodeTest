var request = require('request');
request('https://maps.googleapis.com/maps/api/geocode/json?address=3048+Valley+Road,+Basking+Ridge,+NJ+07920', function (error, response, body, ) {
    if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the Google homepage.
    }
    if(error){
        console.log(error);
    }
})
