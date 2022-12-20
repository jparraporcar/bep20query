"use strict";
exports.__esModule = true;
// define base url for calling the endpoint defined in https://docs.bscscan.com/api-endpoints/accounts#get-a-list-of-bep-20-token-transfer-events-by-address
var BASE_URL = "https://api.bscscan.com/api";
var ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/g;
var pr = require("prompt");
var schema = {
    properties: {
        address: {
            pattern: ADDRESS_REGEX,
            message: "incorrect address pattern, please try again",
            required: true
        }
    }
};
var reqAddress;
pr.start();
pr.get(schema, function (err, result) {
    if (result) {
        var reqAddress_1 = result.address;
    }
});
console.log(reqAddress);
console.log("here");
// creating qs object with user input and predefined pattern
// new URLSearchParams({});
// making https request
// handling errors
// showing output to screen
// others:
// add import cost to see bundle size
// add prettier config file
// ?module=account
// &action=tokentx
// &contractaddress=0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51
// &address=0x7bb89460599dbf32ee3aa50798bbceae2a5f7f6a
// &page=1
// &offset=5
// &startblock=0
// &endblock=999999999
// &sort=asc
// &apikey=YourApiKeyToken
