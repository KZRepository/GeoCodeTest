var request = require('request');

var fs = require('fs');
var readSource = 'C:\\Users\\David Ziegelheim\\Documents\\001 Providers Master Table.txt';
var data = fs.readFileSync(readSource, "utf8");
/** Using the readFile API - Asynchronous */
var datarows = data.split('\r\n');

var headings = datarows[0].replace(/\"/g,'').split(';');
var jsondata = [];

for (i = 1; i < 10; i++) {
    var newrow = {};
    for (j = 0; j < headings.length; j++) {
         newrow[headings[j]] = datarows[i].replace(/\"/g,'').replace(/[^\x20-\x7E]+/g, '').split(';')[j];
    }
    jsondata.push(newrow);

    var uri = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    uri += uri + newrow["Address"].replace(/ /g, '+')+",+" + newrow["City"].replace(/ /g, '+')+",+NJ++" + "00000".substring(0,5-newrow["Zip+"].length)+newrow["Zip+"];
    console.log(i+": "+uri);
    // request('https://maps.googleapis.com/maps/api/geocode/json?address=1600 Amphitheatre Parkway,Mountain View,CA', function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         console.log(body) // Show the HTML for the Google homepage.
    //     }
    //     if (error) {
    //         console.log(error);
    //     }
    // })

    // console.log(headings[3]+": "+datarows[i].split(';')[3]);
}
// fs.readFile(readSource, "utf8", function (err, content) {
//     if (err) {
//         throw err;
//     }
//     data = content;
//     console.log("Reading file asynchronously");
// //     console.log(data);
// });

//Converter Class

var jsondata;
var Converter = require("csvtojson").Converter;
var converter = new Converter({});
converter.fromString(data, function (err, result) {
    jsondata = result;
    console.log("Reading file asynchronously");
    console.log(result[1]);
});

for (i = 0; i < 100 && i < jsondata.length; i++) {
    console.log(jsondata[i].b)
}
// console.log(jsondata[15]);
// var fs = require('fs');
//
// fs.readFile('DATA', 'utf8', function(err, contents) {
//     console.log(contents);
// });
//
// console.log('after calling readFile');