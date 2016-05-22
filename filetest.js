require('leaked-handles');
var fs = require('fs');
var readSource = 'C:\\Users\\David Ziegelheim\\Documents\\Providers 2016-00-00.txt';
var data;
/** Using the readFile API - Asynchronous */
fs.readFile(readSource, "utf8", function (err, content) {
    if (err) {
        throw err;
    }
    data = content;
    console.log("Reading file asynchronously");
    console.log(data);
});

//Converter Class

var jsondata;
var Converter = require("csvtojson").Converter;
var converter = new Converter({});
converter.fromFile(readSource, function (err, result) {
    jsondata = result;
    console.log("Reading file asynchronously");
    console.log(result[1]);
});

// console.log(jsondata[15]);
// var fs = require('fs');
//
// fs.readFile('DATA', 'utf8', function(err, contents) {
//     console.log(contents);
// });
//
// console.log('after calling readFile');