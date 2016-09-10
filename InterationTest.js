var request = require('request');
var fs = require('fs');
var readSource = 'C:\\Users\\David Ziegelheim\\Documents\\001NDM.txt';
var writeTarget = 'C:\\Users\\David Ziegelheim\\Documents\\Provider data for Postgres.csv';
var errorFileName = 'C:\\Users\\David Ziegelheim\\Documents\\Errors.txt';
var data = fs.readFileSync(readSource, "utf8");
var output = fs.openSync(writeTarget, "w");
var errorFile = fs.openSync(errorFileName,'w');
/** Using the readFile API - Asynchronous */
var datarows = data.split('\r\n');
var nextItemIndex = 0;

var headings = datarows[0].replace(/\"/g, '').split('\t');
var errorRecords=0;
function formatZip(zip) {
    var ans = '';
    var pad="00000";
    switch (zip.length) {
        case 0:
            break;
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            ans = "++" + pad.substring(0, pad.length - zip.length) + zip;
            break;
        otherwise:
            break;
    }

    return ans;
}

function iteration(datarow, callback) {
    var newrow = {};
    for (var j = 0; j < headings.length; j++) {
        newrow[headings[j]] = datarow.replace(/\"/g, '')
            .replace(/[^\x20-\x7E^\t]+/g, '')
            .split('\t')[j];
    }
    newrow["id"] = nextItemIndex;
    var uri = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBLbYIpmgsZhH2BbM6BMPvkDZ-6R2HnvVQ&address=';

    if (typeof newrow["Address"] === "undefined") {
        newrow["Address"] = "";
    }
    if (typeof newrow["City"] === "undefined") {
        newrow["City"] = "";
    }
    var zipPad = "00000";
    var address = newrow.Address;
    var city = newrow.City;
    var state = newrow.State;
    var zip = formatZip(newrow["Zip+"]);
    uri +=
        address.replace(/ /g, '+')
        +   (address.length>0? "," : '')
    + city.replace(/ /g, '+') + ","
    + (state.length >= 2 ? state: "NJ")
    +  zip;
    console.log("uri: " + uri);
    request(uri, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body) // Show the HTML for the Google homepage.
            console.log(nextItemIndex);

            var s1 = JSON.parse(body);
            s1 = s1.results;
            if (typeof s1[0] === undefined) {
                console.log("undefined: " + body);
            }
            // var lat = s1.results[0].geometry.location.lat;
            // var lng = s1.results[0].geometry.location.lng;
            if (s1.length > 1) {
                console.log('problem');
            }
            newrow["geodata"] = s1;

            // var s1= newrow;
            var s3 = JSON.stringify(newrow).replace(/\\"/g, '"');
            var s2 = s3 + "\r"; //lat+","+lng+",'"+
            if (s1.length > 1) {
                console.log('problem: '+ ++errorRecords + "  Bytes written: " + fs.writeSync(errorFile, s2) );
                ;
            }
            else {
                console.log("Bytes written: " + fs.writeSync(output, s2));
            }

        }
        if (error) {
            console.log(error);
        }
        setTimeout(callback, 50);
    })
}

function endProc() {
    fs.closeSync(output);
}


// this the callback we need to call after all iteartion finish

function WaterfallOver(list, iterator, callback) {

    nextItemIndex = 1;  //keep track of the index of the next item to be processed

    function report() {

        nextItemIndex++;

        // if nextItemIndex equals the number of items in list, then we're done
        if (nextItemIndex === list.length) //
            callback();
        else
        // otherwise, call the iterator on the next item
            iterator(list[nextItemIndex], report);
    }

    // instead of starting all the iterations, we only start the 1st one
    iterator(list[nextItemIndex], report);
}


WaterfallOver(datarows, iteration, endProc);