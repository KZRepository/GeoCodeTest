/**
 * Created by David Ziegelheim on 5/17/2016.
 */
var GoogleMapsAPI = require('./node_modules/googlemaps/lib/index');

var publicConfig = {
    // key: '<YOUR-KEY>',
    stagger_time:       1000, // for elevationPath
    encode_polylines:   false,
    secure:             true, // use https
    // proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
};
var gmAPI = new GoogleMapsAPI(publicConfig);


// geocode API
var geocodeParams = {
    "address":    "220 mallory ave, jersey city, nj",
    "components": "components=country:us",
    // "bounds":     "55,-1|54,1",
    "language":   "en",
    "region":     "us"
};

gmAPI.geocode(geocodeParams, function(err, result){
    console.log(result);
});