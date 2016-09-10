var request = require('request');

var fs = require('fs');
var readSource = 'C:\\Users\\David Ziegelheim\\Documents\\001NDM.txt';
var writeTarget = 'C:\\Users\\David Ziegelheim\\Documents\\Provider data for Postgres.csv'
var data = fs.readFileSync(readSource, "utf8");
var output = fs.openSync(writeTarget,"w");
/** Using the readFile API - Asynchronous */
var datarows = data.split('\r\n');

var headings = datarows[0].replace(/\"/g,'').split('\t');
var jsondata = [];

for (i = 1; i < 10; i++) {
    var newrow = {};
    for (j = 0; j < headings.length; j++) {
         newrow[headings[j]] = datarows[i].replace(/\"/g,'').replace(/[^\x20-\x7E^\t]+/g, '').split('\t')[j];
    }
    jsondata.push(newrow);

    var uri = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    if (i==2559){
        console.log('we are at 2559');
    }
    if (typeof newrow["Address"]==="undefined"){
        newrow["Address"]= "";
    }
    if (typeof newrow["City"]==="undefined"){
        newrow["City"]= "";
    }
    // console.log(newrow["Business Name"]+", "+newrow["Phone 1"] );

    uri += newrow["Address"].replace(/ /g, '+')+",+" + newrow["City"].replace(/ /g, '+')+",+NJ++" + "00000".substring(0,5-newrow["Zip+"].length)+newrow["Zip+"];
    console.log(i+": "+uri);
    // request( uri, function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         // console.log(body) // Show the HTML for the Google homepage.
    //         newrow["geodata"] = body;
    //
    //         var s1= JSON.stringify(newrow);
    //         var s2 = "'"+s1.toString()+"'\r";
    //         console.log("Bytes written: " + fs.writeSync(output, s2 ));
    //     }
    //     if (error) {
    //         console.log(error);
    //     }
    // })

    // console.log(headings[3]+": "+datarows[i].split(';')[3]);
}

//fs.closeSync(readSource);
fs.closeSync(output);
// fs.readFile(readSource, "utf8", function (err, content) {
//     if (err) {
//         throw err;
//     }
//     data = content;
//     console.log("Reading file asynchronously");
// //     console.log(data);
// });

//Converter Class

// var jsondata;
// var Converter = require("csvtojson").Converter;
// var converter = new Converter({});
// converter.fromString(data, function (err, result) {
//     jsondata = result;
//     console.log("Reading file asynchronously");
//     console.log(result[1]);
// });

// for (i = 0; i < 100 && i < jsondata.length; i++) {
//     console.log(jsondata[i].b)
// }
// console.log(jsondata[15]);
// var fs = require('fs');
//
// fs.readFile('DATA', 'utf8', function(err, contents) {
//     console.log(contents);
// });
//
// console.log('after calling readFile');